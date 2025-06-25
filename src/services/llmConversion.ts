import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const openRouterApiKey = process.env.OPENROUTER_API_KEY;
console.log("OpenRouter API Key:", openRouterApiKey ? "Loaded" : "Not Loaded");
console.log("OpenRouter API Key Length:", openRouterApiKey?.length || 0);

export const llmConversion = async (message: string): Promise<any> => {
  const prompt = `convert this message to json.
          message: ${message}
            the result should be a json object with the following structure:
          {
          "action": "",
          "parameters": {
            "query": "",
            "near": "",
            "price": "",
            "open_now": true
          }
        }
        
        IMPORTANT: Return ONLY the raw JSON object with no markdown formatting, code blocks, or explanations.
        `;

  try {
    // 🧠 Get AI-generated response from OpenAI
    const openRouterResponse = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-r1",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${openRouterApiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = openRouterResponse.data.choices[0].message.content;

    const cleanedContent = content
      .replace(/^```json\s*/g, "") // Remove leading ```json
      .replace(/^```\s*/g, "") // Remove leading ```
      .replace(/\s*```$/g, "") // Remove trailing ```
      .trim();

    console.log("Cleaned content:", cleanedContent);

    // Parse the JSON
    const jsonRaw = JSON.parse(cleanedContent);

    console.log("OpenRouter response parsed:", jsonRaw);

    return jsonRaw;
  } catch (error) {
    // Log detailed error information
    if (axios.isAxiosError(error)) {
      console.error("OpenRouter API error:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
      });
      throw new Error(`OpenRouter API error: ${error.message}`);
    } else {
      console.error("Error in llmConversion:", error);
      throw error instanceof Error
        ? error
        : new Error("Unknown error in llmConversion");
    }
  }
};

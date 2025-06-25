import { Request, Response } from "express";
import { llmConversion } from "../services/llmConversion.js";
import { findRestaurants } from "../services/findRestaurant.js";

interface ExecuteQueryParams {
  message?: string;
  code?: string;
}

export const executeController = async (
  req: Request<{}, {}, {}, ExecuteQueryParams>,
  res: Response
): Promise<void> => {
  const { message, code } = req.query;
  const validCode = process.env.VALID_CODE;

  if (code !== validCode) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (!message || typeof message !== "string") {
    res.status(400).json({ error: "Invalid or missing message" });
    return;
  }

  try {
    console.log("Received message:", message);

    const convert = await llmConversion(message);
    console.log("Converted command:", convert);

    const restaurants = await findRestaurants(convert.parameters);
    console.log("Found restaurants:", restaurants);

    res.json(restaurants);
    // res.json({
    //   success: true,
    //   result: "Command executed successfully",
    // });
  } catch (error) {
    console.error("Execution error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

interface Restaurant {
  name: string;
  address: string;
  cuisine: string;
  tel: string | number;
  email: string;
  date_created: string;
}

export async function findRestaurants(params: any): Promise<any> {
  try {
    console.log(
      "Received params in findRestaurants:",
      JSON.stringify(params, null, 2)
    );

    const { query, near, price, open_now } = params;

    const url = "https://places-api.foursquare.com/places/search";
    const apiKey = process.env.FOURSQUARE_API_KEY;

    if (!apiKey) {
      throw new Error(
        "Foursquare API key is missing. Please check your environment variables."
      );
    }

    console.log("Searching for restaurants with params:", {
      query,
      near,
      price,
      open_now,
    });

    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "X-Places-Api-Version": "2025-06-17",
        Authorization: `Bearer ${apiKey}`,
      },
      params: {
        query,
        near,
        price,
        open_now: open_now ? "true" : undefined,
        limit: 10,
        categories: "13000", // Category ID for restaurants
      },
    });

    if (!response.data || !response.data.results) {
      throw new Error("Invalid response from Foursquare API");
    }

    console.log("Foursquare API response:", response.data);

    return response.data.results.map(
      (place: any): Restaurant => ({
        name: place.name || "Unknown",
        address: place.location?.formatted_address || "Address not available",
        cuisine:
          place.categories?.map((cat: any) => cat.name).join(", ") ||
          "Not specified",
        tel: place.tel || "Does have telephone",
        email: place.email || "Does not have email",
        date_created:
          place.date_created || new Date().toISOString() || "no date created",
      })
    );
  } catch (error) {
    console.error("Error finding restaurants:", error);

    if (axios.isAxiosError(error)) {
      console.error("Foursquare API error:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
      });
      throw new Error(`Foursquare API error: ${error.message}`);
    } else {
      throw error instanceof Error
        ? error
        : new Error("Unknown error in findRestaurants");
    }
  }
}

### Setup Instructions locally

Install dependencies:

```bash
npm install
```

To run the app locally, use the terminal command nodemon server or npm run dev.

### Details on configuring environment variables

Sensitive information such as API keys is stored in a .env file. This includes variables like PORT, VALID_CODE (used to validate the code parameter), OPENROUTER_API_KEY (for the LLM using the DeepSeek model), and FOURSQUARE_API_KEY (for the Foursquare API).

- `PORT=your_port_number`
- `VALID_CODE=your_validation_code`
- `OPENROUTER_API_KEY=your_openrouter_api_key`
- `FOURSQUARE_API_KEY=your_foursquare_api_key`

### Assumptions and Limitations

Both OpenRouter and Foursquare are on free-tier plans. If you encounter any issues or errors, feel free to contact me so I can update the keys.

As outlined in the task requirements, the API was expected to return Rating, Price Level, and Operating Hours. However, upon reviewing the Foursquare API documentation, these fields are not available in the documentation. Instead, I included alternative relevant details such as Telephone Number, Email, and Date Created to provide meaningful business information within the limitations of the available API.

### live in render

https://zeo-restaurant-finder.onrender.com/api/execute?message=Find%20me%20a%20cheap%20sushi%20restaurant%20in%20downtown%20Los%20Angeles%20that%27s%20open%20now%20and%20has%20at%20least%20a%204-star%20rating&code=pioneerdevai

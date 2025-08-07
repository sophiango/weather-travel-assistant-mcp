# 🌦️ Gemini Weather Travel Assistant (MCP Demo)

This project demonstrates how to build a Minimal Context Protocol (MCP)-enabled app using:

- 🌐 OpenWeatherMap public API
- 🧠 Gemini (Google Generative AI)
- 🧩 Structured MCP-style context
- ⚛️ Next.js API + React frontend

## 🚀 Features

- Input a city name
- Fetch real-time weather data
- Wrap data in structured MCP context
- Send to Gemini API
- Display AI-generated travel advice

## 🛠 Tech Stack

- Next.js (API + UI)
- @google/generative-ai (Gemini)
- OpenWeatherMap API
- Jest for testing

## 📦 Setup

1. Clone the repo
2. Create `.env.local` with:
```
WEATHER_API_KEY=your_openweather_api_key
GEMINI_API_KEY=your_google_gemini_api_key
```

3. Install dependencies:
```
npm install
Run dev server:
npm run dev
Run tests:
npm test
```

## 🧪 Example Usage

Search: `Tokyo`

Gemini Response:

> "Tokyo is sunny today at 26°C. It’s a great day to walk around Shinjuku Gyoen..."

## 🧠 MCP Context Example

```
{
  "user": { "name": "Sophia", "location": "Tokyo" },
  "instructions": "You're a travel assistant...",
  "app_state": {
    "city": "Tokyo",
    "temperature": 26,
    "condition": "clear sky"
  }
}
```

## 📎 Credits

Built for learning how to integrate MCP + Gemini + public APIs.
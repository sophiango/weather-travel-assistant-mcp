import { NextApiRequest, NextApiResponse } from "next"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const buildMCPContext = (city: string, weatherData: any) => ({
    user: { name: "Sophia", location: city },
    instructions: "You are a travel assistant giving helpful, friendly advice based on current weather",
    app_state: {
        city,
        temperature: weatherData.main.temp,
        condition: weatherData.weather[0].description
    },
    memory: [],
    tools: [],
    files: []
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { city } = req.query;
    const weatherApiKey = process.env.OPEN_WEATHER_API_KEY
    const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`)
    const weatherData = await weatherRes.json()
    console.log("weather data ", weatherData)
    if (!weatherData || weatherData.cod != 200) {
        return res.status(400).json({ error: "Failed to fetch, check city" })
    }

    const context = buildMCPContext(city as string, weatherData);
    const prompt = `You are a travel assistant. Use the following structured context to give friendly travel advice: 
    Context:
    ${(JSON.stringify(context, null, 2))}
    Prompt:
    What should I know about traveling to ${city} today?
    `;
    console.log("prompt ", prompt)

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001"})
    const result = await model.generateContent(prompt)
    const response = await result.response.text();

    res.status(200).json({ advice: response });
}
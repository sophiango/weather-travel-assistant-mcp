export class GoogleGenerativeAI {
  constructor(apiKey: string) {}

  getGenerativeModel({ model }: { model: string }) {
    return {
      generateContent: async (prompt: string) => ({
        response: {
          text: () => Promise.resolve("Mock travel advice: It’s a great day to explore!"),
        },
      }),
    };
  }
}
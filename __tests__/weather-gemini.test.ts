import { createMocks } from "node-mocks-http";
import handler from "../pages/api/weather-gemini";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("Test weather gemini api", () => {
  it("returns travel advice for valid city", async () => {
    // Mock weather API response
    fetchMock.mockResponseOnce(
      JSON.stringify({
        cod: 200,
        main: { temp: 70 },
        weather: [{ description: "sunny" }],
      })
    );

    const { req, res } = createMocks({
      method: "POST",
      body: { city: "San Francisco" }, // No need to pass weather anymore
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.advice).toContain("Mock travel advice");
  });
});

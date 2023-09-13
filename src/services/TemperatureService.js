export class TemperatureService {
  baseUrl = "http://localhost:3000";

  constructor(fetch = (...args) => globalThis.fetch(...args)) {
    this.fetch = fetch;
  }

  async getTemperature() {
    const response = await this.fetch(`${this.baseUrl}/temperature`);

    if (!response.ok) {
      throw new Error("Could not get temperature");
    }

    const data = await response.json();

    return data.temperature;
  }
}

export class TemperatureService {
  baseUrl = "http://localhost:3000";

  constructor(fetch = (...args) => globalThis.fetch(...args)) {
    this.fetch = fetch;
  }

  async getTemperature() {
    const response = await this.fetch(
      `${this.baseUrl}/temperature?ip=127.0.0.1`,
    );

    const data = await response.json();

    return data.temperature;
  }
}

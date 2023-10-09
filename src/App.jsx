import { useEffect, useState } from "react";
import "./App.css";
import { TemperatureUnit, toSymbol } from "./models/TemperatureUnit.js";
import { SelectUnit } from "./components/SelectUnit.jsx";
import { TemperatureInput } from "./components/TemperatureInput.jsx";
import { convert } from "./models/Temperature.js";
import { CurrentTemperature } from "./components/CurrentTemperature.jsx";
import { useDependencies } from "./hooks/useDependencies.js";
import { SelectCountry } from "./components/SelectCountry";
import { Countries, CountriesIpsMap } from "./models/Countries";

export const App = () => {
  const [currentTemperature, setCurrentTemperature] = useState();
  const [temperature, setTemperature] = useState("");
  const [fromUnit, setFromUnit] = useState(TemperatureUnit.CELSIUS);
  const [toUnit, setToUnit] = useState(TemperatureUnit.CELSIUS);
  const [selectedCountry, setSelectedCountry] = useState(Countries.SPAIN);
  const { temperatureService } = useDependencies();

  const result = convert(parseFloat(temperature), fromUnit, toUnit);

  const getTemperature = () => temperatureService.getTemperature({headers: {'x-forwarded-for': CountriesIpsMap[selectedCountry] }}).then((temperature) => {
    setCurrentTemperature(temperature);
    setTemperature(temperature.toString());
  });

  useEffect(() => {
    getTemperature()
  }, []);

  return (
    <main>
      <CurrentTemperature temperature={currentTemperature} country={selectedCountry} />
      <form className="temperature-form">
        <SelectUnit
          id="temperature-from"
          label="From"
          value={fromUnit}
          onChange={setFromUnit}
        />
        <SelectUnit
          id="temperature-to"
          label="To"
          value={toUnit}
          onChange={setToUnit}
        />
        <SelectCountry
          id="country"
          label="Country"
          value={selectedCountry}
          onChange={setSelectedCountry}
        />
        <TemperatureInput
          value={temperature}
          onChange={(temperature) => setTemperature(temperature)}
          unit={fromUnit}
        />
        <p className="result">
          <span>Conversion result: </span>
          <span>
            {isNaN(result) ? "-" : Math.round(result * 10) / 10}{" "}
            {toSymbol(toUnit)}
          </span>
        </p>
      </form>
      <button onClick={getTemperature}>Get Temperature</button>
    </main>
  );
};

import { useEffect, useState } from "react";
import "./App.css";
import { TemperatureUnit, toSymbol } from "./models/TemperatureUnit.js";
import { SelectUnit } from "./components/SelectUnit.jsx";
import { TemperatureInput } from "./components/TemperatureInput.jsx";
import { convert } from "./models/Temperature.js";
import { CurrentTemperature } from "./components/CurrentTemperature.jsx";
import { useDependencies } from "./hooks/useDependencies.js";

export const App = () => {
  const [currentTemperature, setCurrentTemperature] = useState();
  const [temperature, setTemperature] = useState("");
  const [fromUnit, setFromUnit] = useState(TemperatureUnit.CELSIUS);
  const [toUnit, setToUnit] = useState(TemperatureUnit.CELSIUS);
  const { temperatureService } = useDependencies();

  const result = convert(parseFloat(temperature), fromUnit, toUnit);

  useEffect(() => {
    temperatureService.getTemperature({headers: {'x-forwarded-for': '50.2.62.232'}}).then((temperature) => {
      setCurrentTemperature(temperature);
      setTemperature(temperature.toString());
    });
  }, []);

  return (
    <main>
      <CurrentTemperature temperature={currentTemperature} />
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
    </main>
  );
};

import * as PropTypes from "prop-types";
import "./SelectCountry.css";
import { AllCountries } from "../models/Countries.js";

export const SelectCountry = ({ id, label, value, onChange }) => (
  <div className="select-unit">
    <label htmlFor={id}>{label}</label>
    <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
      {AllCountries.map((unit) => (
        <option key={unit} value={unit}>
          {unit}
        </option>
      ))}
    </select>
  </div>
);

SelectCountry.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

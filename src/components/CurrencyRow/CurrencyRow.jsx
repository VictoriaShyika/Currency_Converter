import React from "react";
import "./CurrencyRow.css";

export default function CurrencyRow(props) {
  return (
    <div className="row">
      <input
        type="number"
        value={props.amount}
        onChange={props.onChangeAmount}
      />
      <div className="select-box">
        <select
          value={props.selectedCurrency}
          onChange={props.onChangeCurrency}
        >
          {props.currencyOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

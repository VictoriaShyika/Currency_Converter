import React from "react";
import './Header.css'

export default function Header(props) {
  return (
    <div className="header">
      <div> <strong>Currency Convertor</strong></div>
      <div className="usdToUah"> 1 <span className="USD">USD</span> = {props.usdToUah} <span className="UAH">UAH</span></div>
    </div>
  );
}
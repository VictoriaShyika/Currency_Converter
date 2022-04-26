import { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./components/CurrencyRow/CurrencyRow";
import Header from "./components/Header/Header";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [usdToUah, setUsdToUah] = useState();

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = (amount * exchangeRate).toFixed(2);;
  } else {
    toAmount = amount;
    fromAmount = (amount / exchangeRate).toFixed(2);;
  }

  useEffect(() => {
    fetch("//api.exchangerate.host/latest")
      .then((res) => res.json())
      .then((data) => {
        const uahCurrency = Object.keys(data.rates)[147];
        setCurrencyOptions([...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(uahCurrency);
        setExchangeRate(data.rates[uahCurrency]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency !== undefined && toCurrency !== undefined) {
      fetch(
        `//api.exchangerate.host/latest?base=${fromCurrency}&symbols=${toCurrency}`
      )
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    fetch("https://api.exchangerate.host/latest?base=USD&symbols=UAH")
      .then((res) => res.json())
      .then((data) => {
        setUsdToUah(data.rates["UAH"].toFixed(2));
      });
  }, []);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <div className="App">
      <Header usdToUah={usdToUah} />
      <div className="container">
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={(e) => setFromCurrency(e.target.value)}
          onChangeAmount={handleFromAmountChange}
          amount={fromAmount}
        />
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={(e) => setToCurrency(e.target.value)}
          onChangeAmount={handleToAmountChange}
          amount={toAmount}
        />
      </div>
    </div>
  );
}

export default App;

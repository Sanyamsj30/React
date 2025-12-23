import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import { useState ,useEffect} from "react";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setfrom] = useState("USD");
  const [to, setto] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);

  

  const currencyInfo = useCurrencyInfo(from);
  const options = currencyInfo
  ? ["USD", ...Object.keys(currencyInfo)]
  : [];

  const isLoading = options.length === 0;

  useEffect(() => {
  if (options.length > 0 && !options.includes(from)) {
    setfrom("USD");
  }
}, [options]);

  useEffect(() => {
  if (options.length > 0 && !options.includes(to)) {
    setto("INR");
  }
}, [options]);







  const swap = () => {
    setfrom(to);
    setto(from);

    if (currencyInfo[from]) {
      setConvertedAmount(amount * currencyInfo[from]);
    }
  };

  const convert = () => {
    if (!currencyInfo[to]) return;
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md mx-auto border rounded-lg p-5 bg-white/30">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <InputBox
            label="From"
            amount={amount}
            currencyOption={options}
            onCurrencyChange={(currency) => setfrom(currency)}
            selectCurrency={from}
            onAmountChange={(value) => setAmount(value)}
            currencyDisable={isLoading}
          />

          <div className="relative w-full h-0.5 my-4">
            <button
              type="button"
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-2 py-1 rounded"
              onClick={swap}
            >
              swap
            </button>
          </div>

          <InputBox
            label="To"
            amount={convertedAmount}
            currencyOption={options}
            onCurrencyChange={(currency) => setto(currency)}
            selectCurrency={to}
            amountDisable
            currencyDisable={isLoading}
            onAmountChange={(value) => setAmount(value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg mt-4"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;

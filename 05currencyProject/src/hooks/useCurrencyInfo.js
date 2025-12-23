import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    if (!currency) return;

    fetch(`https://api.frankfurter.app/latest?from=${currency}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.rates || {});
      })
      .catch((err) => {
        console.error("Currency API error:", err);
        setData({});
      });
  }, [currency]);

  return data;
}

export default useCurrencyInfo;

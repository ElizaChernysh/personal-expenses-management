import React, { useState, useEffect, useCallback } from "react";
import { Button, Form } from "react-bootstrap";
import {
  getCalculationExtenses,
  setOptionExtenses,
  loadCurrency,
} from "../../sore/reducers/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCurrencyFromServer } from "../../api/api";
import './TotalAmount.css';

const TotalAmount = () => {
  const [totalExtenses, setTotalExtenses] = useState(0);
  const dispatch = useDispatch();

  const result = useSelector((state) => state.purchase.totalAmount);
  const purchasesArray = useSelector((state) => state.purchase.purchases);
  const currencyRates = useSelector((state) => state.purchase.currencyOptions);
  const option = useSelector((state) => state.purchase.optionExtenses);

  useEffect(() => {
    getCurrencyFromServer().then((data) => {
      dispatch(loadCurrency(data.rates));
      console.log(data.rates);
    });
  }, [dispatch]);

  const handleCurrencyTotal = useCallback(
    (e) => {
      dispatch(setOptionExtenses(e.target.value));
    },
    [dispatch]
  );

  const calculateExtenses = () => {
    let value = 0;

    value = purchasesArray.reduce((a, b) => {
      if (b.currencyName === "UAH") {
        a += Number(b.amount);
      } else if (b.currencyName === "EUR") {
        a += Number(b.amount) / currencyRates.EUR;
      } else if (b.currencyName === "PLN") {
        a += Number(b.amount) / currencyRates.PLN;
      }

      return a;
    }, 0);

    dispatch(getCalculationExtenses(value));
  };

  useEffect(() => {
    if (option === "UAH") {
      setTotalExtenses(Math.round(result * 100) / 100);
    } else {
      setTotalExtenses(Math.round(result * currencyRates[option] * 100) /100);
    }
  }, [currencyRates, option, result]);

  return (
    <div className="TotalAmount">
      <h2 className="TotalAmount__title">Total</h2>
      <div className="TotalAmount__wrapper">
      <Form.Select
        defaultValue="UAH"
        onChange={(event) => handleCurrencyTotal(event)}
        className="TotalAmount__select"
      >
        <option value="UAH">UAH</option>
        <option value="EUR">EUR</option>
        <option value="PLN">PLN</option>
      </Form.Select>
      <Button 
        variant="primary" 
        type="button" 
        onClick={calculateExtenses}
        className="TotalAmount__button"
      >
        Calculation of expenses
      </Button>

      <p className="TotalAmount__result">{totalExtenses}</p>
      </div>
    </div>
  );
};

export default TotalAmount;

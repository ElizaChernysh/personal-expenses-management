import React, {useState, useCallback} from "react";
import {setCurrencyOption, addPurchase } from "../../sore/reducers/productSlice";
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from "uuid";
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


const FormForCards = () => {
  const [good, setGoods] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');

  const dispatch = useDispatch();
  const currentCurrencyOption = useSelector(state => state.purchase.currentCurrencyOption);

  const handleCurrencyOption = useCallback((e) => {
    dispatch(setCurrencyOption(e.target.value));
  }, [dispatch]);

  const handleChangeGood = useCallback((e) => {
    setGoods(e.target.value);
  }, [setGoods]);

  const handleChangeDate = useCallback((e) => {
    setDate(e.target.value);
  }, [setDate]);

  const handleChangeAmount = useCallback((e) => {
    setAmount(e.target.value);
  }, [setAmount]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (good === "" || !good.trim() || amount === "" || date === "") {
      alert("Input is Empty");
    } else {
      dispatch(addPurchase({
        id: uuidv4(),
        product: good,
        amount: amount,
        currencyName: currentCurrencyOption,
        time: date,
      }));
      setGoods('');
      setDate('');
      setAmount('');
    }
  }

  return (
    <div>
      {" "}
      <form className="Form" onSubmit={handleSubmit}>
        <label className="">
          Choose date{" "}
          <Form.Control
            type="date"
            min="2020-01-01"
            value={date}
            onChange={(event) => handleChangeDate(event)}
            className="Form__control"
          />
        </label>
        <Form.Control
          type="text"
          placeholder="enter good"
          value={good}
          onChange={(event) => handleChangeGood(event)}
          className="Form__control"
        />
        <label>
          Choose amount and currency{" "}
          <Form.Control
            type="number"
            value={amount}
            onChange={(event) => handleChangeAmount(event)}
            className="Form__control"
          />
          <Form.Select
            defaultValue="UAH"
            onChange={(event) => handleCurrencyOption(event)}
            className="Form__control"
          >
            <option value="UAH">UAH</option>
            <option value="EUR">EUR</option>
            <option value="PLN">PLN</option>
          </Form.Select>
        </label>
        <Button variant="outline-primary" type="submit">
          Add purchase
        </Button>
      </form>
    </div>
  );
};

export default FormForCards;

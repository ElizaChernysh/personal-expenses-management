import { useState, useCallback, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { loadCurrency, setCurrencyOption, addPurchase } from "./sore/reducers/productSlice";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from 'react-redux';
import { getCurrencyFromServer } from './api/api';
import PurchasesList from './components/PurchasesList';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

export const App = () => {
  const [good, setGoods] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();
  const currentCurrencyOption = useSelector(state => state.purchase.currentCurrencyOption);

  // console.log(purchasesArray);

  useEffect(() => {
    getCurrencyFromServer()
      .then(data => {
        dispatch(loadCurrency(data.rates))
        console.log(data.rates)
      })
  }, [dispatch]);

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
    <div className="App">
      <header className="App-header">
        <h1>Title</h1>

        <form className='Form' onSubmit={handleSubmit}>
          <label className=''>
            Choose date
            {' '}
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
            Choose amount and currency
            {' '}
            <Form.Control
              type="number"
              value={amount}
              onChange={(event) => handleChangeAmount(event)}
              className="Form__control"
            />
            <Form.Select
              defaultValue='UAN'
              onChange={(event) => handleCurrencyOption(event)}
              className="Form__control"
            >
              <option value='UAH'>UAH</option>
              <option value='EUR'>EUR</option>
              <option value='PLN'>PLN</option>
            </Form.Select>
          </label>
          <Button
            variant="outline-primary"
            type="submit"
          >
            Add purchase
          </Button>
        </form>
      </header>


      <PurchasesList />
    </div>
  );
}

export default App;

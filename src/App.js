import { useState, useCallback, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { loadCurrency, setCurrencyOption, addPurchase } from "./sore/reducers/productSlice";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from 'react-redux';
import { getCurrencyFromServer } from './api/api';
// import Tabs from 'react-bootstrap/Tabs';
// import Tab from 'react-bootstrap/Tab';

export const App = () => {
  const [good, setGoods] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();
  const currentCurrencyOption = useSelector(state => state.purchase.currentCurrencyOption);
  const purchasesArray = useSelector(state => state.purchase.purchases);

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
      // setGoods('');
      // setDate('');
      
    }
  }

  // console.log(purchasesArray);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Title</h1>

        <form className='Form' onSubmit={handleSubmit}>
          <label>
            Choose date
            {' '}
            <input
              type="date"
              min="2020-01-01"
              value={date}
              onChange={(event) => handleChangeDate(event)}
            />
          </label>
          <input
            type="text"
            placeholder="enter good"
            value={good}
            onChange={(event) => handleChangeGood(event)}
          />
          <label>
            Choose amount and currency
            {' '}
            <input 
              type="number"
              value={amount}
              onChange={(event) => handleChangeAmount(event)}
            />
            <select
              onChange={(event) => handleCurrencyOption(event)}
            >
              <option selected value="UAH">UAH</option>
              <option value="EUR">EUR</option>
              <option value="PLN">PLN</option>
            </select>
          </label>
          <button type="submit">purchase</button>
        </form>
      </header>

     <ul>
      {purchasesArray.length > 0 &&
        purchasesArray.map((item) => {
          return (
            <li key={item.id}>
              <p>{item.time}</p>
              <p>{item.product}</p>
              <p>{item.amount}<span>{' '}{item.currencyName}</span></p>
            </li>
          )
        })}
     </ul>
    </div>
  );
}

export default App;

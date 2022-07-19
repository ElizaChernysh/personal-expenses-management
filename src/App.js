import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { loadCurrency } from "./sore/reducers/productSlice";
import { useDispatch } from 'react-redux';
import { getCurrencyFromServer } from './api/api';
import PurchasesList from './components/PurchasesList/PurchasesList';
import FormForCards from "./components/Form/FormForCards";
import TotalAmount from './components/TotalAmount/TotalAmount';

export const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    getCurrencyFromServer()
      .then(data => {
        dispatch(loadCurrency(data.rates))
        console.log(data.rates)
      })
  }, [dispatch]);

  return (
    <div className="App">
      <div className='App__wrapper App__wrapper-forms'>
        <header className="App__header" >
        </header>
        <FormForCards />
        <TotalAmount />
      </div>
      <div className='App__wrapper App__wrapper-lists'>
        <PurchasesList />
      </div>
    </div>
  );
}

export default App;

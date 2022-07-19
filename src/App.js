import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { loadCurrency} from "./sore/reducers/productSlice";
import { useDispatch } from 'react-redux';
import { getCurrencyFromServer } from './api/api';
import PurchasesList from './components/PurchasesList/PurchasesList';
import FormForCards from "./components/Form/FormForCards";

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
      <header className="App-header">
        <h1>Title</h1>
      </header>
      <FormForCards/>
      <PurchasesList />
    </div>
  );
}

export default App;

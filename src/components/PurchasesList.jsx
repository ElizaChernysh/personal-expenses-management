import React from 'react';
// import { addPurchase } from '../sore/reducers/productSlice';
import { useSelector } from 'react-redux';
import './PurchasesList.css';

const PurchasesList = () => {
  const purchasesArray = useSelector(state => state.purchase.purchases);

  return (
    <div className='PurchasesList'>
      <h2 className='PurchasesList__title'>Your Purchases</h2>
      <ul className='PurchasesList__list'>
      {purchasesArray.length > 0 &&
        purchasesArray.map((item) => {
          return (
            <li key={item.id} className="PurchasesList__item">
              <p>{item.time}</p>
              <p>{item.product}</p>
              <p>{item.amount}<span>{' '}{item.currencyName}</span></p>
            </li>
          )
        })}
     </ul>
    </div>
  )
}

export default PurchasesList
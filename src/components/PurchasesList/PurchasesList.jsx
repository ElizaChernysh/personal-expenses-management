import React from "react";
import { removePurchase } from '../../sore/reducers/productSlice';
import { useDispatch, useSelector } from "react-redux";
import "./PurchasesList.css";

const PurchasesList = () => {
  const purchasesArray = useSelector((state) => state.purchase.purchases);
  const dispatch = useDispatch();

  return (
    <div className="PurchasesList">
      <h2 className="PurchasesList__title">Your Purchases</h2>
      <ul className="PurchasesList__list">
        {purchasesArray.length > 0 &&
          purchasesArray.map((item) => {
            return (
              <li key={item.id} className="PurchasesList__item">
                <p className="PurchasesList__time">{item.time}</p>
                <p className="PurchasesList__product">{item.product}</p>
                <p className="PurchasesList__amount">
                  {item.amount}
                  <span className="PurchasesList__currency"> {item.currencyName}</span>
                </p>
                <button
                  className="PurchasesList__button"
                  type="button"
                  onClick={() => dispatch(removePurchase(item.id))}
                >
                  ❌
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default PurchasesList;

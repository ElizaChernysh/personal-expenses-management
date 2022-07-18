import { configureStore } from '@reduxjs/toolkit';
import purchaseSlice from './reducers/productSlice';


export const store = configureStore({
  reducer: {
    purchase: purchaseSlice,
  }
});

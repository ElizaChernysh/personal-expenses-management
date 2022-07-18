import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // purchases: [{
  //   id: 0,
  //   product: '',
  //   amount: '',
  //   currencyName: '',
  //   time: '',

  // }],
  purchases: [],
  currentCurrencyOption: 'UAN',
  currencyOptions: [],
};

export const productSlice = createSlice({
  name: 'purchase',
  initialState,

  reducers: {
    loadCurrency(state, action) {
      state.currencyOptions = action.payload;
    },

    setCurrencyOption(state, action) {
      state.currentCurrencyOption = action.payload;
    },

    // addPurchase(state, action) {
    //   state.purchases = [...state.purchases, action.payload];
    // },
    addPurchase: (state,action) => {
      state.purchases.push(action.payload);
    },

    deleteEvent(state, action) {
      state.purchases = [...state.purchases, action.payload];
    },

    setPurchaseToEdit(state, action) {
      state.purchaseToEdit = action.payload;
    },

    editPurchase(state, action) {
      state.purchases = state.events.map(purchase => {
        if (purchase.id === state.purchaseToEdit) {
          return {
            ...purchase,
            product: action.payload.product,
            time: action.payload.time,
            amount: action.payload.amount,
          };
        }

        return {
          ...purchase,
        };
      });
    },
  },
});

export const {loadCurrency, setCurrencyOption, addPurchase, deleteEvent, setPurchaseToEdit, editPurchase } = productSlice.actions;
export default productSlice.reducer;
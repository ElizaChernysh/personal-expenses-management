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
  currentCurrencyOption: 'UAH',
  currencyOptions: [],
  optionExtenses: 'UAH',
  totalAmount: '',
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

    addPurchase: (state,action) => {
      state.purchases.push(action.payload);
    },

    removePurchase: (state, action) => {
      state.purchases = state.purchases.filter(item => item.id !== action.payload)
    },

    setPurchaseToEdit(state, action) {
      state.purchaseToEdit = action.payload;
    },

    getCalculationExtenses(state, action) {
      state.totalAmount = action.payload;
    },

    setOptionExtenses(state, action) {
      state.optionExtenses = action.payload;
    },
  },
});

export const {loadCurrency, setCurrencyOption, addPurchase, setPurchaseToEdit, getCalculationExtenses, setOptionExtenses, removePurchase } = productSlice.actions;
export default productSlice.reducer;
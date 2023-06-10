import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customers: [],
  customer: null,
  isLoading: false,
  error: null,
};

const customerslice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    // Reducer functions for CRUD actions
    reset(state) { 
      state.error = null;
    },
    customersLoading(state) {
      state.isLoading = true;
    },
    customersReceived(state, action) {
      state.customers = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    customersError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    customerAdded(state, action) {
      state.customers.push(action.payload);
      state.isLoading = false;
      state.error = null;
    },
    customerUpdated(state, action) {
      const { id, updatedCustomer } = action.payload;
      console.log(id, updatedCustomer);
      const customerIndex = state.customers.findIndex(customer => customer._id === id);
      if (customerIndex !== -1) {
        state.customers[customerIndex] = updatedCustomer;
      }
      state.isLoading = false;
      state.error = null;
    },
    customerDeleted(state, action) {
      const id = action.payload;
      state.customers = state.customers.filter(customer => customer._id !== id);
      state.isLoading = false;
      state.error = null;
    },
    getCustomerByIdSuccess(state, action) {
      state.customer = action.payload;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  customersLoading,
  customersReceived,
  customersError,
  customerAdded,
  customerUpdated,
  customerDeleted,
  getCustomerByIdSuccess,
  reset
} = customerslice.actions;

export default customerslice.reducer;
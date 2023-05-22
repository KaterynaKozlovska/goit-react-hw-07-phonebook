// import { combineReducers } from 'redux';

// import items from './item';
// import filter from './filter';

// const contactsReducer = combineReducers({
//   items,
//   filter,
// });

// export default contactsReducer;

import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, saveContact, deleteContact } from './operations';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};
const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(saveContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      })
      .addMatcher(isAnyOf(...getActions('fulfilled')), handleFulfilled)
      .addMatcher(isAnyOf(...getActions('pending')), handlePending)
      .addMatcher(isAnyOf(...getActions('rejected')), handleRejected),
});

const handleFulfilled = state => {
  state.isLoading = false;
  state.error = null;
};

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const extraActions = [fetchContacts, saveContact, deleteContact];

const getActions = type => extraActions.map(action => action[type]);

export const contactsReducer = contactsSlice.reducer;

export default contactsReducer;

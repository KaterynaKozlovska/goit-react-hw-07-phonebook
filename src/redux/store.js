import { configureStore } from '@reduxjs/toolkit';

import { contactsReducer } from './contacts/contacts';
import { filterSlice } from './contacts/filter';

const store = configureStore({
  reducer: { contacts: contactsReducer, filter: filterSlice.reducer },
});

export { store };

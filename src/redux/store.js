import { configureStore } from '@reduxjs/toolkit';

import contactsReducer from './contacts/contacts';
import { filterSlice } from './contacts/filter';

// const rootReducer = combineReducers({
//   contacts: contactsReducer,
// });
// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['contacts'],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export const persistor = persistStore(store);
const store = configureStore({
  reducer: { contacts: contactsReducer, filter: filterSlice.reducer },
});

export { store };

import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const isDublicate = ({ name, number }, contacts) => {
  const normalizedName = name.toLowerCase();
  const normalizedNumber = number.toLowerCase();

  const result = contacts.find(item => {
    return (
      normalizedName === item.name.toLowerCase() &&
      normalizedNumber === item.number.toLowerCase()
    );
  });
  return Boolean(result);
};

const contactsItemsSlice = createSlice({
  name: 'contacts',
  initialState: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  reducers: {
    handleAddContact: {
      reducer: (store, { payload }) => {
        if (isDublicate(payload, store)) {
          alert(`${payload.name} : ${payload.number} is already in list`);
          return;
        }
        store.push(payload);
      },
      prepare: data => {
        return {
          payload: {
            ...data,
            id: nanoid(),
          },
        };
      },
    },
    handleRemoveContact: (store, { payload }) =>
      store.filter(({ id }) => id !== payload),
  },
});

export const { handleAddContact, handleRemoveContact } =
  contactsItemsSlice.actions;
export default contactsItemsSlice.reducer;

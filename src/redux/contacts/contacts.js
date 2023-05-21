import { combineReducers } from 'redux';

import items from './item';
import filter from './filter';

const contactsReducer = combineReducers({
  items,
  filter,
});

export default contactsReducer;

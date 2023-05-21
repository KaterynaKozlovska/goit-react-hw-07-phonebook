import React from 'react';
import PropTypes from 'prop-types';
import css from './List.module.css';
// import css from '../buttons/IconBtn/IconBtn.module.css';
import { ReactComponent as DeleteIcon } from '../../assets/close.svg';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { handleRemoveContact } from '../../redux/contacts/item';

export const ContactList = () => {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);

  const isVisibleContacts = () =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  const filterContact = isVisibleContacts();
  const dispatch = useDispatch();

  return (
    <ul className={css.list}>
      {filterContact.map(({ id, name, number }) => {
        return (
          <li className={css.item} key={id}>
            {name}: {number}
            <button
              className={css.btn__icon}
              aria-label="Delete contact"
              onClick={() => dispatch(handleRemoveContact(id))}
            >
              <DeleteIcon width="10" heigth="10" />
            </button>
          </li>
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

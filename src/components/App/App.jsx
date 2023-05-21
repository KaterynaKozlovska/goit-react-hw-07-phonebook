import { ContactForm } from '../Form/Form';
import { ContactList } from '../List/List';
import { Filter } from '../Filter/Filter';
import css from './App.module.css';
// import { useState } from 'react';
// import useLocalStorage from '../../hooks/useLocalStorage';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  selectContactsItems,
  selectIsLoading,
  selectError,
} from '../../redux/contacts/selectors';
import { fetchContacts } from '../../redux/contacts/operations';
import { toast } from 'react-toastify';

export default function App() {
  // state = {
  //   contacts: [
  //     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ],
  //   filter: '',
  // };

  // const [contacts, setContacts] = useLocalStorage('contacts', []);
  // const [filter, setFilter] = useState('');
  const contactsItems = useSelector(selectContactsItems);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  // componentDidMount() {
  //   const contacts = localStorage.getItem('contacts');
  //   const parsedСontacts = JSON.parse(contacts);

  //   if (parsedСontacts) {
  //     this.setState({ contacts: parsedСontacts });
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   const nextContacts = this.state.contacts;
  //   const prevContacts = prevState.contacts;

  //   if (nextContacts !== prevContacts) {
  //     localStorage.setItem('contacts', JSON.stringify(nextContacts));
  //   }
  // }

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    if (error === 'ERR_BAD_REQUEST') {
      toast.error('There are some problems! Try again later.');
      return;
    }
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // const formSubmitHandler = formData => {
  //   addToContacts(formData);
  // };

  // const addToContacts = contact => {
  //   const normalizedName = contact.name.toLowerCase();
  //   const isExist = contacts.some(
  //     ({ name }) => name.toLowerCase() === normalizedName
  //   );

  //   if (isExist) {
  //     return alert(`${contact.name} is already in contacts`);
  //   }

  //   const contactsList = contacts.concat(contact);
  //   return setContacts(contactsList);
  // };

  // const changeFilter = e => {
  //   setFilter(e.currentTarget.value);
  // };

  // const getVisibleContacts = () => {
  //   const normalizedFilter = filter.toLowerCase();

  //   return contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(normalizedFilter)
  //   );
  // };

  // const deleteContact = contactId => {
  //   setContacts(contacts.filter(contact => contact.id !== contactId));
  // };

  // const visibleContacts = getVisibleContacts();

  return (
    <div className={css.container}>
      {isLoading}
      <section className={css.section}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm />
      </section>
      <section className={css.section}>
        <h2 className={css.title}>Contacts</h2>
        <Filter />
        <ContactList />
      </section>
    </div>
  );
}

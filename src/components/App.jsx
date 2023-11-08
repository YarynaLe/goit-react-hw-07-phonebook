import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Toaster, toast } from 'react-hot-toast';

import { fetchContacts } from 'redux/contacts/operations';
import { useContacts, useLoading, useError } from 'hooks';

import { BsFillPersonLinesFill } from 'react-icons/bs';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { Spinner } from 'components/Spinner/Spinner';

import {
  Container,
  Title,
  ContactsTitle,
  TitleWrap,
} from 'components/App.styled';

export default function App() {
  const contactsItems = useContacts();
  const isLoading = useLoading();
  const error = useError();

  const dispatch = useDispatch();

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

  return (
    <Container>
      {isLoading && <Spinner />}

      <div>
        <TitleWrap>
          <BsFillPersonLinesFill size={32} color={'#396fa5'} />
          <Title>Phonebook</Title>
        </TitleWrap>

        <ContactForm />

        <ContactsTitle>Contacts</ContactsTitle>
        <Filter />
        {contactsItems.length ? (
          <ContactList />
        ) : (
          <p>
            There are no contacts in your Phonebook. Please add your first
            contact!"
          </p>
        )}
      </div>
      <Toaster />
    </Container>
  );
}

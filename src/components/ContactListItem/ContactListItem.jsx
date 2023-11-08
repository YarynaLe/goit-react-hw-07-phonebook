import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contacts/operations';
import { MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { GoXCircle } from 'react-icons/go';

import {
  ListItem,
  DeleteContactItem,
  ContactItem,
  ContactItemName,
  ContactItemPhone,
  ContactItemNumber,
} from 'components/ContactListItem/ContactListItem.styled';

export const ContactListItem = ({ id, name, number }) => {
  const dispatch = useDispatch();

  const removeContact = id => {
    dispatch(deleteContact(id));
    toast.error(`${name} removed from contacts`);
  };

  return (
    <ListItem key={id}>
      <ContactItem>
        <ContactItemName>{name}</ContactItemName>
        <ContactItemPhone>
          <GoXCircle size={12} color={'#c4c4c4'} />
          <ContactItemNumber>{number}</ContactItemNumber>
        </ContactItemPhone>
      </ContactItem>

      <DeleteContactItem onClick={() => removeContact(id)}>
        <MdDeleteForever size={26} color={'lightCoral'} />
      </DeleteContactItem>
    </ListItem>
  );
};

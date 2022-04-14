import React, {
  useRef,
  MutableRefObject,
  KeyboardEventHandler,
} from "react";

import {ContactsContainer , Container, Contact} from './styles';
import {StyledInput} from '../input';
import SimpleProfile from '../simple-profile';
import Button from '../button';

import {useContactsContext} from '../../contexts/contacts.context';

interface ContactsProps {
  setChat: (val: string) => void;
  orgId?: string;
}

const Contacts: React.FC<ContactsProps> = ({setChat, orgId}) => {
  const {contacts, contactsPage: page, fetchContacts, currContact} = useContactsContext();
  const keywordRef = useRef() as MutableRefObject<HTMLInputElement>;

  const fetchWithKeyword: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key !== "Enter") return;
    if (keywordRef.current.value.length < 1) return window.alert("Field empty");
    fetchContacts!(keywordRef.current.value);
  };

  return (
    <ContactsContainer>
      <StyledInput
        placeholder="Name | Email | Role"
        ref={keywordRef}
        onKeyDown={fetchWithKeyword}
      />
      <Container>
        {orgId && orgId.length > 0 && (
          <Contact 
            onClick={() => setChat(orgId)} 
            selected={currContact === orgId}
          >
            <SimpleProfile variant={2} id={orgId} />
          </Contact>
        )}
        {contacts.map(({ id }, idx) => (
          <Contact 
            key={idx} 
            onClick={() => setChat(id)} 
            selected={currContact === id}
          >
            <SimpleProfile variant={2} id={id} />
          </Contact>
        ))}
        {page !== null && (
          <Button
            variant={6}
            text="Load more"
            disabled={false}
            onPress={fetchContacts!}
          />
        )}
      </Container>
    </ContactsContainer>
  );
};

export default Contacts;

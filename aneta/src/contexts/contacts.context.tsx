import React, {createContext, useContext, useState} from "react";
import axios from "axios";

import {useAPIContext} from './api.context';
import {useOrganisationContext} from './organisation.context';
import {useUserContext} from './user.context';

interface ContactsContextInterface {
  contacts: Array<{id: string}>;
  contactsPage: string | null;
  currContact: string;
  setCurrContact?: (val: string) => void;
  fetchContacts?: (val?: string) => void;
  resetContacts?: () => void;
}

const defaultState: ContactsContextInterface = {
  contacts: [],
  contactsPage: '',
  currContact: ''
};

export const ContactsContext = createContext<ContactsContextInterface>(defaultState);

export const useContactsContext = () => useContext(ContactsContext);

export const ContactsContextProvider: React.FC = ({children}) => {
    const {REST_API} = useAPIContext();
    const {orgName: hon, token: htkn} = useOrganisationContext();
    const {orgName: eon, token: etkn, setLoading} = useUserContext();
    const [contacts, setContacts] = useState<Array<{id: string}>>(defaultState.contacts);
    const [contactsPage, setContactsPage] = useState<string | null>(defaultState.contactsPage);
    const [currContact, setCurrContact] = useState<string>(defaultState.currContact);
    
    const fetchContacts = (kw: string = "") => {
      if (contactsPage === null && !kw?.length) return;
      const token = htkn.length > 0 ? htkn : etkn;
      const orgName = hon.length > 0 ? hon : eon;
      const reqBody: {orgName: string; page?: string; keyword?: string} = {orgName};
      if (contactsPage?.length) reqBody.page = contactsPage;
      if (kw?.length > 0) {
        delete reqBody.page;
        reqBody.keyword = kw;
      };
      axios.post(`${REST_API}/organisation/employee?joined=true`, {...reqBody}, {
        headers: {Authorization: `Bearer ${token}`,}
      }).then(({data}) => {
        if (kw?.length) setContacts(data.resource || []);
        else setContacts([...contacts, ...(data.resource || [])]);
        setContactsPage(data.pageState);
      }).catch(() => setLoading!(false));
    };

    const resetContacts = () => {
        setContacts([]);
        setContactsPage('');
    };

    return (
        <ContactsContext.Provider
          value={{
            contacts, contactsPage, currContact,
            setCurrContact, fetchContacts, resetContacts
          }}
        >{children}</ContactsContext.Provider>
    );
};
import React, {useEffect, useRef, useLayoutEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {MainContainer, RightContainer, NotSelected} from './styles';

import NavHR from "../../components/nav-hr";
import ChatScreen from "../../components/chat-screen";
import Contacts from "../../components/contacts";
import ErrorPage from "../error";

import {useUserNavContext} from "../../contexts/user-nav.context";
import {useContactsContext} from '../../contexts/contacts.context';
import {useOrganisationContext} from '../../contexts/organisation.context';

interface HRChatPageProps {}

const HRChatPage: React.FC<HRChatPageProps> = () => {
  const {changeUni} = useUserNavContext();
  const params = useParams();
  const {orgName} = useOrganisationContext();
  const {currContact, setCurrContact, fetchContacts, resetContacts} = useContactsContext();
  const fetched = useRef<boolean>(false);
  const [show, setShow] = useState<boolean|null>();

  useEffect(() => {
    changeUni!(1);
    if (fetched.current) return;
    fetched.current = true;
    fetchContacts!();
    return () => {
      resetContacts!();
      setCurrContact!('');
    };
  }, []);

  useLayoutEffect(() => {
    if (params.orgName !== orgName) setShow(false);
    else setShow(true);
  }, [params.orgName, orgName]);

  if (show === false) return <ErrorPage />;

  return (
    <MainContainer>
      <NavHR />
      <RightContainer>
        {currContact.length
        ? <ChatScreen chatId={currContact} />
        : <NotSelected>Select a recipient from the right side</NotSelected>}
        <Contacts setChat={setCurrContact!} />
      </RightContainer>
    </MainContainer>
  );
};

export default HRChatPage;

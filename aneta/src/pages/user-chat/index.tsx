import React, {useEffect, useState, useRef} from "react";
import axios from "axios";

import {MainContainer, RightContainer, NotSelected} from './styles';

import NavUser from "../../components/nav-user";
import ChatScreen from "../../components/chat-screen";
import Contacts from "../../components/contacts";

import {useUserContext} from "../../contexts/user.context";
import {useAPIContext} from "../../contexts/api.context";
import {useUserNavContext} from "../../contexts/user-nav.context";
import {useContactsContext} from '../../contexts/contacts.context';

interface UserChatPageProps {}

const UserChatPage: React.FC<UserChatPageProps> = () => {
  const {changeUni} = useUserNavContext();
  const {REST_API} = useAPIContext();
  const {id, token, setLoading, orgName} = useUserContext();
  const {currContact, setCurrContact, fetchContacts, resetContacts} = useContactsContext();
  const [joined, setJoined] = useState<boolean>(false);
  const [orgId, setOrgId] = useState<string>('');
  const fetched = useRef<boolean>(false);
  
  useEffect(() => {
    changeUni!(1);
    if (fetched.current) return;
    fetched.current = true;
    fetchContacts!();
    return () => {
      resetContacts!();
      setCurrContact!("");
    };
  }, []);

  useEffect(() => {
    if (!id.length || !token.length) return;
    setLoading!(true);
    axios.post(`${REST_API}/employee/joined`, {id}, {
      headers: {Authorization: `Bearer ${token}`}
    }).then(({data}) => {
      setJoined(data.joined);
      setLoading!(false);
    }).catch(() => setLoading!(false));
  }, [id, token]);

  useEffect(() => {
    axios.post(`${REST_API}/organisation/get-id`, {orgName}, {
      headers: {Authorization: `Bearer ${token}`}
    }).then(({data}) => {
      setOrgId(data.id);
    }).catch(() => {});
  }, []);

  return (
    <MainContainer>
      <NavUser joined={joined} />
      <RightContainer>
        {currContact.length 
        ? <ChatScreen chatId={currContact} /> 
        : <NotSelected>Select a recipient from the right side</NotSelected>}
        <Contacts setChat={setCurrContact!} orgId={orgId} />
      </RightContainer>
    </MainContainer>
  );
};

export default UserChatPage;

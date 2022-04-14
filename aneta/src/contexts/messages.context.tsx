import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";

import {useAPIContext} from './api.context';
import {useOrganisationContext} from './organisation.context';
import {useUserContext} from './user.context';
import {useSocketContext} from './socket.context';
import {useContactsContext} from './contacts.context';

interface MessageType {
  id: string;
  message: string;
  sender: string;
}

interface MessagesContextInterface {
  messages: Array<MessageType>;
  msgPage: string | null;
  fetchMessages?: (reciever:string, initial?: boolean) => void;
  sendMessage?: (message: string, reciever: string, cb: (val?: boolean) => void) => void;
}

const defaultState: MessagesContextInterface = {
  messages: [],
  msgPage: ''
};

export const MessagesContext = createContext<MessagesContextInterface>(defaultState);

export const useMessagesContext = () => useContext(MessagesContext);

export const MessagesContextProvider: React.FC = ({children}) => {
  const {id: hid, token: htkn, orgName: hon} = useOrganisationContext();
  const {id: uid, token: utkn, orgName: uon, setLoading} = useUserContext();
  const {currContact} = useContactsContext();
  const {socket} = useSocketContext();
  const {REST_API} = useAPIContext();
  const [messages, setMessages] = useState<Array<MessageType>>(defaultState.messages);
  const [msgPage, setMsgPage] = useState<string | null>(defaultState.msgPage);

  const sender = hid.length > 0 ? hid : uid;
  const token = htkn.length > 0 ? htkn : utkn;
  const orgName = hon.length > 0 ? hon : uon;

  const fetchMessages = (reciever: string, initial: boolean = false) => {
    if (msgPage === null && !initial) return;
    const reqBody: any = {sender, reciever, orgName};
    if (msgPage?.length) reqBody.page = msgPage;
    if (initial) delete reqBody.page;
    axios.post(`${REST_API}/messages/fetch`, {...reqBody}, {
      headers: {Authorization: `Bearer ${token}`}
    }).then(({data}) => {
      if (initial) setMessages(data.messages);
      else setMessages([...data.messages, ...messages]);
      setMsgPage(data.pageState);
    }).catch(() => setLoading!(false));
  };

  const sendMessage = (message: string, reciever: string, cb: (val?: boolean) => void) => {
    const reqBody: any = {sender, reciever, orgName, msg: message};
    axios.post(`${REST_API}/messages/new`, {...reqBody}, {
      headers: {Authorization: `Bearer ${token}`}
    }).then(({data}) => {
      const roomId = [sender, reciever].sort().join('');
      socket?.emit("newMsg", {roomId, msgObj: data});
      setMessages([...messages, data]);
      cb(true);
    }).catch(() => {});
  };

  useEffect(() => {
    socket?.on("newMsg", (obj) => {
      setMessages([...messages, obj]);
    });
  }, [messages, socket, setMessages, currContact]);

  return (
    <MessagesContext.Provider
      value={{messages, msgPage, fetchMessages, sendMessage}}
    >{children}</MessagesContext.Provider>
  );
};

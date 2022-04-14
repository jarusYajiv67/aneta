import React, {useEffect, useState, useRef} from "react";

import {Container, Footer, Header, Body, NoConv} from './styles';

import SimpleProfile from '../simple-profile';
import HorizontalLine from '../horizontal-line';
import {StyledTextArea} from '../input';
import Button from '../button';
import Message from '../message';

import {useMessagesContext} from '../../contexts/messages.context';
import {useUserContext} from '../../contexts/user.context';
import {useOrganisationContext} from '../../contexts/organisation.context';
import {useSocketContext} from "../../contexts/socket.context";

interface ChatScreenProps {
  chatId: string;
}

const ChatScreen: React.FC<ChatScreenProps> = ({chatId}) => {
  const {id: oid} = useOrganisationContext();
  const {id: eid} = useUserContext();
  const {socket} = useSocketContext();
  const {
    messages, msgPage, 
    fetchMessages, sendMessage
  } = useMessagesContext();
  const [newMsg, setNewMsg] = useState<string>('');
  const messageEndRef = useRef<null | HTMLDivElement>(null);
  const scrolled = useRef<boolean>(false);

  const sender = oid.length > 0 ? oid : eid;
  const roomId = [chatId, sender].sort().join('');

  const scrollToBottom = (manip: boolean = false) => {
    if (scrolled.current && !manip) return;
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    scrolled.current = true;
  };

  useEffect(() => {
    fetchMessages!(chatId, true);
  }, [chatId]);

  useEffect(() => {
    socket?.emit("joinRoom", roomId);
    return () => {
      socket?.emit("leaveRoom", roomId);
    };
  }, [roomId, socket]);

  const onMessageSend = () => {
    if (!newMsg.length) return;
    sendMessage!(newMsg, chatId, scrollToBottom);
    setNewMsg('');
  };

  return (
    <Container>
      <Header>
        <SimpleProfile variant={2} id={chatId} />
        <HorizontalLine variant={2} />
      </Header>
      <Body>
        {msgPage !== null && (
          <Button
            onPress={() => fetchMessages!(chatId)}
            text="Load more"
            variant={6}
            disabled={false}
          />
        )}
        {messages.map((props, idx) => {
          if (idx === messages.length - 1) scrollToBottom();
          return (
            <Message
              key={props.id}
              id={props.id}
              msg={props.message}
              owner={props.sender === sender}
            />
          );
        })}
        {messages.length === 0 && (
          <NoConv>No conversations yet</NoConv>
        )}
        <div ref={messageEndRef} />
      </Body>
      <Footer>
        <StyledTextArea
          rows={2}
          placeholder="Message"
          value={newMsg}
          onChange={(event) => setNewMsg(event.target.value)}
        />
        <Button
          variant={2}
          text="SEND"
          onPress={onMessageSend}
          disabled={newMsg.length < 1}
        />
      </Footer>
    </Container>
  );
};

export default ChatScreen;

import React, {useEffect, useState} from 'react';
import axios from 'axios';

import {MainContainer, RightContainer} from './styles';

import NavUser from '../../components/nav-user';
import Logout from '../../components/logout';
import AssignedTo from '../../components/assigned-to';
import Leaves from '../../components/leaves';
import JoinedOn from '../../components/joined-on';
import UserActions from '../../components/user-actions';
import UserSkills from '../../components/user-skills';
import EditUserForms from "../../components/edit-user-form";

import {useUserNavContext} from '../../contexts/user-nav.context';
import {useUserContext} from '../../contexts/user.context';
import {useAPIContext} from '../../contexts/api.context';
import {useSocketContext} from '../../contexts/socket.context';

interface UserDashboardPageProps {}

const UserDashboardPage: React.FC<UserDashboardPageProps> = () => {
    const {REST_API} = useAPIContext();
    const {changeUni} = useUserNavContext();
    const {id, token, setLoading} = useUserContext();
    const {socket} = useSocketContext();
    const [joined, setJoined] = useState<boolean>(false);
    
    useEffect(() => {
      changeUni!(0);
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
      if (!id) return;
      socket?.emit("joinRoom", id);
    }, [id]);
    
    return (
      <MainContainer>
        <NavUser joined={joined} />
        <Logout />
        <RightContainer>
          {joined && <AssignedTo />}
          {joined && <Leaves id={id} />}
          {joined && <UserActions />}
          <UserSkills />
          <EditUserForms />
          {joined && <JoinedOn id={id} />}
        </RightContainer>
      </MainContainer>
    );
};

export default UserDashboardPage;

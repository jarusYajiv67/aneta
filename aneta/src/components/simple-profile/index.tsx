import React, {useEffect, useState} from 'react';
import axios from 'axios';

import defaultImg from "../../assets/me.jpg";

import {
  Container, ImageContainer, ProfileImage, Status,
  ProfileDetails, NameText, EmailText, Statuses
} from './styles';

import {useAPIContext} from '../../contexts/api.context';
import {useOrganisationContext} from '../../contexts/organisation.context';
import {useUserContext} from '../../contexts/user.context';

interface SimpleProfileProps {
  variant: number;
  showEmail?: boolean;
  id?: string;
}

const statusMapper: Array<Statuses>  = ["offline", "away", "online"];

const SimpleProfile: React.FC<SimpleProfileProps> = ({variant, showEmail, id}) => {
    const {REST_API} = useAPIContext();
    const {token: otkn, id: hrId} = useOrganisationContext();
    const {token: utkn, id: empId} = useUserContext();

    const [imageUrl, setImageUrl] = useState<string>('');
    const [status, setStatus] = useState<number>(0);
    const [name, setName] = useState<string>('-------');
    const [email, setEmail] = useState<string>('-------');
    const [role, setRole] = useState<string>('-------');

    const myId = hrId.length > 0 ? hrId : empId;
    
    useEffect(() => {
      const token = hrId.length > 0 ? otkn : utkn;
      axios.post(`${REST_API}/organisation/comm-info`, {id}, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(({data}) => {
        setImageUrl(data.image);
        setStatus(data.status);
        setName(data.name);
        setEmail(data.email);
        setRole(data.role);
      }).catch(() => {});
    }, [id]);

    return (
      <Container>
        <ImageContainer>
          <ProfileImage src={imageUrl.length ? imageUrl : defaultImg} />
          <Status variant={variant} status={statusMapper[status]} />
        </ImageContainer>
        <ProfileDetails>
          <NameText variant={variant}>
            {variant !== 2 ? name : myId === id ? "You" : name}
          </NameText>
          <div>
            <EmailText variant={variant}>
              {variant === 1 ? `${email} ` : `${role} `}
            </EmailText>
            {variant === 2 && showEmail && (
              <EmailText variant={variant}>| {email}</EmailText>
            )}
          </div>
        </ProfileDetails>
      </Container>
    );
};

export default SimpleProfile;

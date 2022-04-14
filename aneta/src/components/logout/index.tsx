import React from 'react';

import {LogoutSection, LogoutIcon, LogoutText} from './styles';

import {useOrganisationContext} from '../../contexts/organisation.context';
import {useUserContext} from '../../contexts/user.context';

interface LogoutProps {}

const Logout: React.FC<LogoutProps> = () => {
    const {organisationLogout, id: oid} = useOrganisationContext();
    const {userLogout} = useUserContext();
    
    const onClick = () => {
      if (oid.length) return organisationLogout!();
      userLogout!();
    };
    
    return (
      <LogoutSection onClick={onClick}>
        <LogoutIcon />
        <LogoutText>Logout</LogoutText>
      </LogoutSection>
    );
};

export default Logout;

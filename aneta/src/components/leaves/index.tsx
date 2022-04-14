import React, {useState, useEffect} from "react";
import axios from "axios";

import Section, {SectionCaption} from '../section';
import {useAPIContext} from '../../contexts/api.context';
import {useUserContext} from '../../contexts/user.context';
import {useOrganisationContext} from '../../contexts/organisation.context';

interface LeavesProps {
  id?: string;
  leaves?: number;
}

const Leaves: React.FC<LeavesProps> = ({id, leaves: dl}) => {
    const {REST_API} = useAPIContext();
    const {token: utkn, id: uid} = useUserContext();
    const {token: otkn} = useOrganisationContext();
    const [leaves, setLeaves] = useState<string | number>('-------');
    
    useEffect(() => {
      if (dl !== undefined) {
        setLeaves(dl);
        return;
      }
      if (!id) return;
      const token = uid.length > 0 ? utkn : otkn;
      axios.post(`${REST_API}/employee/leaves`, {id}, {
        headers: {Authorization: `Bearer ${token}`,},
      })
      .then(({data}) => setLeaves(data.leaves))
      .catch(() => {});
    }, []);

    return (
      <div>
        <Section name="Leaves taken" />
        <SectionCaption>{leaves}</SectionCaption>
      </div>
    );
};

export default Leaves;

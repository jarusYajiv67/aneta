import React, {
  useState, 
  useEffect, 
  ChangeEvent,
  useRef,
} from 'react';
import axios from 'axios';

import {
  SkillsContainer,
  SkillHolder,
  SkillName,
  CloseIcon,
  NewSkillInput,
} from "./styles";
import {StyledInput} from '../input';

import {useUserContext} from '../../contexts/user.context';
import {useAPIContext} from '../../contexts/api.context';
import Button from '../button';

interface UserSkillsManangerProps {}

const UserSkillsManager: React.FC<UserSkillsManangerProps> = () => {
    const {setLoading, id, token, orgName, email} = useUserContext();
    const {REST_API} = useAPIContext();
    const [skills, setSkills] = useState<Array<string>>([]);
    const [newSkill, setNewSkill] = useState<string>('');
    const isFetched = useRef<boolean>(false);
    
    useEffect(() => {
      if (!id.length || !token.length) return;
      if (isFetched.current) return;
      isFetched.current = true;
      setLoading!(true);
      axios.post(`${REST_API}/employee/skills`, {id}, {
        headers: {Authorization: `Bearer ${token}`,}
      })
      .then(({data}) => {
        setSkills(data.skills||[]);
        setLoading!(false);
      })
      .catch(() => setLoading!(false));
    }, [id, token]);

    const removeSkill = (rs: string) => {
      setLoading!(true);
      axios.put(
        `${REST_API}/employee/remove-skill`, 
        {email, orgName, skill: rs}, 
        {headers: {Authorization: `Bearer ${token}`}
      }).then(() => {
        setSkills(prev => prev.filter(v => v !== rs));
        setLoading!(false);
      }).catch(() => setLoading!(false));
    };

    const addSkill = () => {
      if (!newSkill.length) return;
      if (skills.map(v => v.toLowerCase()).includes(newSkill.toLowerCase())) {
        window.alert("Skill already exits");
        return;
      }
      setLoading!(true);
      axios.put(
        `${REST_API}/employee/add-skill`, 
        {email, orgName, skill: newSkill}, 
        {headers: {Authorization: `Bearer ${token}`}
      }).then(() => {
        setSkills(prev => [...prev, newSkill]);
        setNewSkill('');
        setLoading!(false);
      }).catch(() => setLoading!(false));
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
      setNewSkill(event.target.value);

    return (
      <div>
        <SkillsContainer>
          {skills.map((sn, idx) => (
            <SkillHolder key={idx}>
              <SkillName>{sn}</SkillName>
              <CloseIcon onClick={() => removeSkill(sn)} />
            </SkillHolder>
          ))}
        </SkillsContainer>
        <NewSkillInput>
          <StyledInput
            type="text"
            name="new-skill"
            value={newSkill}
            onChange={handleChange}
          />
          <Button
            variant={2}
            text="Add skill"
            disabled={newSkill.length < 1}
            onPress={addSkill}
          />
        </NewSkillInput>
      </div>
    );
};

export default UserSkillsManager;

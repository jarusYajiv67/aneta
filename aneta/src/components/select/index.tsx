import React, {ChangeEvent, Dispatch, SetStateAction} from 'react';
import styled from 'styled-components';

export const InputField = styled.div`
  display: grid;
`;

export const InputLabel = styled.label`
  font-family: "bahnschrift";
  font-size: 1.2rem;
  opacity: 0.84;
`;

export const SelectStyles = styled.select`
  border-radius: 0.3rem;
  padding: 3px;
  font-size: 1.2rem;
  height: 2.4rem;
`;

export const OptionStyles = styled.option`
  border-radius: 0.3rem;
  padding: 3px;
  font-size: 1.2rem;
  height: 1.8rem;
`;

interface SelectProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const Select: React.FC<SelectProps> = ({value, setValue}) => {
  const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) =>
    setValue(event.target.value);
  return (
    <InputField>
      <InputLabel>Role</InputLabel>
      <SelectStyles value={value} onChange={handleRoleChange}>
        <OptionStyles value="Developer">Developer</OptionStyles>
        <OptionStyles value="Tester">Tester</OptionStyles>
        <OptionStyles value="Support">Support</OptionStyles>
        <OptionStyles value="Project Manager">Project Manager</OptionStyles>
      </SelectStyles>
    </InputField>
  );
};

export default Select;
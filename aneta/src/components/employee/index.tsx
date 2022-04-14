import React from 'react';
import styled from 'styled-components';

import Section from '../section';
import Resource from '../resource';
import Button from '../button';

import {useRescourcesContext} from '../../contexts/resources.context';

export const ResourcesContainer = styled.div<{big?: boolean}>`
  padding: 1%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(14, 1fr);
  height: 32vh;
  max-height: 32vh;
  overflow-y: auto;
  gap: 0.42rem;
  ${(props) => props.big && `
    height: 84vh;
    max-height: 84vh;
  `}
`;

export const NoneContainer = styled.div`
  font-family: arial;
  font-size: 1.2rem;
  opacity: 0.7;
  a {
    text-decoration: none;
    color: #1977f3;
  }
`;

interface EmployeeProps {
  big?: boolean;
  fromHr?: Array<string>;
}

const Employee: React.FC<EmployeeProps> = ({big, fromHr}) => {
    const {employee, fetchEmployee, employeePage} = useRescourcesContext();

    return (
      <div>
        <Section name="Employee" />
        <ResourcesContainer big={big}>
          {employee?.map(({ id }, idx) => (
            <Resource key={idx} id={id} />
          ))}
          {fromHr && fromHr?.map((val, idx) => <Resource key={val} id={val} />)}
          {!fromHr && employeePage !== null && (
            <Button
              variant={4}
              text="Load more"
              disabled={false}
              onPress={fetchEmployee!}
            />
          )}
          {!fromHr && employee?.length === 0 && (
            <NoneContainer>
              <span>
                You haven't hired any candidates. They can be hired through the candidates section below
              </span>
            </NoneContainer>
          )}
        </ResourcesContainer>
      </div>
    );
};

export default Employee;

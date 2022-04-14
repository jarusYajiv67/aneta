import React from "react";
import styled from "styled-components";

import Section from "../section";
import Resource from "../resource";
import Button from "../button";

import {useRescourcesContext} from "../../contexts/resources.context";

export const ResourcesContainer = styled.div`
  padding: 1%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(14, 1fr);
  height: 32vh;
  max-height: 32vh;
  overflow-y: auto;
  gap: 0.42rem;
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

interface CandidatesProps {}

const Candidates: React.FC<CandidatesProps> = () => {
  const {candidates, fetchCandidates, candidatesPage} = useRescourcesContext();

  return (
    <div>
      <Section name="Candidates" />
      <ResourcesContainer>
        {candidates?.map(({ id }, idx) => (
          <Resource key={idx} id={id} isCandidate />
        ))}
        {candidatesPage !== null && (
          <Button
            variant={4}
            text="Load more"
            disabled={false}
            onPress={fetchCandidates!}
          />
        )}
        {candidates?.length === 0 && (
          <NoneContainer>
            <span>
              Currently there are no candidates. Candidates can apply from the below link
            </span>
            <br />
            <a href={window.location.href.split("/").slice(0, -1).join('/')+'/user'} target="_blank" rel="noreferrer">
              {window.location.href.split("/").slice(0, -1).join('/')+'/user'}
            </a>
          </NoneContainer>
        )}
      </ResourcesContainer>
    </div>
  );
};

export default Candidates;

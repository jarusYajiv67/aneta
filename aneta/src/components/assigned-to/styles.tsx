import styled from "styled-components";

export const Projects = styled.div`
  display: grid;
  padding: 0.5%;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(7, 1fr);
  height: auto;
  max-height: 7rem;
  overflow-y: auto;
  overflow-x: auto;
  gap: 0.5rem;
`;

export const Holder = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const NoneText = styled.span`
  font-family: calibri;
  font-size: 1rem;
  opacity: 0.84;
`;
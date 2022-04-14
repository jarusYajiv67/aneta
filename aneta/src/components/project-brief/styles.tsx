import styled from "styled-components";

export const Text = styled.span<{isDesc ?: boolean}>`
  font-family: arial;
  font-size: 1.4rem;
  padding: 0.5%;
  opacity: 0.84;
  ${(props) => props.isDesc && `
    font-size: 1.2rem;
    max-height: 18vh;
    max-width: 84vw;
    overflow: auto;
  `}
`;

export const DescBox = styled.textarea`
  font-family: arial;
  padding: 0.5%;
  opacity: 0.84;
  font-size: 1.2rem;
  width: 100%;
  max-height: 18vh;
  max-width: 84vw;
  overflow: auto;
  resize: none;
  margin: 1% 0%;
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5%;
  font-size: 1.4rem;
  gap: 2.1%;
  margin-bottom: 1%;
`;

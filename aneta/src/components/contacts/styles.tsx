import styled from "styled-components";

export const ContactsContainer = styled.div`
  border-left: 3px solid #1877f2;
  padding: 1%;
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  margin-top: 2.8%;
  max-height: 91vh;
  overflow-y: auto;
`;

export const Contact = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 0.42rem;
  cursor: pointer;
  border-radius: 0.26rem;
  border: 1.2px solid rgba(0, 0, 0, 0.6);
  opacity: 0.8;
  &:hover {
    box-shadow: 1px 1px 7px 1px rgba(0, 0, 0, 0.84);
    -webkit-box-shadow: 1px 1px 7px 1px rgba(0, 0, 0, 0.84);
    -moz-box-shadow: 1px 1px 7px 1px rgba(0, 0, 0, 0.84);
    opacity: 1;
  }
  ${(props) =>
    props.selected &&
    `
    box-shadow: 1px 1px 7px 1px rgba(0, 0, 0, 0.84);
    -webkit-box-shadow: 1px 1px 7px 1px rgba(0, 0, 0, 0.84);
    -moz-box-shadow: 1px 1px 7px 1px rgba(0, 0, 0, 0.84);
    opacity: 1;
  `}
`;
import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 8fr 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0.42rem;
  height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0% 1%;
  margin-right: 0.42%;
  gap: 0.42rem;
  overflow-y: auto;
`;

export const Footer = styled.div`
  display: grid;
  grid-template-columns: 11fr 1fr;
  align-items: center;
  gap: 1rem;
  margin: 0% 0.42%;
`;

export const NoConv = styled.div`
  font-size: 4.2rem;
  opacity: 0.36;
`;

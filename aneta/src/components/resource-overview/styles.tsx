import styled from "styled-components";

export const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 900;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f0f2f5;
  border-radius: 1rem;
  padding: 1%;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Body = styled.div`
  /* height: 77vh;
  width: 77vw; */
  max-width: 77vw;
  max-height: 77vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CloseIcon = styled.span`
  align-self: flex-end;
  cursor: pointer;
  font-family: arial;
  font-size: 1rem;
`;

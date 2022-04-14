import styled from "styled-components";

export const MessageContainer = styled.div<{ owner: boolean }>`
  padding: 0.3%;
  padding-bottom: 0.21%;
  display: flex;
  flex-direction: column;
  max-width: 21vw;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 0.3rem;
  gap: 0.35rem;
  background-color: #ebebeb;
  align-self: flex-start;
  ${(props) =>
    props.owner &&
    `
      background-color: #f0f2f5;
      align-self: flex-end;
    `}
`;

export const Msg = styled.span`
  font-family: arial;
  font-size: 1.2rem;
  opacity: 0.84;
  max-height: 14vh;
  overflow-y: auto;
  word-break: break-all;
`;

export const Time = styled.span`
  font-family: bahnschrift;
  opacity: 0.6;
  font-size: 0.84rem;
  align-self: flex-end;
`;
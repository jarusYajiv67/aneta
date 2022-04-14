import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1% 2%;
  border: 1px solid rgba(0, 0, 0, 0.7);
  border-radius: 0.35rem;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    box-shadow: 1px 1px 7px 1px rgba(0, 0, 0, 0.84);
    -webkit-box-shadow: 1px 1px 7px 1px rgba(0, 0, 0, 0.84);
    -moz-box-shadow: 1px 1px 7px 1px rgba(0, 0, 0, 0.84);
    transform: scale(1.042);
    border: 1px solid #1877f2;
    span {
      color: #1877f2;
    }
  }
`;

export const Title = styled.span`
  font-family: bahnschrift;
  font-size: 1.4rem;
  opacity: 0.7;
`;

export const Description = styled.div`
  margin-top: 1%;
  font-family: arial;
  font-size: 1rem;
  overflow: auto;
  max-height: 8.4vh;
  opacity: 0.91;
`;

export const Date = styled.div`
  align-self: flex-end;
  font-size: 1rem;
  opacity: 0.84;
`;

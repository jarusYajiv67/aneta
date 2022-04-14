import React from "react";
import styled from "styled-components";

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #1977f3;
`;

export const ErrorText = styled.span`
  background-color: #f1f2f6;
  padding: 1rem;
  color: #1977f3;
  font-family: bahnschrift;
  font-size: 7rem;
  border-radius: 1rem;
`;

interface ErrorPageProps {}

const ErrorPage: React.FC<ErrorPageProps> = () => {
  return (
    <ErrorContainer>
      <ErrorText>404 - Page not found</ErrorText>
    </ErrorContainer>
  );
};

export default ErrorPage;

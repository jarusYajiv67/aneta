import styled from "styled-components";

export const HomePageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #1877f2;
`;

export const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  border-radius: 1rem;
  background-color: #f0f2f5;
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3.6rem 1.8rem;
  border-right: 1px solid rgba(0, 0, 0, 0.8);
`;

export const FirstText = styled.span`
  font-family: roboto;
  color: #1877f2;
  font-weight: bold;
  font-size: 6rem;
`;

export const SecondText = styled.span`
  font-family: roboto;
  color: #1877f2;
  font-weight: bold;
  font-size: 3rem;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const RightEnd = styled.div`
  background-color: #42b72a;
  display: flex;
  justify-content: center;
  color: #f1f2f6;
  padding: 0.1rem;
  font-family: calibri;
  font-size: 1.4rem;
  cursor: pointer;
`;

export const CaptionText = styled.span`
  font-family: bahnschrift;
  font-size: 2.1rem;
  opacity: 0.7;
`;

export const Slogan = styled.span`
  font-family: roboto;
  font-size: 1.4rem;
  text-align: center;
`;

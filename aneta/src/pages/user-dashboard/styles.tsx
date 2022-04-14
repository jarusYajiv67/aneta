import styled from "styled-components";

export const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 10fr;
`;

export const RightContainer = styled.div`
  padding: 3% 4.2% 2% 3.6%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
  max-height: 90vh;
`;
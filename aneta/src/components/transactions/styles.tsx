import styled from "styled-components";

export const ColumnNames = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  font-family: calibri;
  font-size: 1.6rem;
  color: #1877f2;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;

export const Wrapper = styled.div`
  padding-top: 0.5%;
`;

export const Rows = styled.div`
  max-height: 80vh;
  overflow-y: auto;
`;

export const MoreSection = styled.span`
  cursor: pointer;
  align-self: center;
`;

import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-self: center;
  flex-direction: column;
  width: 50%;
  gap: 0.5rem;
`;

export const ImageArea = styled.div`
  display: flex;
  align-items: center;
  gap: 2.1%;
`;

export const ProfileImage = styled.img.attrs({ alt: "" })`
  width: 7rem;
  height: auto;
`;
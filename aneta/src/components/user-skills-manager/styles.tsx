import styled from "styled-components";
import removeIcon from "../../assets/icons/remove.png";

export const SkillsContainer = styled.div`
  display: grid;
  padding: 0.5%;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(7, 1fr);
  height: auto;
  max-height: 7rem;
  overflow-y: auto;
`;

export const SkillHolder = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.6rem;
`;

export const SkillName = styled.span`
  font-family: bahnschrift;
  opacity: 0.84;
  font-size: 1rem;
`;

export const CloseIcon = styled.img.attrs({
  alt: "",
  src: removeIcon,
})`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
`;

export const NewSkillInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.7rem;
`;
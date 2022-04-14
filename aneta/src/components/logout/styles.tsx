import styled from "styled-components";
import logoutIcon from "../../assets/icons/logout.png";

export const LogoutSection = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.42rem;
  right: 1%;
  top: 2%;
  cursor: pointer;
`;

export const LogoutIcon = styled.img.attrs({
  alt: "",
  src: logoutIcon,
})`
  width: 1.6rem;
  height: 1.6rem;
`;

export const LogoutText = styled.span`
  font-family: bahnschrift;
  font-size: 1.2rem;
  opacity: 0.7;
`;
import styled from "styled-components";

export const NavContainer = styled.div`
  position: absolute;
  top: 1%;
  right: 1%;
  display: flex;
  flex-direction: row;
  font-family: roboto;
  font-size: 1.2rem;
  gap: 1rem;
  color: #f0f2f5;
  span {
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

export const BlockContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 900;
`;

export const Wrapper = styled.div<{isPricing ?: boolean}>`
  display: flex;
  flex-direction: column;
  background-color: #f0f2f5;
  border-radius: 1rem;
  padding: 1%;
  /* width: 42vw; */
  /* height: 77vh; */
  max-width: 42vw;
  max-height: 77vh;
  gap: 1.4%;
  ${(props) => props.isPricing && `
    align-items: center;
    gap: 1rem;
    padding: 1%;
    max-width: none;
    max-height: none;
  `}
`;

export const Content = styled.div`
  height: 35vh;
  max-height: 35vh;
  overflow: auto;
`;

export const HugeText = styled.span`
  font-family: roboto;
  font-size: 1.2rem;
  opacity: 0.7;
`;

export const CloseIcon = styled.span`
  position: absolute;
  align-self: flex-end;
  cursor: pointer;
  font-family: arial;
  font-size: 1rem;
`;

export const Title = styled.span`
  font-family: arial;
  font-size: 2.1rem;
  opacity: 0.84;
`;

export const PlansContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.4rem;
`;

export const Plan = styled.div`
  border: 1px solid #1877f2;
  border-radius: 0.35rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 7%;
  cursor: pointer;
  &:hover {
    transform: scale(1.042);
    box-shadow: 1px 1px 7px 1px rgba(0, 0, 0, 0.84);
    -webkit-box-shadow: 1px 1px 7px 1px rgba(0, 0, 0, 0.84);
    -moz-box-shadow: 1px 1px 7px 1px rgba(0, 0, 0, 0.84);
  }
`;

export const Features = styled.div`
  margin: 2% 0;
  display: flex;
  flex-direction: column;
  font-family: bahnschrift;
  font-size: 1.4rem;
  opacity: 0.7;
`;

export const NameCost = styled.span`
  font-family: calibri;
  text-align: center;
  font-size: 1.8rem;
  opacity: 0.84;
`;
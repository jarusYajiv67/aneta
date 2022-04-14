import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.7rem;
  margin-top: 0.2rem;
  padding-left: 3.5px;
  align-items: center;
`;

export const ImageContainer = styled.div`
  display: flex;
  position: relative;
`;

export const ProfileImage = styled.img.attrs({
  alt: "",
})`
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
`;

export type Statuses = "online" | "away" | "offline";

export const Status = styled.div<{ status: Statuses; variant: number }>`
  width: 0.84rem;
  height: 0.84rem;
  border: 0.187rem solid #1877f2;
  ${(props) => props.variant === 2 && `border: 0.187rem solid #f0f2f5;`}
  position: absolute;
  border-radius: 50%;
  z-index: 888;
  align-self: flex-end;
  ${(props) => {
    switch (props.status) {
      case "away":
        return "background-color: #d1d15b;";
      case "offline":
        return "background-color: #c74040;";
      default:
        return "background-color: #42b72a;";
    }
  }};
`;

export const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  color: #f0f2f5;
`;

export const NameText = styled.span<{variant?: number}>`
  font-family: calibri;
  font-size: 1.4rem;
  opacity: 0.9;
  ${(props) => props.variant === 2 && `color: rgba(0, 0, 0, 0.7);`}
`;

export const EmailText = styled.span<{ variant?: number }>`
  font-family: bahnschrift;
  font-size: 0.84rem;
  opacity: 0.84;
  ${(props) => props.variant === 2 && `color: rgba(0, 0, 0, 0.7);`}
`;
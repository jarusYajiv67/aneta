import styled from "styled-components";


export const Container = styled.div<{ variant?: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.35rem;
  padding: 0.35% 2%;
  ${(props) => {
    switch (props.variant) {
      case 1:
        return `border: 2px solid #f9fa62;`;
      case 2:
        return `border: 2px solid #cff4d3;`;
      case 3:
        return `border: 2px solid #6061fb;`;
      case 4:
        return `border: 2px solid #f96162;`;
      default:
        return `border: 1px solid rgba(0, 0, 0, 0.7);`;
    }
  }}
  &:hover {
    box-shadow: 1px 1px 7px 1px rgba(0, 0, 0, 0.84);
    -webkit-box-shadow: 1px 1px 7px 1px rgba(0, 0, 0, 0.84);
    -moz-box-shadow: 1px 1px 7px 1px rgba(0, 0, 0, 0.84);
    transform: scale(1.042);
    /* background-color: #1877f2; */
    color: #1877f2;
    /* border: 1px dashed rgba(0, 0, 0, 0.7); */
  }
  cursor: pointer;
  max-height: 8.4vh;
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
`;

export const Circle = styled.span<{ hidden: boolean }>`
  background-color: #f26d7d;
  padding: 0% 1.8%;
  border-radius: 50%;
  color: white;
  ${(props) => props.hidden && `opacity: 0.0;`}
`;
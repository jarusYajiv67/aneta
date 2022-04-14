import React from 'react';
import styled from 'styled-components';

import dashboardIcon from "../../assets/icons/dashboard.png";
import projectsIcon from "../../assets/icons/projects.png";
import resourcesIcon from "../../assets/icons/resources.png";
import financialIcon from "../../assets/icons/financial.png";
import chatIcon from "../../assets/icons/chat.png";
import settingsIcon from "../../assets/icons/settings.png";

const OptionContainer = styled.div<{ curr?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  cursor: pointer;
  border-radius: 0.35rem;
  padding-left: 3%;
  ${(props) =>
    props.curr &&
    `
    box-shadow: 0px 0px 3px 1px rgba(240,242,245,0.84);
-webkit-box-shadow: 0px 0px 3px 1px rgba(240,242,245,0.84);
-moz-box-shadow: 0px 0px 3px 1px rgba(240,242,245,0.84);
  `}
  &:hover {
    box-shadow: 0px 0px 3px 1px rgba(240, 242, 245, 0.84);
    -webkit-box-shadow: 0px 0px 3px 1px rgba(240, 242, 245, 0.84);
    -moz-box-shadow: 0px 0px 3px 1px rgba(240, 242, 245, 0.84);
  }
`;

const OptionImage = styled.img<{ curr?: boolean }>`
  width: 2rem;
  height: 2rem;
  filter: invert(100%);
  ${(props) =>
    props?.curr && `filter: invert(100%) drop-shadow(7px 7px 7px black);`}
`;

const OptionText = styled.p<{ curr?: boolean }>`
  color: #f0f2f5;
  font-size: 1.2rem;
  ${(props) => props.curr && `text-shadow: 14px 14px 42px #000000;`}
`;

interface Variant {
  src: string,
  text: string
}

const variants: Array<Variant> = [
  {
    src: dashboardIcon,
    text: "Dashboard"
  },
  {
    src: chatIcon,
    text: "Chat"
  }
];

export const variantsHr: Array<Variant> = [
  {
    src: dashboardIcon,
    text: "Dashboard"
  },
  {
    src: chatIcon,
    text: "Chat"
  },
  {
    src: settingsIcon,
    text: "Settings"
  },
  {
    src: projectsIcon,
    text: "Projects"
  },
  {
    src: resourcesIcon,
    text: "Resources"
  },
  {
    src: financialIcon,
    text: "Financial"
  },
];

interface OptionProps {
  variant: number;
  active: boolean;
  fromHr?: boolean;
}

const Option: React.FC<OptionProps> = ({variant, active, fromHr}) => {
    const {src, text} = fromHr ? variantsHr[variant] : variants[variant];
    return (
      <OptionContainer curr={active}>
        <OptionImage src={src} curr={active} />
        <OptionText curr={active} >{text}</OptionText>
      </OptionContainer>
    );
};

export default Option;

import React, { PureComponent } from "react";
import { string, oneOf, func, number } from "prop-types";
import styled from "styled-components";

const Color = {
  primary: { background: "#179FF3", border: "#179FF3", font: "white" },
  secondary: { background: "gray", border: "gray", font: "white" },
  success: { background: "green", border: "green", font: "white" },
  warning: { background: "orange", border: "orange", font: "white" },
  danger: { background: "#ff4e4e", border: "#ff4e4e", font: "white" },
  transparent: { background: "transparent", border: "black", font: "black" }
};

const Size = {
  large: { padding: 22, font: 18 },
  medium: { padding: 18, font: 14 },
  small: { padding: 10, font: 10 }
};

export default class Button extends PureComponent {
  static propTypes = {
    text: string,
    borderRadius: number,
    size: oneOf(["large", "medium", "small"]),
    color: oneOf([
      "primary",
      "secondary",
      "success",
      "warning",
      "danger",
      "transparent"
    ]),
    onClick: func
  };

  static defaultProps = {
    size: "medium",
    color: "primary",
    borderRadius: 8
  };

  render() {
    const { text, ...props } = this.props;

    return <Wrapper {...props}>{text}</Wrapper>;
  }
}

const Wrapper = styled.button`
  ${props => `
    font-size: ${Size[props.size].font}px;
    padding: 4px ${Size[props.size].padding}px;
    color: ${Color[props.color].font};
    background-color: ${Color[props.color].background};
    border: 1px solid ${Color[props.color].border};
    border-radius: ${props.borderRadius}px;
  `};

  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  user-select: none;
  margin: 4px;
  box-shadow: 0px 3px 2px 0px rgba(0, 0, 0, 0.1);
  transition: 0.3s;

  :focus {
    outline: none;
  }
  :hover {
    background: #ffffff;
    ${props => `
      color: ${Color[props.color].border};
      border: 1px solid ${Color[props.color].border};
    `};
  }
`;

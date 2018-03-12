import React, { Component } from "react";
import styled, { css } from "styled-components";
import PropsTypes from "prop-types";

export const Color = {
  primary: { background: "blue", border: "blue", font: "white" },
  secondary: { background: "gray", border: "gray", font: "white" },
  success: { background: "green", border: "green", font: "white" },
  warning: { background: "orange", border: "orange", font: "white" },
  danger: { background: "red", border: "red", font: "white" },
  transparent: { background: "transparent", border: "black", font: "black" }
};

export const Size = {
  large: { height: 34, padding: 16, font: 1 },
  medium: { height: 24, padding: 8, font: 0.9 },
  small: { height: 20, padding: 6, font: 0.8 }
};

export default class Button extends Component {
  static propsTypes = {
    text: PropsTypes.string,
    width: PropsTypes.number,
    size: PropsTypes.oneOf(["large", "medium", "small"]),
    color: PropsTypes.oneOf([
      "primary",
      "secondary",
      "success",
      "warning",
      "danger",
      "transparent"
    ]),
    onClick: PropsTypes.func
  };

  static defaultProps = {
    size: "large",
    color: "primary"
  };

  render() {
    const { text, ...props } = this.props;
    return <Wrapper {...props}>{text}</Wrapper>;
  }
}

const Wrapper = styled.button`
  flex: none;
  display: inline-flex;
  vertical-align: top;
  align-item: center;
  justify-content: center;
  border: none;
  transition: 0.3s;
  cursor: pointer;
  border-radius: 4px;
  white-space: nowrap;
  user-select: none;
  margin: 2px;
  &:focus {
    outline: none;
  }
  &:hover {
    opacity: 0.7;
    background: transparent;
    ${props => css`
      color: ${Color[props.color].border};
    `};
  }
  ${props =>
    props.width &&
    css`
      width: ${props.width}px;
    `};

  ${props => css`
    height: ${Size[props.size].height}px;
    font-size: ${Size[props.size].font}rem;
    padding: 0 ${Size[props.size].padding}px;
    color: ${Color[props.color].font};
    background-color: ${Color[props.color].background};
    border: 1px solid ${Color[props.color].border};
  `};
`;

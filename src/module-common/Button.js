import React, { Component } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

export const Color = {
  primary: { background: "#179FF3", border: "#179FF3", font: "white" },
  secondary: { background: "gray", border: "gray", font: "white" },
  success: { background: "green", border: "green", font: "white" },
  warning: { background: "orange", border: "orange", font: "white" },
  danger: { background: "red", border: "red", font: "white" },
  transparent: { background: "transparent", border: "black", font: "black" }
};

export const Size = {
  large: { padding: 22, font: 18 },
  medium: { padding: 18, font: 14 },
  small: { padding: 10, font: 10 }
};

export default class Button extends Component {
  static propTypes = {
    text: PropTypes.string,
    width: PropTypes.number,
    size: PropTypes.oneOf(["large", "medium", "small"]),
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "success",
      "warning",
      "danger",
      "transparent"
    ]),
    onClick: PropTypes.func
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
  border-radius: 22px;
  white-space: nowrap;
  user-select: none;
  margin: 4px;
  &:focus {
    outline: none;
  }
  &:hover {
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
    font-size: ${Size[props.size].font}px;
    padding: 4px ${Size[props.size].padding}px;
    color: ${Color[props.color].font};
    background-color: ${Color[props.color].background};
    border: 1px solid ${Color[props.color].border};
  `};
`;

import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export default class TextArea extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    width: PropTypes.number,
    fontSize: PropTypes.number,
    borderRadius: PropTypes.number,
    value: PropTypes.string,
    onChange: PropTypes.func
  };

  static defaultProps = {
    width: 500,
    fontSize: 12,
    borderRadius: 8
  };

  render() {
    const { placeholder, width, fontSize, borderRadius, value } = this.props;
    return (
      <TextareaRow
        placeholder={placeholder}
        value={value}
        width={width}
        rows={5}
        fontSize={fontSize}
        borderRadius={borderRadius}
        onChange={this.onChange}
        autoFocus
      />
    );
  }
  onChange = event => {
    const onChange = this.props.onChange;
    if (onChange) onChange(event.target.value);
  };
}

const TextareaRow = styled.textarea`
  font-family: "Noto Sans", sans-serif;
  padding: 20px;
  resize: none;
  ${props => props.borderRadius && `border-radius: ${props.borderRadius}px`};
  ${props => props.width && `width: ${props.width}px`};
  ${props => props.fontSize && `font-size: ${props.fontSize}px`};
  line-height: 20px;
  box-shadow: 10px 10px 53px 11px rgba(206, 205, 205, 0.5);
  background: #ffffff;
  border: none;
  &:focus {
    outline: none;
  }
`;

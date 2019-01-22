import React, { PureComponent } from "react";
import { string, number, func } from "prop-types";
import styled from "styled-components";

export default class TextArea extends PureComponent {
  static propTypes = {
    value: string,
    placeholder: string,
    width: number,
    fontSize: number,
    borderRadius: number,
    rows: number,
    onChange: func,
    onShiftEnter: func
  };

  static defaultProps = {
    width: 500,
    fontSize: 12,
    borderRadius: 8,
    rows: 5
  };

  onChange = e => {
    const { onChange } = this.props;

    if (onChange) onChange(e.target.value);
  };

  onKeyDown = e => {
    const { onShiftEnter } = this.props;

    if (e.metaKey && e.keyCode === 13) {
      onShiftEnter();
    }
  };

  render() {
    const { onChange, onKeyDown, ...props } = this.props;

    return (
      <Wrapper {...props} onChange={this.onChange} onKeyDown={this.onKeyDown} />
    );
  }
}

const Wrapper = styled.textarea`
  ${props => `
    width: ${props.width}px;
    font-size: ${props.fontSize}px;
    border-radius: ${props.borderRadius}px;
  `}

  font-family: inherit;
  resize: none;
  padding: 20px;
  line-height: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #f7f7f7;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);
  transition: 0.3s;

  :focus {
    outline: none;
    background: #ffffff;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
    transform: translate(0, -6px);
  }
`;

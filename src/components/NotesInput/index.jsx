import React, { Component } from "react";
import { func, bool, string } from "prop-types";
import styled from "styled-components";

// Components
import TextArea from "../TextArea";
import Button from "../Button";

export default class NotesInput extends Component {
  static propTypes = {
    onSet: func,
    isEdit: bool,
    dataEdit: string
  };

  state = {
    value: ""
  };

  componentWillReceiveProps(nextProps) {
    const { dataEdit } = nextProps;

    this.setState({
      value: dataEdit
    });
  }

  onChangeInput = text => {
    this.setState({
      value: text
    });
  };

  onAddInput = () => {
    const { value } = this.state;
    const { onSet } = this.props;

    onSet(value);

    this.setState({
      value: ""
    });
  };

  render() {
    const { value } = this.state;
    const { isEdit } = this.props;

    return (
      <Wrapper data-aos="fade-up">
        <TextArea
          placeholder={"What's on your mind ?"}
          value={value}
          onShiftEnter={this.onAddInput}
          onChange={this.onChangeInput}
        />
        <ButtonAdd
          text={isEdit ? "UPDATE" : "SAVE"}
          size="small"
          color="primary"
          onClick={this.onAddInput}
        />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  position: relative;
`;

const ButtonAdd = styled(Button)`
  position: absolute;
  bottom: 4px;
  right: 1px;
`;

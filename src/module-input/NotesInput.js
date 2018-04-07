import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import TextArea from "../module-common/TextArea";
import Button from "../module-common/Button";
import moment from "moment";

export default class NotesInput extends Component {
  static propTypes = {
    name: PropTypes.string,
    data: PropTypes.array
  };
  state = {
    value: "",
    newNotes: []
  };
  render() {
    const { name } = this.props;
    return (
      <Wrapper>
        <NoteInputBox>
          <TextArea
            placeholder={`What's on your mind, ${name} ?`}
            value={this.state.value}
            onChange={text => {
              this.setState({
                value: text
              });
            }}
          />
          <ButtonAdd
            text="SAVE"
            size="small"
            color="primary"
            onClick={() => this.handleAddNote()}
          />
        </NoteInputBox>
      </Wrapper>
    );
  }

  handleAddNote() {
    const { newNotes, value } = this.state;
    const newItem = {
      dateCreated: moment().unix(),
      isShown: true,
      content: value
    };
    newNotes.push(newItem);
    this.props.callbackInput(newNotes);
    this.setState({
      value: "",
      newNotes: []
    });
  }
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  z-index: 2;
`;

const NoteInputBox = styled.div`
  margin-top: 20px;
  position: relative;
  width: 500px;
  margin-bottom: 10px;
  position: fixed;
`;

const ButtonAdd = styled(Button)`
  position: absolute;
  bottom: 6px;
  right: 1px;
`;

import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import TextArea from "../module-common/TextArea";
import Button from "../module-common/Button";
import moment from "moment";

export default class NotesInput extends Component {
  static propTypes = {
    onEdit: PropTypes.bool,
    dataEdit: PropTypes.string
  };
  state = {
    value: "",
    newNotes: []
  };

  componentWillReceiveProps(nextProps) {
    const { dataEdit } = nextProps;
    this.setState({
      value: dataEdit
    });
  }

  render() {
    const { value } = this.state;
    const { onEdit } = this.props;

    return (
      <Wrapper>
        <NoteInputBox data-aos="fade-up">
          <TextArea
            placeholder={"What's on your mind ?"}
            value={value}
            onClick={() => this.handleAddNote()}
            onChange={text => this.onChangeInput(text)}
          />
          <ButtonAdd
            text={onEdit ? "UPDATE" : "SAVE"}
            size="small"
            color="primary"
            onClick={() => this.handleAddNote()}
          />
        </NoteInputBox>
      </Wrapper>
    );
  }

  onChangeInput = text => {
    this.setState({
      value: text
    });
  };

  handleAddNote = () => {
    const { newNotes, value } = this.state;
    const newItem = {
      id: moment().unix(),
      dateCreated: moment().format("DD/MM/YYYY"),
      isShown: true,
      content: value
    };
    newNotes.push(newItem);
    this.props.callbackInput(newNotes);
    this.setState({
      value: "",
      newNotes: []
    });
  };
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  z-index: 2;
`;

const NoteInputBox = styled.div`
  margin-top: 10px;
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

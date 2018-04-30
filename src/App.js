import React, { Component } from "react";
import styled from "styled-components";
import moment from "moment";
import NotesInput from "./module-input/NotesInput";
import NotesCard from "./module-collection/NotesCard";
import { arrayMove } from "react-sortable-hoc";

export default class App extends Component {
  state = {
    key: "modernlifeiswar",
    name: "john doe",
    notes: [
      {
        id: 1,
        dateCreated: "13/04/2018",
        content:
          "Hello, welcome to xNotes. To add note just hit the 'save' button or click 'enter' at keyboard, to add newline when write note hit 'shift + enter'. To move card, pointer your mouse to the 'move' icon and then drag your cursor. To edit card just click the 'edit' icon. To delete card just hit the 'x' button. Hope you enjoy using xNotes.",
        isShown: true
      }
    ],
    dataEdit: "",
    onEdit: false
  };

  componentDidMount() {
    const { key } = this.state;
    this.getStore(key);
  }

  render() {
    const { name, notes, onEdit, dataEdit } = this.state;
    const currentDate = moment();
    // console.log("STATE DATA", notes);

    return (
      <Wrapper>
        <Welcome>
          {`Good ${this.getGreetings(currentDate)}, its ${currentDate.format(
            "dddd, D MMMM"
          )}. Stay awesome!`}
        </Welcome>
        <NotesInput
          name={name}
          callbackInput={input => this.onAddNew(input)}
          onEdit={onEdit}
          dataEdit={dataEdit}
        />
        {notes.length !== 0 ? (
          <PrevNotes>What's on your thoughts</PrevNotes>
        ) : (
          <PrevNotes>Write something in your mind</PrevNotes>
        )}
        <NotesCard
          data={notes}
          onSortEnd={this.onSortEnd}
          onDeleteCard={this.onDeleteCard}
          onEditCard={this.onEditCard}
        />
        <Title>
          Another thing from <a href="https://ahmadzakiy.com/">Zakiy</a>.
        </Title>
      </Wrapper>
    );
  }

  getStore = keyStore => {
    /* eslint-disable no-undef */
    // chrome.storage.sync.get(keyStore, result => {
    //   if (!chrome.runtime.error) {
    //     let data = JSON.parse(result[keyStore]);
    //     //console.log("GET DATA", data);
    //     this.setState({
    //       notes: data
    //     });
    //   }
    // });
  };

  updateStore = (keyStore, data) => {
    let obj = {};
    obj[keyStore] = JSON.stringify(data);
    /* eslint-disable no-undef */
    // chrome.storage.sync.set(obj, () => {
    //   //console.log("UPDATE DATA", obj);
    //   if (chrome.runtime.error) {
    //     console.log("Runtime error.");
    //   }
    // });
  };

  onAddNew = async input => {
    const { key } = this.state;
    if (!input.length) {
      return;
    }

    await this.setState(prevState => ({
      notes: input.concat(prevState.notes),
      input: "",
      onEdit: false,
      dataEdit: ""
    }));
    this.updateStore(key, this.state.notes);
  };

  onEditCard = card => {
    this.setState({
      onEdit: true,
      dataEdit: card
    });
    this.onDeleteCard(card);
  };

  onDeleteCard = card => {
    const { key, notes } = this.state;
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].content === card) {
        delete notes[i];
      }
    }
    const cleanNotes = notes.filter(function(x) {
      return x !== (undefined || null || "");
    });
    this.setState({
      notes: cleanNotes
    });
    this.updateStore(key, cleanNotes);
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { key } = this.state;
    this.setState({
      notes: arrayMove(this.state.notes, oldIndex, newIndex)
    });
    this.updateStore(key, this.state.notes);
  };

  getGreetings = m => {
    let g = null;
    if (!m || !m.isValid()) {
      return;
    }

    const split_afternoon = 12;
    const split_evening = 17;
    const currentHour = parseFloat(m.format("HH"));

    if (currentHour >= split_afternoon && currentHour <= split_evening) {
      g = "afternoon";
    } else if (currentHour >= split_evening) {
      g = "evening";
    } else {
      g = "morning";
    }

    return g;
  };
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 10px;
  font-size: 10px;
  font-weight: 400;
`;

const Welcome = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 20px;
  margin-top: 10px;
  color: #bebebe;
  font-size: 16px;
`;

const PrevNotes = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 20px;
  margin-top: 180px;
  margin-left: -250px;
  color: #bebebe;
  font-size: 14px;
`;

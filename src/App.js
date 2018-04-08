import React, { Component } from "react";
import styled from "styled-components";
import moment from "moment";
import NotesInput from "./module-input/NotesInput";
import NotesCard from "./module-collection/NotesCard";
import { arrayMove } from "react-sortable-hoc";

export default class App extends Component {
  state = {
    key: "modernlifeiswar",
    name: "Zakiy",
    notes: []
  };

  componentDidMount() {
    const { key } = this.state;
    this.getStore(key);
  }

  render() {
    const { name, notes } = this.state;
    const currentDate = moment();
    console.log("STATE DATA", notes);

    return (
      <Wrapper>
        <Welcome>
          {`Good ${this.getGreetings(
            currentDate
          )} ${name}, its ${currentDate.format(
            "dddd, MMMM DD"
          )}. Stay awesome!`}
        </Welcome>
        <NotesInput name={name} callbackInput={input => this.onAddNew(input)} />
        <PrevNotes>What's on your thoughts yesterday</PrevNotes>
        <NotesCard
          data={notes}
          onSortEnd={this.onSortEnd}
          onDeleteCard={this.onDeleteCard}
        />
        <Title>
          Another thing from <a href="https://github.com/ahmadzakiy/">Zakiy</a>.
        </Title>
      </Wrapper>
    );
  }

  getStore = keyStore => {
    /* eslint-disable no-undef */
    // chrome.storage.sync.get(keyStore, result => {
    //   if (!chrome.runtime.error) {
    //     let data = JSON.parse(result[keyStore]);
    //     console.log("GET DATA", data);
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
    //   console.log("UPDATE DATA", obj);
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
      input: ""
    }));
    this.updateStore(key, this.state.notes);
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
  font-size: 12px;
  font-weight: 400;
`;

const Welcome = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 20px;
  margin-top: 10px;
  color: #bebebe;
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

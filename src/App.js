import React, { Component } from "react";
import styled from "styled-components";
import "./App.css";
import moment from "moment";
import NotesInput from "./module-input/NotesInput";
import NotesCard from "./module-collection/NotesCard";
import { arrayMove } from "react-sortable-hoc";

export default class App extends Component {
  state = {
    name: "Zakiy",
    notes: [],
    newArray: []
  };

  render() {
    const { name, notes } = this.state;
    const currentDate = moment();

    console.log("DATA NOTES", notes);
    return (
      <Wrapper>
        <Title>xNotes</Title>
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
      </Wrapper>
    );
  }

  onAddNew = input => {
    if (!input.length) {
      return;
    }
    this.setState(prevState => ({
      notes: input.concat(prevState.notes),
      input: ""
    }));
  };

  onDeleteCard = card => {
    console.log("CARD", card);
    const { notes } = this.state;
    console.log(notes[0]);
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].content == card) {
        delete notes[i];
      }
    }
    const cleanNotes = notes.filter(function(x) {
      return x !== (undefined || null || "");
    });
    this.setState({
      notes: cleanNotes
    });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      notes: arrayMove(this.state.notes, oldIndex, newIndex)
    });
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
  right: 0px;
  bottom: 0px;
  padding: 10px;
  background: linear-gradient(200deg, #3602b8, #00dcff);
  color: white;
  font-size: 18px;
  font-weight: 600;
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

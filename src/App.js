import React, { Component } from "react";
import styled from "styled-components";
import moment from "moment";
import NotesInput from "./module-input/NotesInput";
import NotesCard from "./module-collection/NotesCard";
import { arrayMove } from "react-sortable-hoc";
import AOS from "aos";
import "aos/dist/aos.css";

export default class App extends Component {
  state = {
    key: "modernlifeiswar",
    name: "amorfati",
    notes: [
      {
        id: 1,
        dateCreated: "13/04/2018",
        content:
          "Hi, \r\n\r\n Thank you for using xNotes, here are some useful tips for you: \r\n - To add a note, just hit the 'save' button or click 'enter' on your keyboard \r\n - To add a new line, hold 'shift' then press 'enter' \r\n - To move your card, point your mouse to the 'move' text and then drag the card \r\n - To edit your card, click the 'edit' text \r\n - To delete your card, click the 'x' button \r\n\r\n Now you're ready to write your first note. Enjoy!",
        isShown: true
      }
    ],
    dataEdit: "",
    onEdit: false,
    onAnimate: true,
    animateEffect: "fade-down"
  };

  componentDidMount() {
    const { key } = this.state;
    this.getStore(key);
    AOS.init({
      offset: 0,
      duration: 400,
      easing: "ease-out-quart",
      delay: 100,
      once: true
    });
    console.log("just love the world that won't love you back~");
  }

  render() {
    const {
      name,
      notes,
      onEdit,
      dataEdit,
      onAnimate,
      animateEffect
    } = this.state;
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
          onAnimate={onAnimate}
          animateEffect={animateEffect}
        />
        <Title>
          Another thing from <a href="https://ahmadzakiy.com/">Zakiy</a>
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
      dataEdit: "",
      onAnimate: true,
      animateEffect: "fade-right"
    }));
    this.updateStore(key, this.state.notes);
  };

  onEditCard = (cardId, cardContent) => {
    this.setState({
      onEdit: true,
      dataEdit: cardContent,
      onAnimate: false
    });
    this.onDeleteCard(cardId);
  };

  onDeleteCard = cardId => {
    const { key, notes } = this.state;
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === cardId) {
        delete notes[i];
      }
    }
    const cleanNotes = notes.filter(function(x) {
      return x !== (undefined || null || "");
    });
    this.setState({
      notes: cleanNotes,
      onAnimate: true,
      animateEffect: "zoom-out-left"
    });
    this.updateStore(key, cleanNotes);
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { key } = this.state;
    this.setState({
      onAnimate: false,
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

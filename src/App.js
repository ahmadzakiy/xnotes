import React, { Component } from "react";
import styled from "styled-components";
import moment from "moment";
import { arrayMove } from "react-sortable-hoc";
import AOS from "aos";
import "aos/dist/aos.css";

// Components
import NotesInput from "./components/NotesInput";
import NotesCard from "./components/NotesCard";

const STORAGE_KEY = "modernlifeiswar";
const WELCOME_NOTE = `Hi, 

Thank you for using xNotes, here are some useful tips for you: 
- To add a note, just hit the 'save' button or hold 'shift' then press 'enter' 
- To add a new line, just press 'enter' 
- To move your card, point your mouse to the 'move' text and then drag the card 
- To edit your card, click the 'edit' text 
- To delete your card, click the 'x' button 
                  
Now you're ready to write your first note. Enjoy!`;

export default class App extends Component {
  state = {
    notes: [
      {
        id: 1,
        dateCreated: "13/04/2018",
        content: WELCOME_NOTE,
        isShown: true
      }
    ],
    dataEdit: "",
    isEdit: false,
    isAnimate: false
  };

  componentDidMount() {
    this.getStore(STORAGE_KEY);
    AOS.init({
      offset: 0,
      duration: 400,
      easing: "ease-out-quart",
      delay: 100,
      once: false
    });

    console.log("just love the world that won't love you back~");
  }

  getGreetings = m => {
    let g = undefined;
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

  getStore = keyStore => {
    // chrome.storage.sync.get(keyStore, result => {
    //   if (!chrome.runtime.error) {
    //     let data = JSON.parse(result[keyStore]);
    //     this.setState({
    //       notes: data
    //     });
    //   }
    // });
  };

  updateStore = (keyStore, data) => {
    // let obj = {};
    // obj[keyStore] = JSON.stringify(data);
    // chrome.storage.sync.set(obj, () => {
    //   if (chrome.runtime.error) {
    //     console.log("Runtime error.");
    //   }
    // });
  };

  onAddNew = newNotes => {
    const { notes } = this.state;
    const newId = Math.max.apply(null, notes.map(t => t.id)) + 1;

    this.setState({
      notes: [
        {
          id: newId,
          dateCreated: moment().format("DD/MM/YYYY"),
          content: newNotes,
          isShown: true
        },
        ...notes
      ],
      dataEdit: "",
      isEdit: false,
      isAnimate: true
    });
    this.updateStore(STORAGE_KEY, notes);
  };

  onEditCard = (cardId, cardContent) => {
    this.setState({
      isEdit: true,
      dataEdit: cardContent
    });
    this.onDeleteCard(cardId);
  };

  onDeleteCard = cardId => {
    const { notes } = this.state;

    this.setState({
      notes: notes.filter(c => c.id !== cardId)
    });

    this.updateStore(STORAGE_KEY, notes);
  };

  onCompleteCard = cardId => {
    const { notes } = this.state;

    this.setState({
      isAnimate: false
    });

    notes.forEach(item => {
      if (item.id === cardId) {
        item.isShown = !item.isShown;
      }
    });

    this.updateStore(STORAGE_KEY, notes);
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { notes } = this.state;

    this.setState({
      isAnimate: false,
      notes: arrayMove(notes, oldIndex, newIndex)
    });
    this.updateStore(STORAGE_KEY, notes);
  };

  render() {
    const { notes, isEdit, dataEdit, isAnimate } = this.state;
    const currentDate = moment().format("dddd, D MMMM YYYY");
    const greetingWord = this.getGreetings(moment());

    console.log("NOTES: ", notes);

    return (
      <Wrapper>
        <Welcome>{`Good ${greetingWord}, its ${currentDate}. Keep rockin!`}</Welcome>
        <NotesInput
          onSet={this.onAddNew}
          isEdit={isEdit}
          dataEdit={dataEdit}
          isAnimate={isAnimate}
        />
        <NotesCard
          data={notes}
          onSortEnd={this.onSortEnd}
          onDeleteCard={this.onDeleteCard}
          onEditCard={this.onEditCard}
          onCompleteCard={this.onCompleteCard}
          isAnimate={isAnimate}
          useDragHandle
          useWindowAsScrollContainer
        />
        <CreateBy>
          Another thing from{" "}
          <a href="https://ahmadzakiy.com/?utm_source=xnotes&utm_medium=footer">
            Zakiy
          </a>
        </CreateBy>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  min-height: 100vh;
  color: #232323;
  background: #f1f3f5;
`;

const Welcome = styled.span`
  padding: 20px 0;
  font-size: 16px;
`;

const CreateBy = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  font-size: 10px;
`;

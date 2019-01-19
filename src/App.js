import React, { Component } from "react";
import styled from "styled-components";
import moment from "moment";
import { arrayMove } from "react-sortable-hoc";
import AOS from "aos";
import "aos/dist/aos.css";

// Components
import NotesInput from "./components/NotesInput";
import NotesCard from "./components/NotesCard";

export default class App extends Component {
  state = {
    key: "modernlifeiswar",
    notes: [
      {
        id: 1,
        dateCreated: "13/04/2018",
        content: `Hi, 

                  Thank you for using xNotes, here are some useful tips for you: 
                  - To add a note, just hit the 'save' button or hold 'shift' then press 'enter' 
                  - To add a new line, just press 'enter' 
                  - To move your card, point your mouse to the 'move' text and then drag the card 
                  - To edit your card, click the 'edit' text 
                  - To delete your card, click the 'x' button 
                  
                  Now you're ready to write your first note. Enjoy!`,
        isShown: true
      },
      {
        id: 2,
        dateCreated: "13/04/2018",
        content: `Hi, 

                  Thank you for using xNotes, here are some useful tips for you: 
                  - To add a note, just hit the 'save' button or hold 'shift' then press 'enter' 
                  - To add a new line, just press 'enter' 
                  - To move your card, point your mouse to the 'move' text and then drag the card 
                  - To edit your card, click the 'edit' text 
                  - To delete your card, click the 'x' button 
                  
                  Now you're ready to write your first note. Enjoy!`,
        isShown: true
      },
      {
        id: 3,
        dateCreated: "13/04/2018",
        content: `Hi, 

                  Thank you for using xNotes, here are some useful tips for you: 
                  - To add a note, just hit the 'save' button or hold 'shift' then press 'enter' 
                  - To add a new line, just press 'enter' 
                  - To move your card, point your mouse to the 'move' text and then drag the card 
                  - To edit your card, click the 'edit' text 
                  - To delete your card, click the 'x' button 
                  
                  Now you're ready to write your first note. Enjoy!`,
        isShown: true
      },
      {
        id: 4,
        dateCreated: "13/04/2018",
        content: `Hi, 

                  Thank you for using xNotes, here are some useful tips for you: 
                  - To add a note, just hit the 'save' button or hold 'shift' then press 'enter' 
                  - To add a new line, just press 'enter' 
                  - To move your card, point your mouse to the 'move' text and then drag the card 
                  - To edit your card, click the 'edit' text 
                  - To delete your card, click the 'x' button 
                  
                  Now you're ready to write your first note. Enjoy!`,
        isShown: true
      },
      {
        id: 5,
        dateCreated: "13/04/2018",
        content: `Hi, 

                  Thank you for using xNotes, here are some useful tips for you: 
                  - To add a note, just hit the 'save' button or hold 'shift' then press 'enter' 
                  - To add a new line, just press 'enter' 
                  - To move your card, point your mouse to the 'move' text and then drag the card 
                  - To edit your card, click the 'edit' text 
                  - To delete your card, click the 'x' button 
                  
                  Now you're ready to write your first note. Enjoy!`,
        isShown: true
      },
      {
        id: 6,
        dateCreated: "13/04/2018",
        content: `Hi, 

                  Thank you for using xNotes, here are some useful tips for you: 
                  - To add a note, just hit the 'save' button or hold 'shift' then press 'enter' 
                  - To add a new line, just press 'enter' 
                  - To move your card, point your mouse to the 'move' text and then drag the card 
                  - To edit your card, click the 'edit' text 
                  - To delete your card, click the 'x' button 
                  
                  Now you're ready to write your first note. Enjoy!`,
        isShown: true
      }
    ],
    dataEdit: "",
    isEdit: false,
    isAnimate: false
  };

  componentDidMount() {
    const { key } = this.state;

    this.getStore(key);

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
    //   //console.log("UPDATE DATA", obj);
    //   if (chrome.runtime.error) {
    //     console.log("Runtime error.");
    //   }
    // });
  };

  onAddNew = newNotes => {
    const { key, notes } = this.state;

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
      isAnimate: true
    });

    this.updateStore(key, notes);
  };

  onEditCard = (cardId, cardContent) => {
    this.setState({
      isEdit: true,
      dataEdit: cardContent
    });

    this.onDeleteCard(cardId);
  };

  onDeleteCard = cardId => {
    const { key, notes } = this.state;

    this.setState({
      notes: notes.filter(c => c.id !== cardId)
    });

    this.updateStore(key, notes);
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { key, notes } = this.state;

    this.setState({
      isAnimate: false,
      notes: arrayMove(notes, oldIndex, newIndex)
    });

    this.updateStore(key, notes);
  };

  render() {
    const { notes, isEdit, dataEdit, isAnimate } = this.state;

    const currentDate = moment().format("dddd, D MMMM");
    const greetingWord = this.getGreetings(moment());

    console.log("NOTES: ", notes);
    console.log("DATA EDIT: ", dataEdit);

    return (
      <Wrapper>
        <Welcome>{`Good ${greetingWord}, its ${currentDate}. Stay awesome!`}</Welcome>
        <NotesInput
          onSet={this.onAddNew}
          isEdit={isEdit}
          dataEdit={dataEdit}
          isAnimate={isAnimate}
        />
        <Title>
          {notes.length !== 0
            ? `What's on your thoughts`
            : `Write something in your mind`}
        </Title>
        <NotesCard
          data={notes}
          onSortEnd={this.onSortEnd}
          onDeleteCard={this.onDeleteCard}
          onEditCard={this.onEditCard}
          isAnimate={isAnimate}
          useDragHandle
          useWindowAsScrollContainer
        />
        <CreateBy>
          Another thing from <a href="https://ahmadzakiy.com/">Zakiy</a>
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
`;

const Welcome = styled.span`
  padding: 10px 0;
  font-size: 16px;
`;

const Title = styled.div`
  margin-top: 20px;
  padding: 10px 0;
  font-size: 14px;
`;

const CreateBy = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  font-size: 10px;
`;

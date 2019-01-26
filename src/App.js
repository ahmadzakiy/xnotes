import React, { Component } from "react";
import styled, { ThemeProvider } from "styled-components";
import moment from "moment";
import { arrayMove } from "react-sortable-hoc";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  STORAGE_KEY,
  WELCOME_NOTE,
  THEME_STORAGE_KEY,
  THEME_DARK,
  THEME_LIGHT
} from "./static";

// Components
import Toggle from "react-toggle";
import NotesInput from "./components/NotesInput";
import NotesCard from "./components/NotesCard";

// CSS
import "./css/toggle.css";

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
    isAnimate: false,
    isLightTheme: true
  };

  componentDidMount() {
    this.getStore(THEME_STORAGE_KEY);
    this.getStore(STORAGE_KEY);
    AOS.init({
      offset: 0,
      duration: 400,
      easing: "ease-out-quart",
      delay: 100,
      once: false
    });
  }

  getStore = keyStore => {
    // eslint-disable-line
    window.chrome.storage.sync.get(keyStore, result => {
      if (!window.chrome.runtime.error) {
        let data = JSON.parse(result[keyStore]);
        console.log("GET STORAGE: ", data);
        if (keyStore === STORAGE_KEY) {
          this.setState({
            notes: data
          });
        } else if (keyStore === THEME_STORAGE_KEY) {
          this.setState({
            isLightTheme: data === "light" ? true : false
          });
        }
      }
    });
  };

  setStore = (keyStore, data) => {
    let obj = {};
    obj[keyStore] = JSON.stringify(data);
    // console.log("SET STORAGE: ", data);
    window.chrome.storage.sync.set(obj, () => {
      if (window.chrome.runtime.error) {
        console.log("Runtime error.");
      }
    });
  };

  onAddNew = newNotes => {
    const { notes } = this.state;
    const newId =
      notes.length !== 0 ? Math.max.apply(null, notes.map(t => t.id)) + 1 : 1;
    this.setState(
      {
        isAnimate: true,
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
        isEdit: false
      },
      () => {
        this.setState({ isAnimate: false });
        this.setStore(STORAGE_KEY, this.state.notes);
      }
    );
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
    this.setState(
      {
        notes: notes.filter(c => c.id !== cardId)
      },
      () => this.setStore(STORAGE_KEY, this.state.notes)
    );
  };

  onCompleteCard = cardId => {
    const { notes } = this.state;
    notes.forEach(item => {
      if (item.id === cardId) {
        item.isShown = !item.isShown;
      }
    });
    this.setStore(STORAGE_KEY, notes);
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { notes } = this.state;
    this.setState(
      {
        notes: arrayMove(notes, oldIndex, newIndex)
      },
      () => this.setStore(STORAGE_KEY, this.state.notes)
    );
  };

  handleGreetings = m => {
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

  handleThemeChange = async () => {
    const { isLightTheme } = this.state;
    this.setState(
      {
        isLightTheme: !isLightTheme
      },
      () =>
        this.setStore(
          THEME_STORAGE_KEY,
          this.state.isLightTheme === true ? "light" : "dark"
        )
    );
  };

  render() {
    const { notes, isEdit, dataEdit, isAnimate, isLightTheme } = this.state;
    const currentDate = moment().format("dddd, D MMMM YYYY");
    const greetingWord = this.handleGreetings(moment());

    return (
      <ThemeProvider theme={isLightTheme ? THEME_LIGHT : THEME_DARK}>
        <Wrapper>
          <Welcome>{`Good ${greetingWord}, its ${currentDate}. Keep Rocks!`}</Welcome>
          <ChangeTheme>
            <Toggle
              defaultChecked={isLightTheme}
              onChange={this.handleThemeChange}
              icons={false}
            />
          </ChangeTheme>
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
      </ThemeProvider>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  min-height: 100vh;

  ${props => `
    background: ${props.theme.background};
    color: ${props.theme.text};
    `}
`;

const Welcome = styled.span`
  padding: 20px 0;
  font-size: 16px;
`;

const CreateBy = styled.span`
  position: fixed;
  bottom: 10px;
  right: 10px;
  font-size: 12px;
  color: #b7b7b7;

  a {
    ${props => `
    color: ${props.theme.text};
    `}
  }
`;

const ChangeTheme = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  font-size: 18px;
`;

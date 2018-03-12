import React, { Component } from "react";
import styled from "styled-components";
import "./App.css";
import Button from "./module-common/Button";

export default class App extends Component {
  render() {
    return (
      <Wrapper>
        <Title>xNotes</Title>
        <Button size="large" color="primary" text="are you ready to rock ?" />
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Wrapper>
    );
  }
}
const Wrapper = styled.div``;

const Title = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 20px;
  margin-bottom: 50px;
  background: linear-gradient(200deg, #3602b8, #00dcff);
  color: white;
  font-size: 24px;
`;

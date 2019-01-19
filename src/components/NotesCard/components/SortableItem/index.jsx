import React, { Component } from "react";
import { func, object, bool } from "prop-types";
import styled from "styled-components";
import { SortableElement, SortableHandle } from "react-sortable-hoc";

// Component
import Button from "../../../Button";

class SortableItem extends Component {
  static propTypes = {
    item: object,
    onDeleteCard: func,
    onEditCard: func,
    isAnimate: bool
  };

  render() {
    const { item, onDeleteCard, onEditCard, isAnimate } = this.props;

    const DragHandle = SortableHandle(() => <IconDrag>move</IconDrag>);

    return (
      <Wrapper>
        <Card data-aos={isAnimate ? "fade-right" : ""}>
          {item.content.split("\n").map((text, index) => {
            return (
              <span key={index}>
                {text}
                <br />
              </span>
            );
          })}
        </Card>
        <ButtonWrapper>
          <Button
            text="X"
            size="small"
            color="danger"
            onClick={() => onDeleteCard(item.id)}
          />
          <Button
            text="E"
            size="small"
            color="success"
            onClick={() => onEditCard(item.id, item.content)}
          />
          <DragHandle />
        </ButtonWrapper>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`;

const Card = styled.div`
  width: 500px;
  border-radius: 8px;
  margin: 20px 0;
  background: #ffffff;
  border: 1px solid #ffffff;
  padding: 20px;
  font-size: 12px;
  word-wrap: break-word;
  line-height: 20px;
  transition: box-shadow 0.35s ease-out, transform 0.3s ease-out,
    opacity 0.2s ease-out;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);

  :hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
    transform: translate(0, -4px);
    cursor: text;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: -80px;
  top: 20px;
  padding: 10px;
`;

const IconDrag = styled.div`
  cursor: all-scroll;
  font-size: 12px;
  padding: 10px;
`;

export default SortableElement(SortableItem);

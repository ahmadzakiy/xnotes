import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from "react-sortable-hoc";
import Button from "../module-common/Button";

export default class NotesCard extends Component {
  static propTypes = {
    data: PropTypes.array,
    onSortEnd: PropTypes.func,
    onDeleteCard: PropTypes.func,
    onEditCard: PropTypes.func,
    onAnimate: PropTypes.bool,
    animateEffect: PropTypes.string
  };
  render() {
    const {
      data,
      onSortEnd,
      onDeleteCard,
      onEditCard,
      onAnimate,
      animateEffect
    } = this.props;

    const DragHandle = SortableHandle(() => (
      <IconDragHandle>move</IconDragHandle>
    ));

    const SortableItem = SortableElement(({ value }) => (
      <Center>
        <RowCard data-aos={onAnimate ? animateEffect : null}>
          {value.content.split("\n").map((item, key) => {
            return (
              <span key={key}>
                {item}
                <br />
              </span>
            );
          })}
          <ButtonDel
            text="X"
            size="small"
            color="danger"
            onClick={cardId => onDeleteCard(value.id)}
          />
          <DragHandle />
          <EditNotes
            onClick={(cardId, cardContent) =>
              onEditCard(value.id, value.content)
            }
          >
            edit
          </EditNotes>
        </RowCard>
      </Center>
    ));

    const SortableList = SortableContainer(({ items }) => {
      return (
        <div>
          {items.map(
            (value, index) =>
              value.isShown && (
                <SortableItem
                  key={`item-${index}`}
                  index={index}
                  value={value}
                />
              )
          )}
        </div>
      );
    });
    return (
      <Wrapper>
        <SortableList items={data} onSortEnd={onSortEnd} useDragHandle={true} />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
`;

const RowCard = styled.div`
  position: relative;
  width: 500px;
  height: auto;
  border-radius: 8px;
  margin-top: 10px;
  margin-bottom: 30px;
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

const ButtonDel = styled(Button)`
  position: absolute;
  top: -15px;
  right: 0;
`;

const IconDragHandle = styled.div`
  cursor: all-scroll;
  position: absolute;
  left: 10px;
  margin-top: 25px;
  font-size: 10px;
  color: #bebebe;
  :hover {
    color: #232323;
  }
`;

const EditNotes = styled.div`
  cursor: pointer;
  position: absolute;
  left: 50px;
  margin-top: 25px;
  font-size: 10px;
  color: #bebebe;
  :hover {
    color: #232323;
  }
`;

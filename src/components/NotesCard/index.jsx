import React, { Component } from "react";
import { arrayOf, object, func, bool } from "prop-types";
import styled from "styled-components";
import { SortableContainer } from "react-sortable-hoc";

// Component
import SortableItem from "./components/SortableItem";

class NotesCard extends Component {
  static propTypes = {
    data: arrayOf(object),
    onDeleteCard: func,
    onEditCard: func,
    isAnimate: bool
  };

  render() {
    const { data, onDeleteCard, onEditCard, isAnimate } = this.props;

    return (
      <Wrapper data-aos="fade-down">
        {data.map((item, index) => {
          return (
            item.isShown && (
              <SortableItem
                key={item.id}
                index={index}
                item={item}
                onDeleteCard={onDeleteCard}
                onEditCard={onEditCard}
                isAnimate={isAnimate}
              />
            )
          );
        })}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default SortableContainer(NotesCard);

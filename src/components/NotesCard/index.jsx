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

  state = {
    filterType: "ALL"
  };

  handleSetFilter(value) {
    this.setState({
      filterType: value
    });
  }

  render() {
    const {
      data,
      onDeleteCard,
      onEditCard,
      onCompleteCard,
      isAnimate
    } = this.props;
    const { filterType } = this.state;

    const filteredData = data.filter(c => {
      if (filterType === "COMPLETED") {
        return !c.isShown;
      } else if (filterType === "ACTIVE") {
        return c.isShown;
      } else {
        return c;
      }
    });

    return (
      <Wrapper data-aos="fade-down">
        <ButtonWrapper>
          <BtnFilter
            onClick={this.handleSetFilter.bind(this, "ALL")}
            active={filterType === "ALL"}
          >
            All
          </BtnFilter>
          <BtnFilter
            onClick={this.handleSetFilter.bind(this, "COMPLETED")}
            active={filterType === "COMPLETED"}
          >
            Completed
          </BtnFilter>
          <BtnFilter
            onClick={this.handleSetFilter.bind(this, "ACTIVE")}
            active={filterType === "ACTIVE"}
          >
            Active
          </BtnFilter>
        </ButtonWrapper>
        {filteredData.map((item, index) => {
          return (
            <SortableItem
              key={item.id}
              index={index}
              item={item}
              onDeleteCard={onDeleteCard}
              onEditCard={onEditCard}
              onCompleteCard={onCompleteCard}
              isAnimate={isAnimate}
            />
          );
        })}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: -43px;
  left: 0px;
`;

const BtnFilter = styled.div`
  cursor: pointer;
  font-size: 12px;
  padding: 5px;

  ${props => `
    color: ${props.active ? "inherit" : "#b7b7b7"};
  `}
`;

export default SortableContainer(NotesCard);

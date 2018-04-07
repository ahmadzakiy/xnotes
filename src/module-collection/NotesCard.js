import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from "react-sortable-hoc";
import Button from "../module-common/Button";

export default class NotesCard extends Component {
  static propTypes = {
    data: PropTypes.array,
    onSortEnd: PropTypes.func,
    onDeleteCard: PropTypes.func
  };
  render() {
    const { data, onSortEnd, onDeleteCard } = this.props;

    const SortableItem = SortableElement(({ value }) => (
      <Row>
        <RowCard>
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
            onClick={card => onDeleteCard(value.content)}
          />
        </RowCard>
      </Row>
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
        <SortableList items={data} onSortEnd={onSortEnd} />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
`;

const RowCard = styled.div`
position: relative;
  width: 500px;
  height: auto;
  background: #f7f7f7;
  border: 1px solid #f7f7f7;
  padding: 20px;
  font-size: 12px;
  line-height: 20px
  border-radius: 8px;
  margin-top: 15px;
  &:hover {
    border: 1px solid #d5d5d5;
  }
`;

const ButtonDel = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
`;

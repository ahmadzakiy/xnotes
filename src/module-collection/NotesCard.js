import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
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
  border-radius: 8px;
  margin-top: 15px;
  background: #ffffff;
  border: 1px solid #ffffff;
  padding: 20px;
  font-size: 12px;
  line-height: 20px;
  transition: box-shadow 0.35s ease-out, transform 0.3s ease-out,
    opacity 0.2s ease-out;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
    transform: translate(0, -4px);
    cursor: all-scroll;
  }
`;

const ButtonDel = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
`;

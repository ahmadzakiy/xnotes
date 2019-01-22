import React, { Component } from "react";
import { func, object, bool } from "prop-types";
import styled from "styled-components";
import { SortableElement, SortableHandle } from "react-sortable-hoc";

// Assets
import pencil from "../../../../assets/pencil-alt-solid.svg";
import trash from "../../../../assets/trash-alt-solid.svg";
import arrows from "../../../../assets/arrows-alt-solid.svg";
import check from "../../../../assets/check-solid.svg";
import uncheck from "../../../../assets/times-solid.svg";

class SortableItem extends Component {
  static propTypes = {
    item: object,
    onDeleteCard: func,
    onEditCard: func,
    isAnimate: bool
  };

  state = {
    isShowBtn: false
  };

  componentDidUpdate(prevProps) {
    const { isAnimate: prevIsAnimate } = prevProps;
    const { isAnimate } = this.props;

    if (prevIsAnimate !== isAnimate) {
      console.log("masuk");
      this.setState({
        isShowBtn: false
      });
    }
  }

  handleShowButton = () => {
    const { isShowBtn } = this.state;

    this.setState({ isShowBtn: !isShowBtn });
  };

  render() {
    const {
      item,
      onDeleteCard,
      onEditCard,
      onCompleteCard,
      isAnimate
    } = this.props;
    const { isShowBtn } = this.state;
    const DragHandle = SortableHandle(() => <IconImg src={arrows} />);

    return (
      <Wrapper
        onMouseEnter={this.handleShowButton}
        onMouseLeave={this.handleShowButton}
      >
        <Card
          data-aos={isAnimate ? "fade-right" : ""}
          isNotCompleted={item.isShown}
        >
          {item.content}
        </Card>
        {isShowBtn && (
          <ButtonWrapper>
            <IconImg src={trash} onClick={() => onDeleteCard(item.id)} />
            <IconImg
              src={pencil}
              onClick={() => onEditCard(item.id, item.content)}
            />
            <IconImg
              src={item.isShown ? check : uncheck}
              onClick={() => onCompleteCard(item.id)}
            />
            <DragHandle />
          </ButtonWrapper>
        )}
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
  cursor: text;
  width: 500px;
  border-radius: 8px;
  margin: 10px 0;
  background: #ffffff;
  border: 1px solid #ffffff;
  padding: 20px;
  font-size: 12px;
  word-wrap: break-word;
  white-space: pre-wrap;
  line-height: 20px;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);

  ${props =>
    `text-decoration: ${props.isNotCompleted ? "normal" : "line-through"};`}

  :hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  right: 10px;
  top: 20px;
`;

const IconImg = styled.img`
  cursor: pointer;
  width: 14px;
  height: 14px;
  margin-left: 10px;
  color: pink;
`;

export default SortableElement(SortableItem);

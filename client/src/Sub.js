import React, { Component } from "react";
import styled from "styled-components";
import EditableContent from "./EditableContent";

const Container = styled.div`
  width: 33.3333%;
  height: 100%;
  border: solid #999;
  border-width: 0 1px 1px 0;
`;

const Row = styled.div`
  width: 100%;
  height: 33.3333%;

  display: flex;
`;

class Sub extends Component {
  render() {
    return (
      <Container>
        <Row>
          <EditableContent
            area={
              this.props.content && this.props.content["1"]
                ? this.props.content["1"]
                : undefined
            }
          />
          <EditableContent
            area={
              this.props.content && this.props.content["2"]
                ? this.props.content["2"]
                : undefined
            }
          />
          <EditableContent
            area={
              this.props.content && this.props.content["3"]
                ? this.props.content["3"]
                : undefined
            }
          />
        </Row>
        <Row>
          <EditableContent
            area={
              this.props.content && this.props.content["4"]
                ? this.props.content["4"]
                : undefined
            }
          />
          <EditableContent
            area={
              this.props.content && this.props.content["5"]
                ? this.props.content["5"]
                : undefined
            }
            id={this.props.id}
            name="sub_main"
            updateMainContent={this.props.updateMainContent}
          />
          <EditableContent
            area={
              this.props.content && this.props.content["6"]
                ? this.props.content["6"]
                : undefined
            }
          />
        </Row>
        <Row>
          <EditableContent
            area={
              this.props.content && this.props.content["7"]
                ? this.props.content["7"]
                : undefined
            }
          />
          <EditableContent
            area={
              this.props.content && this.props.content["8"]
                ? this.props.content["8"]
                : undefined
            }
          />
          <EditableContent
            area={
              this.props.content && this.props.content["9"]
                ? this.props.content["9"]
                : undefined
            }
          />
        </Row>
      </Container>
    );
  }
}

export default Sub;

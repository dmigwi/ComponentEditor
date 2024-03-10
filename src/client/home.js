import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { BlocksList } from "./blocks-list";

function WithHooks(WrappedComponent) {
  return function(props) {
    const navigate = useNavigate();
   
   const openBlock = function(block) {
    navigate("/" + block, { state: { "block": block } });
   }
    return (
      < WrappedComponent openBlock={openBlock} {...props} />
    );
  };
}

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.onBlockSelected = this.onBlockSelected.bind(this);
  }

  onBlockSelected(block) {
    console.log(">>>>> Block selected >>>> ", block);
    const { openBlock } = this.props;
    openBlock(block);
  }

  render() {
    return (
      <Container style={{ maxWidth: "unset" }}>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <h3>Edit or Create a Block</h3>
              </Card.Header>
              <Card.Body style={{ padding: "2rem 0.5rem" }}>
                <BlocksList
                  cachedData={this.props.cachedData}
                  onBlockSelected={this.onBlockSelected}
                  refreshData={this.props.refreshData}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}


export default Home = WithHooks(Home);
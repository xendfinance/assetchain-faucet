import { Container, Nav, Navbar } from "react-bootstrap";
import React from "react";

function FaucetNavBar() {
  return (
    <Navbar
      expand="lg"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "80%",
        // height: "Hug (32px)px",
        // top: "53px",
        // left: "256px",
        // gap: "519px",
        // opacity: "0px",
      }}
      className="bg-body-tertiary"
    >
      <Container fluid>
        <Navbar.Brand
          style={{
            color: "white",
            width: "188.18px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            marginLeft: "50px"
          }}
          href="#"
        >
          <img
            src="/images/asset-chain.png"
            alt="asset-chain"
            style={{ marginRight: "10px" }}
          />
          Asset Chain
        </Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
        {/* <Navbar.Collapse id="navbarScroll"> */}
        <Nav
          className="d-flex"
          style={{
            maxHeight: "100px",
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
          navbarScroll
        >
          <Nav.Link
            style={{ color: "white" }}
            href="https://leaderboard.assetchain.org"
          >
            Testnet Leaderboard
          </Nav.Link>
        </Nav>
        {/* </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
}

export default FaucetNavBar;
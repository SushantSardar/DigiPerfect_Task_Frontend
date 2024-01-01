import React, { useEffect, useState } from "react";
import { Nav, Navbar, Container, Row, Col, CardBody, CardSubtitle, CardTitle, Card, CardText, Button, CardGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

const App = () => {
  const [booksData, setBooksData] = useState([]);
  // _______________________Fetching Data__________________________________
  useEffect(() => {
    fetch(`http://localhost:4000/bookslist`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setBooksData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
 {/* _________________________________Navbar__________________________________ */}
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={"/bookslist"}
                  className="nav-link">
                  Wisdom Vedic Books
                </Link>
              </Navbar.Brand>

              <Nav className="justify-content-end">
                <Nav>
                  <Link to={"/addbook"}
                    className="nav-link">
                    My Cart
                  </Link>
                </Nav>

                <Nav>
                  <Link to={"/bookslist"}
                    className="nav-link">
                    Books List
                  </Link>
                </Nav>
              </Nav>
            </Container>
          </Navbar>
        </header>
{/* _________________________Container_________________________________ */}
        <Container>
          <div style={{ display: "flex", gap: "25px", flexWrap: "wrap", marginTop: "20px", alignItems: "center", justifyContent: "center" }}>
            {
              booksData.map((book) => (
                <div key={book}>
                  <CardGroup>
                    <Col style={{ width: "18rem" }}>
                      <div>
                        <Card style={{ width: '18rem', border: "solid gray 1px" }} >
                          <img
                            alt="Sample"
                            src={book.thumbnail}
                            top
                            width="100%"
                            height="445px"
                          />
                          <CardBody style={{}}>
                            <CardTitle tag="h5">
                              {book.title}
                            </CardTitle>
                            <label>Author : {book.author}</label>
                            <label>Publisher : {book.publisher}</label>
                            <label>Publishing Year : {book.publishingYear}</label>
                            <label>EAN Code : {book.eanCode}</label>
                            <label>Copies Left :<h6 style={{ color: "red", display: "inline" }}> {book.copiesInStock}</h6></label>
                            <CardSubtitle
                              className="mb-2 text-muted"
                              tag="h6"
                            >
                              {book.createAt}
                            </CardSubtitle>
                            <Button >
                              Add to Cart
                            </Button>
                          </CardBody>
                        </Card>
                      </div>
                    </Col>
                  </CardGroup>
                </div>
              ))
            }
          </div>
        </Container>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "80px" }}>© 2023 WisdomVedicBooks.com, Pune</div>
      </div>
    </Router>
  );
};

export default App;

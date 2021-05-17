import React, { useState } from "react";
import Jumbotron from "../components/Jumbotron";
// import DeleteBtn from "../components/DeleteBtn";
// import SaveBtn from "../components/SaveBtn";
import Thumbnail from "../components/Thumbnail";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

function Books() {

  const [formObject, setFormObject] = useState({
    title: ""
  });

  const [books, setBooks] = useState([]);

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  // Handles querying the google books API for books that match the user's search criteria
  function handleSearchFormSubmit(event) {
    event.preventDefault();

    API.getBooks(formObject.title)
      .then(res => {
        let myBooksArray = res.data.items;
        let myNewBooksArray = [];

        for (let i = 0; i < myBooksArray.length; i++) {
          let myBookObj = {
            key: myBooksArray[i].id,
            id: myBooksArray[i].id,
            // authors: myBooksArray[i].volumeInfo.authors,
            description: myBooksArray[i].volumeInfo.description,
            link: myBooksArray[i].volumeInfo.infoLink,
            title: myBooksArray[i].volumeInfo.title
          }
          
          if (!(myBooksArray[i].volumeInfo.imageLinks) || (myBooksArray[i].volumeInfo.imageLinks === undefined)) {
            myBookObj.image = "https://via.placeholder.com/300";
          } else {
            myBookObj.image = myBooksArray[i].volumeInfo.imageLinks.thumbnail;
          } 

          if (!(myBooksArray[i].volumeInfo.authors) || (myBooksArray[i].volumeInfo.authors === undefined)) {
            myBookObj.authors = ["Anonymous, Not Listed"];
          } else {
            myBookObj.authors = myBooksArray[i].volumeInfo.authors;
          } 

          myNewBooksArray.push(myBookObj);
        }
        setBooks(myNewBooksArray);
      })
      .catch(err => console.log(err));
  };
    
  // Handles when user clicks on "Save Book" button and saves book to Mongo DB
  function handleSaveBook(bookData) {
    
    console.log("Save Book Data: ", bookData);

    API.saveBook({
      title: bookData.title,
      authors: bookData.authors,
      description: bookData.description,
      image: bookData.image,
      link: bookData.link,
      id: bookData.id
    })
    .then(window.alert("Thank you, your book has been saved!"))
    .catch(err => console.log(err));
  }
  

    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Google Books Search</h1>
              <h4>Search for and Save Books of Interest</h4>
            </Jumbotron>

            <form>
              <Input
                onChange={handleInputChange}
                name="title"
                placeholder="Title"
                value={formObject.title}
              />
              <FormBtn
                disabled={!(formObject.title)}
                onClick={handleSearchFormSubmit}
              >
                Search Books
              </FormBtn>
            </form>
          </Col>

          <Col size="md-6 sm-12">
              <h1>Search Results</h1>

            {books.length ? (
              <List>
                {books.map(book => {
                  return (
                    <ListItem key={book.id}>
                      <Col size="xs-4 sm-2">
                        <Thumbnail src={book.image} />
                      </Col>
                      <Col size="xs-8 sm-9">
                        <h3>{book.title}</h3>
                        <h3>Author(s): {book.authors.map((author) => author + ", ")}
                        </h3>
                        <p><strong>Description: </strong>{book.description}</p>
                        <p><a rel="noreferrer noopener" target="_blank" href={book.link}>
                              <strong>Click here to view details on Google Books</strong>
                            </a>
                        </p>
                      </Col>  
                      {/* <SaveBtn onClick={handleSaveBook} id={book.id} /> */}
                      <button onClick={() => handleSaveBook(book)} className="btn btn-success save-btn">
                        Save Book
                      </button>
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }

export default Books;

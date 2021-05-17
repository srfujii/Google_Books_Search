import React, { useState, useEffect } from "react";
// import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import Thumbnail from "../components/Thumbnail";

function Saved() {
    // Setting our component's initial state
    const [books, setBooks] = useState([]);

    // Load all saved books from MongoDB and store them with setBooks
    useEffect(() => {
        loadBooks()
    }, [])

    // Loads all saved books from MongoDB and sets them to books
    function loadBooks() {
        API.getSavedBooks()
            .then(res =>
                setBooks(res.data)
            )
            .catch(err => console.log(err));
    };

    // Deletes a book from the database with a given id, then reloads books from the db
    function deleteBook(id) {
        API.deleteBook(id)
            .then(res => loadBooks())
            .catch(err => console.log(err));
    }

    return (
        <Container fluid>
            <Row>
            <Col size="lg-12 md-12 sm-12">
                <Jumbotron>
                    <h1>My Saved Books</h1>
                </Jumbotron>

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
                                    <button onClick={() => deleteBook(book._id)} className="btn btn-danger delete-btn">
                                        Delete Book
                                    </button>
                                    {/* <DeleteBtn onClick={() => deleteBook(book.id)} /> */}
                                    {/* <SaveBtn onClick={handleSaveBook} id={book.id} /> */}
                                    {/* <DeleteBtn onClick={() => deleteBook(book._id)} /> */}
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


export default Saved;

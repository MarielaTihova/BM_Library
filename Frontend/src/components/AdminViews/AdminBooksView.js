import React, { useState, useEffect, useContext } from 'react';
import Header from '../Base/Header/Header';
import Book from '../Books/Book/Book';
import "./AdminBooksView.scss";
import { MDBEdgeHeader } from "mdbreact";
import { BASE_URL } from '../../common/constants';
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardLink, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';

const AdminBooksView = (props) => {
  const word = props.location.search;
  const searchWord = word.substring(6);
  const [error, setError] = useState(null);
  const [appBooks, updateBooks] = useState([]);

  useEffect(() => {

    fetch(`${BASE_URL}/books?name=${searchWord}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        }
    })
        .then((response) => response.json())
        .then((result) => {
            if (Array.isArray(result)) {
                console.log(result)
                updateBooks(result);
            } else {
                throw new Error(result.message);
            }
        })
        .catch((error) => setError(error.message))
}, [searchWord]);

  return (<div className="admin-books">
                {appBooks &&
                    appBooks.map((book) => (
                      <MDBCard style={{ width: '18rem' }}>
                        <MDBCardImage position='top' alt='...' src={book.poster} />
                        <MDBCardBody>
                          <MDBCardTitle>{book.name}</MDBCardTitle>
                        </MDBCardBody>
                        <MDBListGroup flush>
                          <MDBListGroupItem>ID: {book.id}</MDBListGroupItem>
                          <MDBListGroupItem>{book.isDeleted ? 'Not available for renting' : 'In Stock'}</MDBListGroupItem>
                        </MDBListGroup>
                        <MDBCardBody>
                          <MDBCardLink href={`/books/${book.id}`}>View Details</MDBCardLink>
                          <MDBCardLink href='#'>Edit</MDBCardLink>
                        </MDBCardBody>
                      </MDBCard>
                    ))}
            </div>);
}


export default AdminBooksView;
import React from 'react';
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBBadge, MDBBtn  } from 'mdb-react-ui-kit';

const UserAdminView = (props) => {
  const user = props.user;
  const isUserAdmin = user && user.role == 2 ? true : false;
  const isUserDeleted = user && user.isDeleted ? true : false;

  return (
    <MDBCard style={{ maxWidth: '450px' }}>
      <MDBRow className='g-0'>
        <MDBCol md='4'>
          <MDBCardImage src={user.avatar} alt='...' fluid />
        </MDBCol>
        <MDBCol md='8'>
          <MDBCardBody>
            <MDBCardTitle>{user.username}</MDBCardTitle>
            <MDBCardText>
                Role: {isUserAdmin ?  
                <MDBBadge pill className='mx-2' color='success'>
                 Admin
                </MDBBadge> 
                : 
                <MDBBadge pill className='mx-2' color='secondary'>
                 Basic user
                </MDBBadge> }    
              
            </MDBCardText>
            <MDBCardText>
              <small className='text-muted'> {user.isDeleted ? 'Not Active': 'Active user'}</small>
            </MDBCardText>
            <div>
               <MDBBtn color={isUserAdmin ? 'secondary' : 'success'}  size='sm' onClick={() => { props.toggleUserRights(user.id) }}>
                {isUserAdmin ? 'Make basic' : 'Make admin'}
              </MDBBtn>
              <MDBBtn color={isUserDeleted ? 'light' : 'danger'}  size='sm' onClick={() => { props.toggleDeleteUser(user.id) }}>
                {isUserDeleted ? 'Enable' : 'Disable'}
              </MDBBtn>
            </div>
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
    </MDBCard>
  );
}

export default UserAdminView;
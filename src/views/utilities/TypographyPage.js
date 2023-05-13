import React, { useState } from 'react';
import image from "../../assets/images/profile/vecteur-d-icône-de-profil-avatar-par-défaut-image-sociale-utilisateur-médias-social-182145777.jpg";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import DashboardCard from 'src/components/shared/DashboardCard';
import useFetchData from '../../costumHook/fatchdata';

export default function TypographyPage() {
  const [users] = useFetchData('http://localhost:8080/authentication-management/users/all');
  const [editMode, setEditMode] = useState(false);
  const [editedUsers, setEditedUsers] = useState([]);
  const convertImage = (base64Image) => {
    return base64Image;
  };
  const handleEditClick = () => {
    setEditMode(!editMode);
    if (editMode) {
      console.log('Saving changes:', editedUsers);
    } else {
      setEditedUsers([...users]);
    }
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedUsers = [...editedUsers];
    updatedUsers[index][name] = value;
    setEditedUsers(updatedUsers);
  };

  return (
    <>
      <DashboardCard title="Users">
        <MDBTable align='middle'>
          <MDBTableHead>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Status</th>
              <th scope='col'>Role</th>
              <th scope='col'>Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>
                  <div className='d-flex align-items-center'>
                    <img
                      src={convertImage(user.image)}
                      alt=''
                      style={{ width: '45px', height: '45px' }}
                      className='rounded-circle'
                    />
                    <div className='ms-3'>
                      {editMode ? (
                        <input
                          type='text'
                          name='username'
                          value={user.username}
                          onChange={(e) => handleInputChange(e, index)}
                          className='form-control'
                        />
                      ) : (
                        <p className='fw-bold mb-1'>{user.username}</p>
                      )}
                      <p className='text-muted mb-0'>{user.email}</p>
                    </div>
                  </div>
                </td>
                <td>
                  {editMode ? (
                    <select
                      name='enabled'
                      value={user.enabled}
                      onChange={(e) => handleInputChange(e, index)}
                      className='form-select'
                    >
                      <option value={true}>true</option>
                      <option value={false}>false</option>
                    </select>
                  ) : (
                    <>
                      {String(user.enabled) === 'true' ? (
                        <MDBBadge color='success' pill>
                          {String(user.enabled)}
                        </MDBBadge>
                      ) : (
                        <MDBBadge color='danger' pill>
                          {String(user.enabled)}
                        </MDBBadge>
                      )}
                    </>
                  )}
                </td>
                <td>
                  {editMode ? (
                    <input
                      type='text'
                      name='authority'
                      value={user.authority}
                      onChange={(e) => handleInputChange(e, index)}
                      className='form-control'
                    />
                  ) : (
                    <>{user.authority}</>
                  )}
                </td>
                <td>
                  {editMode ? (
                    <MDBBtn color='link' rounded size='sm' onClick={handleEditClick}>
                      Save
                    </MDBBtn>
                  ) : (
                    <MDBBtn color='link' rounded size='sm' onClick={handleEditClick}>
                      Edit
                    </MDBBtn>
                  )}
                  <MDBBtn color='danger' rounded size='sm'>
                    Delete
                  </MDBBtn>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </DashboardCard>
    </>
  );
}

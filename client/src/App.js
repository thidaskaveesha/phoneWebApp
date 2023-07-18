import React, { useState, useEffect } from 'react';
import Axios from 'axios';
//import logo from './logo.svg';
import './App.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [phonebook, setPhoneBook] = useState([]);
  const [newPhone, setNewPhone] = useState('');

  const addNewNumber = (values) => {
    Axios.post('http://localhost:8080/add-phone', { name: values.name, phone: values.phone })
      .then(() => {
        getphonenumbers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatePhone = (id) => {
    console.log(id);
    if (newPhone === "") {
      alert("can't update enter update field");
    } else {
      Axios.put(`http://localhost:8080/update-phone/${id}`, { phone: newPhone })
        .then(() => {
          getphonenumbers();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const deletePhone = (id) => {
    console.log(id);
    Axios.delete(`http://localhost:8080/delete-phone/${id}`)
      .then(() => {
        getphonenumbers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getphonenumbers = () => {
    Axios.get('http://localhost:8080/get-phone')
      .then((res) => {
        setPhoneBook(res.data.data.PhoneNumbers);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  useEffect(() => {
    getphonenumbers();
  }, []);

  return (
    <Formik
      initialValues={{ name: '', phone: '', newPhone: '' }}
      validationSchema={Yup.object({
        name: Yup.string().required('Name is required'),
        phone: Yup.string().required('Phone number is required'),
      })}
      onSubmit={(values, { resetForm }) => {
        addNewNumber(values);
        resetForm();
      }}
    >
      {formik => (
        <div className='container'>
          <h1 className='title'>Your Phone Book</h1>
          <div className='form-container'>
            <Form>
              <table border="0">
                <tr>
                  <td>
                    <label htmlFor=''>Name :</label>
                  </td>
                  <td>
                    <Field type='text' name='name' placeholder='Enter contact name' />
                    <ErrorMessage name='name' component='div' className='error' />
                  </td>
                </tr>
                <br />
                <tr>
                  <td>
                    <label htmlFor=''>Phone Number :</label>
                  </td>
                  <td>
                    <Field type='text' name='phone' placeholder='Enter phone number' />
                    <ErrorMessage name='phone' component='div' className='error' />
                  </td>
                </tr>
                <br />
              </table>
              <button type='submit' className='addnewbtn'>
                Add New Number
              </button>
            </Form>
          </div>
          <h2 className='listtitle'>Phone List</h2>
          <div className='phone-container'>
            {phonebook.map((entry, index) => (
              <div key={index} className='phone'>
                <form>
                  <div className='entries'>
                    <h3>Name :<span> {entry.name}</span></h3>
                    <p>Phone :<span> {entry.phone}</span></p>
                  </div>
                  <input className='listintput' type="text" placeholder="update me" onChange={(e) => setNewPhone(e.target.value)} />
                  <br /><br />
                  <button className='update-btn' onClick={() => updatePhone(entry._id)}> Update </button>
                  <button className='delete-btn' onClick={() => deletePhone(entry._id)}> Delete </button>
                  <hr />
                </form>
              </div>
            ))}
          </div>
        </div>
      )}
    </Formik>
  );
}

export default App;

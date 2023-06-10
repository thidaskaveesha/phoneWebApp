import React, { useState , useEffect} from 'react';
import Axios from 'axios';
//import logo from './logo.svg';
import './App.css';

function App() {
  const[name,setName]= useState('');
  const[phone,setPhone] = useState('');
  const[phonebook,setPhoneBook] = useState([]);
  const[newPhone,setNewPhone] = useState('');

  const addNewNumber = ()=>{
    Axios.post('http://localhost:8080/add-phone',{name,phone})
    .then(()=>{
      
    })
    .catch((err)=>{
      console.log(err);
    })
  };

  const updatePhone = (id) => {
    console.log(id);
    if (newPhone===""){
        alert("can't update enter update field");
    }else{
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
  
  const getphonenumbers = ()=>{
    Axios.get('http://localhost:8080/get-phone')
    .then((res)=>{
        setPhoneBook(res.data.data.PhoneNumbers);
    })
    .catch((err)=>{
      console.log(err);
    })
  };

  useEffect(()=>{
    getphonenumbers();
  },[]);

  return(
    <div className='container'>
      <h1 className='title'>Your Phone Book</h1>
      <div className='form-container'>
        <form>
          <table border="0">
            <tr>
              <td>
                <label htmlFor=''>Name :</label>
              </td>
              <td>
                <input type='text' placeholder='Enter contact name' onChange={(e)=> setName(e.target.value)}/>
              </td>
            </tr>
            <br/>
            <tr>
              <td>
                <label htmlFor=''>Phone Number :</label>
              </td>
              <td>
                <input type='text' placeholder='Enter phone number' onChange={(e)=> setPhone(e.target.value)}/>
              </td>
            </tr>
            <br/>
          </table>
        <button className='addnewbtn' onClick={addNewNumber}>Add New Number</button>
        </form>
      </div>
      
      <h2 className='listtitle'>Phone List</h2>

      <div className='phone-container'>
        {phonebook.map((entry,index)=>(
          <div key={index} className='phone'>
              <form>
                <div className='entries'>
                  <h3>Name :<span> {entry.name}</span></h3>
                  <p>Phone :<span> {entry.phone}</span></p>
                </div>
                <input className='listintput' type="text" placeholder="update me" onChange={(e)=> setNewPhone(e.target.value)}/>
                <br/><br/>
                <button className='update-btn' onClick={()=>updatePhone(entry._id)}> Update </button>
                <button className='delete-btn' onClick={()=>deletePhone(entry._id)}> Delete </button>
                <hr/>
              </form>
          </div>
        ))}
      </div>
    </div>
  )

}

export default App;

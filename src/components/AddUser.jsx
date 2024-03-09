import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { API_URL } from '../App';
import { useNavigate } from 'react-router-dom';
function AddUser() {
  let navigate=useNavigate() 
  let [name,setName]=useState("")
  let [username,setUsername]=useState("")
  let [email,setEmail]=useState("")
  let [phone,setPhone]=useState("")
  const [address, setAddress] = useState({
    suite: '',
    street: '',
    city: '',
    zipcode: ''
  });
  const [company, setCompany] = useState({
    name: '',
    bs: '',
    catchPhrase: ''
  });
 
  const handleSubmit=async()=>{
    try {
      let res = await axios.post(API_URL,{
        name,
        username,
        email,
        phone,
        address,
        company
      })
      if(res.status===201)
      {
        alert('Blog Created Successfully')
        navigate('/dashboard')
      }
     } catch (error) {
        console.log(error)
     }
  
  }
  return <>
 <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div className="container-fluid" >
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 className="h3 mb-0 text-800 text-dark"><u>Add User:</u></h1>
       </div>
  <div className='container' >
  <Form>
   <h4 className="mb-3 text-dark">Personal Details :</h4>
      <Row className="mb-3">
      <Form.Group as={Col} >
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)}/>
        </Form.Group>
        <Form.Group as={Col} >
          <Form.Label>UserName</Form.Label>
          <Form.Control type="text" placeholder="UserName" onChange={(e)=>setUsername(e.target.value)}/>
        </Form.Group>
      </Row>
      <Row className="mb-2">
      <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
        </Form.Group>
     
      <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Mobile</Form.Label>
          <Form.Control type="email" placeholder="Mobile Number" onChange={(e)=>setPhone(e.target.value)}/>
        </Form.Group>
        </Row>

      <Row className="mb-1">
        <Form.Group as={Col} className="mb-3" >
        <Form.Label>Suite</Form.Label>
        <Form.Control placeholder="Apt. 556" onChange={(e) => setAddress({ ...address, suite: e.target.value })} />
      </Form.Group>
      <Form.Group as={Col} className="mb-3" >
        <Form.Label>Street</Form.Label>
        <Form.Control placeholder="Street"  onChange={(e) => setAddress({ ...address, street: e.target.value })}/>
      </Form.Group>
        </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control onChange={(e) => setAddress({ ...address, city: e.target.value })}/>
        </Form.Group>
        
        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control onChange={(e) => setAddress({ ...address, zipcode: e.target.value })}/>
        </Form.Group>
      </Row>

      <h5 className="mb-2 text-dark">Company Details :</h5>
      <Row className="mb-3">
      <Form.Group as={Col} >
          <Form.Label>Name</Form.Label>
          <Form.Control placeholder="Company Name"  onChange={(e) => setCompany({ ...company, name: e.target.value })}/>
        </Form.Group>
      </Row>
      <Row className="mb-3">
      <Form.Group as={Col} >
          <Form.Control placeholder="Company BS"  onChange={(e) => setCompany({ ...company, bs: e.target.value })}/>
        </Form.Group>
        <Form.Group as={Col} >
          <Form.Control placeholder="catchPhrase " onChange={(e) => setCompany({ ...company, catchPhrase: e.target.value })} />
        </Form.Group>
      </Row>
      <Button variant="primary" type="submit"  onClick={()=>handleSubmit()}> Submit</Button>
    </Form>
  </div>
    </div>
    </div>
    </div>
  </>
}

export default AddUser
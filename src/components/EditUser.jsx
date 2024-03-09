import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { API_URL } from '../App';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';

function EditUser() {
  const navigate = useNavigate();
  const parms = useParams();
  const [blogs, setBlogs] = useState([]);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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
  const [dataFetched, setDataFetched] = useState(false); // New state to track data fetching

  useEffect(() => {
    if (!dataFetched) { // Check if data is already fetched
      const getBlogs = async () => {
        try {
          let res = await axios.get(`${API_URL}/${parms.id}`);
          setBlogs(res.data);
          setDataFetched(true); // Set dataFetched to true after fetching data
        } catch (error) {
          console.log(error);
        }
      };
      getBlogs();
    }
  }, [parms.id, dataFetched]);

  useEffect(() => {
    if (blogs.name) setName(blogs.name);
    if (blogs.username) setUsername(blogs.username);
    if (blogs.email) setEmail(blogs.email);
    if (blogs.phone) setPhone(blogs.phone);

    if (blogs.address) {
      const { suite, street, city, zipcode } = blogs.address;
      setAddress(prevAddress => ({
        ...prevAddress,
        suite,
        street,
        city,
        zipcode
      }));
    }

    if (blogs.company) {
      const { name, bs, catchPhrase } = blogs.company;
      setCompany(prevCompany => ({
        ...prevCompany,
        name,
        bs,
        catchPhrase
      }));
    }
  }, [blogs]);

  const handleupdate = async () => {
    try {
      let data = { address, company, name, username, email, phone };
      let res = await axios.put(`${API_URL}/${parms.id}`, data);
      if (res.status === 200) {
        console.log(res);
        alert('updated');
        setBlogs(res.data);
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-800 text-dark"><u>Edit User:</u></h1>
            </div>
            <div className='container'>
              <Form>
                <h4 className="mb-3 text-dark">Personal Details:</h4>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>UserName</Form.Label>
                    <Form.Control type="text" placeholder="UserName" value={username} onChange={(e) => setUsername(e.target.value)} />
                  </Form.Group>
                </Row>
                <Row className="mb-2">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control type="text" placeholder="Mobile Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </Form.Group>
                </Row>
                <Row className="mb-1">
                  <Form.Group as={Col} className="mb-3" >
                    <Form.Label>Suite</Form.Label>
                    <Form.Control placeholder="Apt. 556" value={address && address.suite} onChange={(e) => setAddress({ ...address, suite: e.target.value })} />
                  </Form.Group>
                  <Form.Group as={Col} className="mb-3" >
                    <Form.Label>Street</Form.Label>
                    <Form.Control placeholder="Street" value={address && address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control value={address && address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control value={address && address.zipcode} onChange={(e) => setAddress({ ...address, zipcode: e.target.value })} />
                  </Form.Group>
                </Row>
                <h5 className="mb-2 text-dark">Company Details :</h5>
                <Row className="mb-3">
                  <Form.Group as={Col} >
                    <Form.Label>Name</Form.Label>
                    <Form.Control value={company && company.name} placeholder="Company Name" onChange={(e) => setCompany({ ...company, name: e.target.value })} />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} >
                    <Form.Control placeholder="Company BS" value={company&& company.catchPhrase} onChange={(e) => setCompany({ ...company, catchPhrase: e.target.value })} />
                  </Form.Group>
                  <Form.Group as={Col} >
                    <Form.Control value={company && company.bs} placeholder="catchPhrase " onChange={(e) => setCompany({ ...company, bs: e.target.value })} />
                  </Form.Group>
                </Row>
                <Button variant="primary" type="button" onClick={handleupdate}>Submit</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditUser;

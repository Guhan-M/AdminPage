import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import { API_URL } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ViewUser() {
    const parms = useParams();
    const [blogs, setBlogs] = useState([]);

 const [dataFetched, setDataFetched] = useState(false); 
  useEffect(() => {
    if (!dataFetched) { // Check if data is already fetched
      const getBlogs = async () => {
        try {
          let res = await axios.get(`${API_URL}/${parms.id}`);
          console.log(res.data);
          setBlogs(res.data);
          setDataFetched(true); // Set dataFetched to true after fetching data
        } catch (error) {
          console.log(error);
        }
      };
      getBlogs();
    }
  }, [parms.id, dataFetched]);

  return <>
  <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h4 mt-5 text-800 text-dark">View all the details:</h1>
            </div>
            <div className='slitedgroup' style={{width:"max-content"}}>

   <ListGroup className='text-dark listedgroup  .d-none .d-sm-block' style={{marginBottom:"10%",display:"flex", flexWrap:"wrap", flexDirection:"column"}}>
     <ListGroup.Item className='listedgroup'><span style={{fontWeight:"bold"}}>Name:</span> {blogs.name}</ListGroup.Item>
     <ListGroup.Item className='listedgroup'><span style={{fontWeight:"bold"}}>UserName:</span> {blogs.username}</ListGroup.Item>
     <ListGroup.Item className='listedgroup'><span style={{fontWeight:"bold"}}>Phone:</span> {blogs.phone}</ListGroup.Item>
     <ListGroup.Item className='listedgroup'><span style={{fontWeight:"bold"}}>Website:</span> {blogs.website}</ListGroup.Item>

     <h4 className='mt-3 mb-3'>Address :</h4>
     <ListGroup.Item><span style={{fontWeight:"bold"}}> Suite:</span> {blogs.address && blogs.address.suite}</ListGroup.Item>
     <ListGroup.Item><span style={{fontWeight:"bold"}}> Street:</span> {blogs.address && blogs.address.street}</ListGroup.Item>
     <ListGroup.Item><span style={{fontWeight:"bold"}}> Zipcode:</span> {blogs.address && blogs.address.zipcode}</ListGroup.Item>
   
     <h4 className='mt-3 mb-3'>Company :</h4>
     <ListGroup.Item><span style={{fontWeight:"bold"}}> name:</span> {blogs.company && blogs.company.name}</ListGroup.Item>
     <ListGroup.Item><span style={{fontWeight:"bold"}}> catchPhrase:</span> {blogs.company && blogs.company.catchPhrase}</ListGroup.Item>
     <ListGroup.Item><span style={{fontWeight:"bold"}}> BS:</span> {blogs.company && blogs.company.bs}</ListGroup.Item>
      </ListGroup>
     </div>
        </div>
    </div>
    </div>
  </>
}

export default ViewUser
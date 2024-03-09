import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { API_URL } from '../App';
import { useNavigate } from 'react-router-dom';
function Dashboard() {

  const navigate=useNavigate()
  let [blogs,setBlogs]=useState([])

  const getBlogs=async()=>{
  try{
    let res=await axios.get(API_URL)
    setBlogs(res.data)
  }
  catch(error){
    console.log(error)
  }
}

useEffect(()=>{
  getBlogs()
},[])


const handleDelete=async(blog)=>{

  console.log(blog)
  try{
    let res= await axios.delete (`${API_URL}/${blog}`)
    if(res.status===200){
      getBlogs()
    }
  }
  catch(error){
    console.log(error)
  }
}

  return <>
  <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div className="container-fluid" >
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mt-4 text-800 " style={{color:"DodgerBlue"}}>Dashboard</h1>
            </div>
            <div className="container table-responsive sm" >
            <Table  bordered  style={{ borderRadius:"10px",  boxShadow:"  0 8px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19)"}}>
                    <thead className='font-weight-bold bg-primary'>
                        <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='font-weight-normal ' style={{overflowX:"hidden",whiteSpace:"nowrap"}} >
                        {
                              blogs.map((e,i)=>{
                                return <tr key={e.id}>
                                    <td>{i+1}</td>
                                    <td>{e.name}</td>
                                    <td>{e.username}</td>
                                    <td>{e.email}</td>
                                    <td>{e.phone}</td>
                                    <td>
                                        <Button variant='info' onClick={()=>navigate(`/edit-user/${e.id}`)}>Edit</Button>
                                        &nbsp;
                                        <Button variant='info' onClick={()=>navigate(`/view-user/${e.id}`)}>View</Button>
                                        &nbsp;
                                        <Button variant='danger' onClick={()=>handleDelete(e.id)}>Delete</Button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
                </div>
            </div>
          </div>
          </div>
  </>
}

export default Dashboard
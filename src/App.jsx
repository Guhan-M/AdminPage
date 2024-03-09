import React from "react"
import Dashboard from "./components/Dashboard.jsx"
import Sidebar from "./components/SideBar.jsx"
import AddUser from "./components/AddUser"
import ViewUser from "./components/ViewUser.jsx"
import EditUser from "./components/EditUser"
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
export const API_URL="https://65e8b8914bb72f0a9c5039ac.mockapi.io/Admin"
function App() {
  return <>
  <BrowserRouter>
  <div id="wrapper">
      <Sidebar/>
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/add-user" element={<AddUser />}/>
        <Route path="/edit-user/:id" element={<EditUser/> }/>
        <Route path="/view-user/:id" element={<ViewUser/> }/>
        <Route path="*" element={<Navigate to='/dashboard'/>}/>
      </Routes>
  </div>
  </BrowserRouter>
  </>
}
export default App
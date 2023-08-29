import React from 'react'
import EmployeeTable from "./EmployeeTable"
import { useNavigate } from 'react-router-dom';

function Dashboard() {

  const navigate = useNavigate()
  const username = sessionStorage.getItem("username");

  const handleLogout = () => {
    sessionStorage.removeItem("auth-token");
    navigate("/")
  }


  return (
    <div>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: 'space-between', margin: "20px 0" }}>
        <h3 style={{ margin: "auto" }}>Dashboard</h3>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: 'space-between',width:'15%'}}>
          <h5>{username}</h5>
          <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
        </div>
        </div>
        <EmployeeTable></EmployeeTable>
    </div>
  )
}

export default Dashboard
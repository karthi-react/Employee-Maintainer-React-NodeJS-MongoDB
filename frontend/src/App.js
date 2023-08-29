import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import { Navigate } from 'react-router-dom';
import Login from "./Components/Login";
import Register from "./Components/Register"
import Dashboard from './Components/Dashboard';
import EmployeeForm from './Components/EmployeeForm';
import PageNotFound from './Components/PageNotFound';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  

  const AuthGuard = ({ children }) => {

    const location = useLocation();
  
    const isAuthenticated = sessionStorage.getItem("auth-token");
  
    const unauthenticatedRoutes = ["/"];
  
    if (!isAuthenticated && unauthenticatedRoutes.includes(location.pathname)) {
  
      return children;
  
    }
  
    if (!isAuthenticated && !unauthenticatedRoutes.includes(location.pathname)) {

  
      return <Navigate to="/" />;
  
    }
  
    if (isAuthenticated && !unauthenticatedRoutes.includes(location.pathname)) {
  
      return children;
  
    }
  
    return <Navigate to="/" />;
  
  };


  return (
    <div className='container'>
      <ToastContainer />
      <Routes>

           <Route path="*" element={<PageNotFound />} />
          <Route exact path="/" element={<AuthGuard><Login  /></AuthGuard>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/dashboard" element={<AuthGuard><Dashboard/></AuthGuard>}/>
          <Route exact path="/employeereg" element={<AuthGuard><EmployeeForm/></AuthGuard>}/>

      </Routes>
     
    </div>
  );
}

export default App;

import React, {useContext} from 'react'
import "../styles/header.scss";
import {Link} from "react-router-dom"
import { Context, server } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';

const Header = () => {
  const {isAuthenticated, setIsAuthenticated,loading, setLoading} = useContext(Context)
  console.log(isAuthenticated)

  const logoutHandler = async () => {
    setLoading(true)
    try {
      await axios.get(`${server}/users/logout`,
        {
          withCredentials: true,
        }
      );
      toast.success("Logged Out Successfully");
      setLoading(false);
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response.message);
      console.log(error);
      setIsAuthenticated(true);
      setLoading(false);
    }

  };

  return (
    <nav className="header">
      <div>
        <h2>Task Management System</h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>

        {isAuthenticated ? <button disabled={loading} onClick={logoutHandler} className="btn">Logout</button>
         : <Link to={"/login"}>Login</Link>}
        
      </article>
    </nav>
  )
};

export default Header

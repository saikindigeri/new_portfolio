
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; 

const Header = () => {
const navigate=useNavigate()

  const handleLogout=()=>{
    localStorage.removeItem('token')
    navigate("/login")
    console.log('token removed')
  }
  return (
    <header className="header">
      <div className="containerr">

        
       <Link to="/"> <h1 className="logo">MyBlog</h1></Link>
        <nav>
          <ul className="nav-list">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/blogs" className="nav-link">Blogs</Link></li>
            <li><Link to="/create" className="nav-link">Create</Link></li> 
            <li><Link to="/login"  onClick={handleLogout} className='nav-link'>Logout</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

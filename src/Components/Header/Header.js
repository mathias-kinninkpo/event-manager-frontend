import { NavLink } from 'react-router-dom';
import './Header.css';
import { useEffect, useState } from 'react';
import uac from '../../Assets/uac.png'
import { Navbar, Nav } from 'react-bootstrap';

// import { motion } from 'framer-motion';

const Header = () => {

  const [connexion, setConnexion] = useState(false);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('token'))){
      setConnexion(true);
    }
    else {
      setConnexion(false);
    }
  },[connexion]);

  const handleConnexion = () => {
    localStorage.removeItem('token');
  }
  return (
   <nav className='my-nav'>
      <Navbar expand="lg" className='header w-100 color-red'>
      <Navbar.Brand href="#">
        <img src={uac} alt="-uac" style={{ width: '50px', height: '50px', margin:'0px 0px 0px 30px' }} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" className=''/>
      <Navbar.Collapse id="navbar-nav">
        <Nav className="m-auto d-flexjustify-content-center align-items-space-between w-200">
          <Nav.Link href="/"><span className='nav-item'>Accueil</span></Nav.Link>
          <Nav.Link href="/inscription"><span className='nav-item'>Inscription</span></Nav.Link>
          <Nav.Link href="/modifier-inscription" className='mr-5'><span className='nav-item'>Modifier l'inscription</span></Nav.Link>
          {connexion && <Nav.Link href="/" onClick={handleConnexion}><span className='nav-item'>SE deconecter</span></Nav.Link>}
        </Nav>
      </Navbar.Collapse>
      </Navbar>
   </nav>
    
  );
};

export default Header;

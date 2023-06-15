import { useEffect, useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils';




const AdminAuth = () => {
    const navigate = useNavigate()
  
    const [email, setEmail] = useState('');
    const [erreur, setErreur] = useState(null);
    const [password, setPassword] = useState('')

    useEffect(() =>{
      const token = localStorage.getItem('token');
      if (token){
        navigate('/inscrits')
      }
    })
  
  
    const handleAdminAuth = () => {
    
      
      
        fetch(`${BASE_URL}api/login/`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then(response => {
        if (response.ok) {
            navigate('/inscrits')
            localStorage.setItem('token', 'true');
        } else {
            throw new Error('Erreur de connexion');
        }
        })
        .then(data => {
        const token = data.token;

        })
        .catch(error => {
            setErreur(error.message)
        });
        
    };
  
    return (
      <Container className='inscription-container' style={{margin:'12%  auto 9% auto '}}>
        <h4>Authentification Admin</h4>
        <Form className='inscription-form'>
           {erreur && <Alert variant="danger">{erreur}</Alert>}
          <Form.Group controlId="formEmail" className='form-item' style={{margin:'4% auto'}}>
            <Form.Label>le nom d'utilisateur<span style={{color:'red'}}>*</span></Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail" className='form-item' style={{margin:'4% auto'}}>
            <Form.Label>Mot de passe<span style={{color:'red'}}>*</span></Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          
          <Button variant="primary" onClick={handleAdminAuth} className='buton'>
            Se connecter
          </Button>
        </Form>
      </Container>
    );
  };
  
  export default AdminAuth;
  
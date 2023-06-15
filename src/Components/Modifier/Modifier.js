import { useEffect, useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../Inscription/Inscription.css'
import axios from 'axios';
import { BASE_URL } from '../utils';



const Modifier = () => {

  useEffect(() => {
    fetchPersons()
  },[])
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [erreur, setErreur] = useState(null);
  const [send, setSend] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [persons, setPersons] = useState([]);

  const fetchPersons = async () => {
    try {
      const response = await fetch(BASE_URL + 'api/persons/');

      if (response.ok) {
        const data = await response.json();
        setPersons(data);
      } else {
        console.error('Erreur lors de la récupération des personnes inscrites');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des personnes inscrites');
    }
  };
  

  const sendModificationEmail = async (email) => {
    axios
      .get(BASE_URL + 'api/send-code/', {
        params: {
          email: email,
        },
      })
      .then(response => {
        localStorage.setItem('code', JSON.stringify(response.data))
        setSend(true);
        setErreur(null);
      })
      .catch(error => {
        setErreur('Erreur lors de la récupération de la personne');
        setSend(false);
        console.log(error)
      });
  };
  
 

  const handleModifier = () => {
    if(email) {
      if (persons){
        const personneExistante = persons.find((personne) => personne.email === email);
        if(personneExistante) {
          sendModificationEmail(email);
        }
        else{
          setErreur('email non reconnu ou erreur de connexion')
        }
      }
    }
    
    
  };

  const handleVerify = (verificationCode) => {
    if (JSON.parse(localStorage.getItem('code')).code === verificationCode){
      const personneExistante = persons.find((personne) => personne.email === email);
      if (personneExistante){
        localStorage.setItem('person', JSON.stringify(personneExistante));
      }
      navigate('/modification-form/' + email)
    }
    else{
      setErreur('code invalid')
    }
  }



  // const handleVerifyEmail = () => {
  //   fetch('http://localhost:8000/api/rest-auth/registration/verify-code/', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       key: verificationCode,
  //     }),
  //   })
  //     .then(response => {
  //       if (response.ok) {
  //         console.log('E-mail vérifié avec succès');
  //         navigate('/modification-form/')
  //       } else {
  //         throw new Error('Erreur lors de la vérification de l\'e-mail');
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Erreur lors de la vérification de l\'e-mail:', error);
  //     });
  // };


  return (
    <>
    {!send ?
      <Container className='inscription-container' style={{margin:'12%  auto 350px auto '}}>
        <h4>Envoyer votre email</h4>
        <Form className='inscription-form'>
        {erreur && <Alert variant="danger">{erreur}</Alert>}
          <Form.Group controlId="formEmail" className='form-item' style={{margin:'5% auto'}}>
            <Form.Label>E-mail<span style={{color:'red'}}>*</span></Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="success" onClick={(e) => handleModifier()} className='buton'>
            Envoyer 
          </Button>
        </Form>
      </Container>
      :

      <Container className='inscription-container' style={{margin:'12%  auto 13% auto '}}>
        <h4>Entrez le code à 8 caracteres</h4>
        <Form className='inscription-form'>
        {erreur && <Alert variant="danger">{erreur}</Alert>}
          <Form.Group controlId="formEmail" className='form-item' style={{margin:'5% auto'}}>
            <Form.Label>Code<span style={{color:'red'}}>*</span></Form.Label>
            <Form.Control
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="success" onClick={() => handleVerify(verificationCode)} className='buton'>
            Envoyer 
          </Button>
        </Form>
      </Container>
    }
    </>
  );
};

export default Modifier;

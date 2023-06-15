import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './Inscription.css'
import { BASE_URL } from '../utils';




const Inscription = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [genre, setGenre] = useState('');
  const [ville, setVille] = useState('');
  const [antecedent, setAntecedent] = useState('');
  const [attente, setAttente] = useState('');
  const [error, setError] = useState('');
  const [persons, setPersons] = useState([]);
  const [success, setSuccess] = useState(false);
  const [successtext, setSuccesstext] = useState('')
  
  
      const registerUser = async (userData) => {
      try {
        const response = await fetch(BASE_URL + 'api/persons/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
          
        });
        if (!response.ok) {
          const errorData = await response.json();
          console.log(errorData.message)
          setError("Il semble que l'email entré existe déjà")
          throw new Error(errorData.message);
        }else{
          setSuccess(true);
        }
      } catch (error) {
        console.log(error.message)
        setError("Il semble que l'email entré existe déjà")
        return error.message;

      }
    };


 
  const fetchPersons = async () => {
    try {
      const response = await fetch(BASE_URL + 'api/persons/');

      if (response.ok) {
        const data = await response.json();
        setPersons(data);
      } else {
        console.error('Erreur lors de la récupération des personnes inscrites');
        setError("Erreur lors de la récupération des personnes inscrites");
      }
    } catch (error) {
      setError('Erreur lors de la récupération des personnes inscrites');
      console.error('Erreur lors de la récupération des personnes inscrites');
    }
  };



  const navigate = useNavigate()
  useEffect(() =>{
    setError('')
    setSuccess(success)
  }, [success])


  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
        nom: nom,
        prenom: prenom,
        email: email,
        genre: genre,
        ville: ville,
        entecedant_familiale_cancer: antecedent,
        attente:attente
    }
    if(data.prenom != '' && data.nom != '' && data.email !='' && data.genre != '' && data.ville != '' && data.entecedant_familiale_cancer != '' && data.attente != ''){


      try {

            fetchPersons()
            if (persons){
              const personneExistante = persons.find((personne) => personne.email === data.email);
              if(personneExistante) {
                setError('Cet email exists déjà')
                return
              }
              else{
                setSuccess(true)
                navigate('/inscription')
              }
              if(success){
                registerUser(data)
                console.log(success)
                if (success){
                  toast.success("l'inscription effectuée avec succès");
                  setSuccesstext("Votre inscription a été prise en compte")
                  setNom('');
                  setPrenom('');
                  setEmail('');
                  setGenre('');
                  setVille('');
                  setAntecedent('');
                  setAttente('');
                  setError('');
        
                  const redirectTimeout = setTimeout(() => {
                    navigate('/');
                  }, 15000);
                
                  return () => clearTimeout(redirectTimeout);
                }
              }
            }
          
         
        
        }
        catch (error) {
          console.error(error);
        }
    }
        
  }

  return (
    <Container className='inscription-container'>
      <h1>Inscription</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {successtext && <Alert variant="success">{successtext}</Alert>}
      <Form onSubmit={handleSubmit} className='inscription-form'>
        <Form.Group controlId="formNom" className='form-item'>
          <Form.Label>Nom<span style={{color:'red'}}>*</span></Form.Label>
          <Form.Control type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="formPrenom"  className='form-item'>
          <Form.Label>Prénom<span style={{color:'red'}}>*</span></Form.Label>
          <Form.Control type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="formEmail"  className='form-item'>
          <Form.Label>Email<span style={{color:'red'}}>*</span></Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="formGenre"  className='form-item'>
          <Form.Label>Genre</Form.Label>
          <Form.Control as="select" value={genre} onChange={(e) => setGenre(e.target.value)} required>
            <option value="">Sélectionner</option>
            <option value="masculin">Homme</option>
            <option value="feminin">Femme</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formVille"  className='form-item'>
          <Form.Label>Ville habitée<span style={{color:'red'}}>*</span></Form.Label>
          <Form.Control type="text" value={ville} onChange={(e) => setVille(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="formAntecedent" className='form-item'>
          <Form.Label>Antécédent familial de cancer<span style={{color:'red'}}>*</span></Form.Label>
          <Form.Control as="textarea" rows={3} value={antecedent} onChange={(e) => setAntecedent(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="formAttente" className='form-item'>
          <Form.Label>Attente du Symposium<span style={{color:'red'}}>*</span></Form.Label>
          <Form.Control as="textarea" rows={3} value={attente} onChange={(e) => setAttente(e.target.value)} required />
        </Form.Group>
       
          <Button variant="success" type="submit" className="buton" onClick={handleSubmit}>S'inscrire</Button>
          <ToastContainer />
      </Form>
    </Container>
  );
};

export default Inscription;

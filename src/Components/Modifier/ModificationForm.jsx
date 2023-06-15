import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useParams } from 'react-router-dom';
import '../Inscription/Inscription.css'
import { BASE_URL } from '../utils';





const ModificationForm = () => {
 


  const updateUser = async (userId, updatedUserData) => {
    try {
      const response = await fetch(`${BASE_URL}api/persons/${userId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setSuccess(false)
        
        console.log(errorData.message);
        throw new Error(errorData.message);
      }
      else{
        setSuccess(true)
      }
    } catch (error) {
      console.log(error.message);
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
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des personnes inscrites');
    }
  };

  // const handleGetPerson = () => {
  //   axios
  //     .get('http://localhost:8000/api/persons/', {
  //       params: {
  //         code: JSON.parse(localStorage.getItem('code')).code,
  //       },
  //     })
  //     .then(response => {
  //       setPerson(response.data[0]);
  //       setError(null);
  //       console.log(response.data[0]);
  //     })
  //     .catch(error => {
  //       setError('Erreur lors de la récupération de la personne');
  //       setPerson(null);
  //       console.log(error)
  //     });
  // };


  useEffect(() => {
    // handleGetPerson()
    // // setPers(person);
    // setNom(person.nom);
    // setPrenom(person.prenom);
    // setEmail(person.email);
    // setGenre(person.genre);
    // setVille(person.ville);
    // setAntecedent(person.antecedent);
    // setAttente(person.attente);
  }, []);
    const d = JSON.parse(localStorage.getItem('person'))
    const { mail } = useParams();
    const [nom, setNom] = useState(d.nom);
    const [prenom, setPrenom] = useState(d.prenom);
    const [email, setEmail] = useState(d.email);
    const [genre, setGenre] = useState(d.genre);
    const [ville, setVille] = useState(d.ville);
    const [antecedent, setAntecedent] = useState(d.entecedant_familiale_cancer);
    const [attente, setAttente] = useState(d.attente);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [persons, setPersons] = useState([]);
    const [success, setSuccess] = useState(false);
    const [successtext, setSuccesstext] = useState('')
  
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
      if(d.id && data){
        try {

          fetchPersons()
          if (persons || success){
            const personneExistante = persons.find((personne) => personne.email === email);
            if(email !== mail) {
              setError('Vous ne pouvez pas changer votre email')
            }
            else{
              updateUser(d.id, data)
              toast.success("l'inscription modifier avec succès");
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
      catch (error) {
        console.error(error);
      }
  
      }
    };

    
  
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
            <Form.Label>Ville habitée</Form.Label>
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
         
            <Button variant="success" type="submit" className="buton">Modifier</Button>
            <ToastContainer />
        </Form>
      </Container>
    );
  };
  
  export default ModificationForm;
  
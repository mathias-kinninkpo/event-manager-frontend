import React, { useState, useEffect } from 'react';
import { Table, Button , Container, Modal} from 'react-bootstrap';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import './Admin.css'
import { BASE_URL } from '../utils';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const exportToExcel = (fileName, apiData) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    console.log(apiData);
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return exportToCSV(apiData, fileName)
};



const AdminPage = () => {
  const [persons, setPersons] = useState([]);
  const [id, setId] = useState(0);
  const [show, setShow] = useState(false);
  const navigate = useNavigate()
  const handleClose = () => {
    setShow(false)
  };
  const handleShow = (id) => {
    setShow(true)
    setId(id)
  };




  const deleteUser = (userId) => {
    console.log('deleteUser : ' + userId)
    axios.delete(BASE_URL + `api/persons/${userId}`)
      .then(response => {
        // La suppression a réussi
        console.log(response.data);
        // Faire quelque chose après la suppression, par exemple mettre à jour l'état des utilisateurs
        setShow(false);
        toast.success("la suppression effectuée avec succès");
        const redirectTimeout = setTimeout(() => {
          navigate('/admin');
        }, 5000);
      
        return () => clearTimeout(redirectTimeout);
      })
      .catch(error => {
        // Une erreur s'est produite lors de la suppression
        console.error(error);
        // Faire quelque chose pour gérer l'erreur, par exemple afficher un message d'erreur à l'utilisateur
      });
  }
  

  useEffect(() => {
    fetchPersons();
  }, []);


 

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
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation de suppression</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="alert alert-danger">
                    Vous êtes sûr de vouloir supprimer cet element ?
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Annuler
                </Button>
                <Button variant="danger" onClick={() => deleteUser(id)}>
                    Supprimer
                </Button>
            </Modal.Footer>
      </Modal>
      
      {persons.length > 0 ? (
        <Container style={{margin:'50px auto 250px auto', width:'100%'}}>
        <h2>Liste des personnes inscrites</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Genre</th>
              <th>Ville habitée</th>
              <th>Antécédent familial de cancer</th>
              <th>Attente du Symposium</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {persons.map((person) => (
              <tr key={person.id}>
                <td>{person.nom}</td>
                <td>{person.prenom}</td>
                <td>{person.email}</td>
                <td>{person.genre}</td>
                <td>{person.ville}</td>
                <td>{person.entecedant_familiale_cancer}</td>
                <td>{person.attente}</td>
                <td><Button variant='danger' onClick={() => handleShow(person.id)}>Supprimer</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant = "success"  className='buton' onClick={() => exportToExcel('liste-inscrites', persons)}>Exporter en xlsx</Button>
        <ToastContainer />
        </Container>
      ) : (
        <p>Aucune personne inscrite.</p>
      )}
    </div>
  );
};

export default AdminPage;

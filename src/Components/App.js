import Accueil from "./Accueil/Accueil";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { About } from "./Accueil/Accueil";
import Header from "./Header/Header";
import Inscription from "./Inscription/Inscription";
import Modifier from "./Modifier/Modifier";
import ModificationForm from "./Modifier/ModificationForm";
import AdminPage from "./Admin/Inscrits";
import AdminAuth from "./Admin/AdminAuth";
import Footer from "./Footer/Footer";

function App() {
  
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path={"/"} element = {<Accueil />} />
          <Route path="/admin" element = {<AdminAuth />} />
          <Route path="/inscription" element = {<Inscription/>} />
          <Route path='/modification-form/:mail' element = {<ModificationForm />} />
          <Route path='/modifier-inscription' element = {<Modifier />} />
          <Route path='/inscrits' element = {<AdminPage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;

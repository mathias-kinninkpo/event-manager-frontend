import SponsorImage from '../../Assets/sponsor.jpg'
import image1 from '../../Assets/img1.png';
import image2 from '../../Assets/img2.png';
import image3 from '../../Assets/img3.png';

import './Accueil.css'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

export const About = () => {
    return (
        <>
        <div className='about'>
        <h1 style={{textAlign : 'center', margin:'30px 0px'}}>
            A Propos de l'evenement
        </h1>
            <div className='about-container'>
                    <div className='about-item'>
                        <p>
                        <h1>Motivation</h1>
                        Symposium sur les biomarqueurs
                        moléculaires des cancers et contribution au
                        développement des méthodes moléculaires pour les 4P du cancer.
                        4P = Pré-dépistage - Prévention-Personnalisation de la thérapie -Pronostic
                        </p>
                        <img src={image1}/>

                    </div>
                    <div className='about-item'>
                        <img src={image2}/>
                        <p>
                            <h1>Introduction</h1> Le cancer est un problème de santé publique
                            mondial majeur avec une inégalité dans la répartition des
                            médicaments disponibles pour les traitements ciblés
                            personnalisés. La détermination scientifique des
                            biomarqueurs moléculaires oriente plus efficacement la
                            thérapie ciblée personnalisée qui sauve les vies. Mais cette
                            possibilité est limitée en Afrique.
                        </p>
                    </div>
                    <div className='about-item'>
                        <p>
                            <h1>Objectif</h1> Maximiser la collaboration entre les
                            Scientifiques, Médecins et phytothérapeutes endogènes et
                            internationaux qui interviennent dans le domaine de la
                            recherche sur les cancers pour échanger des idées et
                            mettre au point une collaboration bénéfique pour les
                            traitements ciblés personnalisés des cancers au Bénin
                            afin de réduire la mortalité souvent liée à l’inadéquation
                            des traitements disponibles pour inhiber le mécanisme
                            moléculaire initiateur de chaque cancer.
                        </p>
                        <img src={image3}/>
                        
                    </div>
                </div>
        </div>

    </> 
    )
}

export default function Accueil(){

    const [days, setDays] = useState('')
    const [hours, setHours] = useState('')
    const [minutes, setMinutes] = useState('')
    const [seconds, setSeconds] = useState('')
    const eventDate = new Date('2023-06-26T08:00:00Z');

    // Mettre à jour le compte à rebours chaque seconde
    setInterval( () =>{
        const currentDate = new Date();

    // Calculer la différence entre la date actuelle et l'événement
        const diff = eventDate - currentDate;

        // Calculer les jours, heures, minutes et secondes restants
        let days = Math.floor(diff / (1000 * 60 * 60 * 24));
        let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setDays(days)
        setHours(hours)
        setMinutes(minutes)
        setSeconds(seconds)
    }, 1000);

    return (
        <>
        <div className='background-image'>
            <div className = "accueil">
                <h1 className='accueil-label'>2ème Symposium sur la recherche moléculaire pour lutter contre les cancers: <br />Etats des lieux Afrique Amerique</h1>
                <div style={{color: '#fff', padding:'30px', fontSize:'25px', textAlign:'center'}}>
               <h1>Frais de Participation</h1>
               <span style={{color:'red'}}>*</span> Personnel enseignant, technique, administratif des UPB et EPES: <b>5000F</b> <span style={{color:'red'}}>*</span><br />
               <span style={{color:'red'}}>*</span>Etudiants: <b>2000F </b> <span style={{color:'red'}}>*</span><br />
                Donnant droit à un prélèvement de prédiagnostic <br />
                Payement direct sur site <br />
                Pour vos dons pour la recherche sur le cancer, n'hésitez pas à nous faire un chèque <br />
                <span style={{color:'red'}}>*</span>Exposition en stands: <b>3000f</b><span style={{color:'red'}}>*</span>
                </div>
                <div className="countdown">
                    <div className="countdown-item">
                        <span className="countdown-value">{days}</span>
                        <span className="countdown-label">Jours</span>
                    </div>
                    <div className="countdown-item">
                        <span className="countdown-value">{hours}</span>
                        <span className="countdown-label">Heures</span>
                    </div>
                    <div className="countdown-item">
                        <span className="countdown-value">{minutes}</span>
                        <span className="countdown-label">Minutes</span>
                    </div>
                    <div className="countdown-item">
                        <span className="countdown-value">{seconds}</span>
                        <span className="countdown-label">Secondes</span>
                    </div>
                </div>
                <NavLink to={'/inscription'}><button>S'INSCRIRE</button></NavLink>
            </div>
        </div>
        
        <div className='newlester'>
        {/* <Sponsors /> */}
        {/* <h1>Rester en contact avec nous</h1>
            <div className='newlester-container'>
                <h4>Ne manquez pas nos mis à jour</h4>
                <form>
                    <input type="text" placeholder='Entrer votre email'/>
                    <input type="submit" value="S'abonner" />
                </form>

            </div> */}
        <About />
        </div>
        </>
    )
}
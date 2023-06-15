import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './Sponsors.css'
import ifri from '../../Assets/ifri.png'
import epac from '../../Assets/epac.png'
import fash from '../../Assets/fash.png'
import ine from '../../Assets/ine.png'
import uac from '../../Assets/uac.png'

const Item = ({image}) => {
  return(
  <div className="carousel-item">
      <img src={image} alt="Sponsor 1" />
  </div>
  )
}


const Sponsors = () => {

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };


  return (
    <div className="sponsors-container">
      <h1>Nos Sponsors</h1>
      <div className='background-image-sponsor'>
        <Carousel 
              swipeable={false}
              draggable={false}
              showDots={false}
              responsive={responsive}
              // ssr={true} // means to render carousel on server-side.
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={3000}
              keyBoardControl={true}
              className='carousel'
          >
          <Item image={ifri} alt="Sponsor 1"/>
          <Item image={uac} alt="Sponsor 2" />
          <Item image={epac} alt="Sponsor 3" />
          <Item image={fash} alt="Sponsor 4" />
          <Item image={ine} alt="Sponsor 3" />
        </Carousel>
      </div>
    </div>
  );
}

export default Sponsors;

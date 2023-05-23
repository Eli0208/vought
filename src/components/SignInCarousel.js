import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import React from 'react'
import seven from '../assets/the_seven.jpg'
import hl from '../assets/homelander.jpg'
import sl from '../assets/starlight.jpg'
import qm from '../assets/qmaeve.jpg'
import bn from '../assets/blacknoir.jpg'
import sf from '../assets/stormfront.jpg'
import tr from '../assets/atrain.jpg'
import dp from '../assets/deep.jpg'

export default function SignInCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={seven}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={hl}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={sl}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={qm}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={bn}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={sf}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={tr}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={dp}
          alt="First slide"
        />
      </Carousel.Item>
    </Carousel>
  )
}

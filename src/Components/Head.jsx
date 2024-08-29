import React from 'react'
import { Container,Navbar } from 'react-bootstrap'
import {Link} from 'react-router-dom'
function Head() {
  return (
   <>
      <Navbar className="bg-info">
        <Container>
          <Navbar.Brand href="#home" className='text-dark fw-bolder fs-3'>
          <i Class="fa-brands fa-youtube fa-beat-fade me-2"></i>
            MEDIA PLAYER
            <Link style={{textDecoration:"none",color:"none"}} to={'/'}>
            </Link>
          </Navbar.Brand>
        </Container>
      </Navbar>
      </>
  )
}

export default Head

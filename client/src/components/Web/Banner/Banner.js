import React from 'react'
import { Container } from 'semantic-ui-react'
import './Banner.scss';

export function Banner() {
  return (
    <div className='banner'>
        <Container>
            <h1>Aprende Nuevas <br/> Tecnologías webs y moviles</h1>
            <h2>A tráves de cursos prácticos , concisos y actualizados, creador por,
                <br/>
                profesionales con años de experiencia.
            </h2>
        </Container>
        <div className='banner__dark'></div>
    </div>
  )
}

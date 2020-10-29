import React, { Component } from 'react'
import Title from './Title'
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa'

export default class Services extends Component {
  state = {
    services: [
      {
        icon: <FaCocktail />,
        title: 'free cocktails',
        info:
          'Consectetur tempor pariatur aliqua ipsum ea Lorem tempor. Eiusmod duis enim deserunt deserunt nisi qui. Reprehenderit ex esse minim id ad consequat.'
      },
      {
        icon: <FaHiking />,
        title: 'endless hiking',
        info:
          'Consectetur tempor pariatur aliqua ipsum ea Lorem tempor. Eiusmod duis enim deserunt deserunt nisi qui. Reprehenderit ex esse minim id ad consequat.'
      },
      {
        icon: <FaShuttleVan />,
        title: 'free shuttle',
        info:
          'Consectetur tempor pariatur aliqua ipsum ea Lorem tempor. Eiusmod duis enim deserunt deserunt nisi qui. Reprehenderit ex esse minim id ad consequat.'
      },
      {
        icon: <FaBeer />,
        title: 'strongest beer',
        info:
          'Consectetur tempor pariatur aliqua ipsum ea Lorem tempor. Eiusmod duis enim deserunt deserunt nisi qui. Reprehenderit ex esse minim id ad consequat.'
      }
    ]
  }
  render () {
    return (
      <section className='services'>
        <Title title='services' />
        <div className='services-center'>
          {this.state.services.map((item, index) => {
            return (
              <article key={index} className='service'>
                <span>{item.icon}</span>
                <h6>{item.title}</h6>
                <p>{item.info}</p>
              </article>
            )
          })}
        </div>
      </section>
    )
  }
}

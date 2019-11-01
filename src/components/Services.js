import React, { Component } from 'react';
import { FaComment, FaBriefcase } from 'react-icons/fa';
import { IoIosPricetag, IoIosSearch } from 'react-icons/io';
import Title from './Title';
export default class Services extends Component {
  state = {
    services: [
      {
        icon: <IoIosPricetag />,
        title: 'Price The Home Correctly',
        info:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias molestias eius libero?'
      },
      {
        icon: <FaComment />,
        title: 'Communicate Properly',
        info:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias molestias eius libero?'
      },
      {
        icon: <IoIosSearch />,
        title: 'Make Sure The Buyer is Qualified',
        info:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias molestias eius libero?'
      },
      {
        icon: <FaBriefcase />,
        title: 'Attend The Home Appraisal',
        info:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias molestias eius libero?'
      }
    ]
  };
  render() {
    return (
      <section className="services">
        <Title title="services" />
        <div className="services-center">
          {this.state.services.map(item => {
            return (
              <article key={`item-${item.title}`} className="service">
                <span>{item.icon}</span>
                <h6>{item.title}</h6>
                <p>{item.info}</p>
              </article>
            );
          })}
        </div>
      </section>
    );
  }
}

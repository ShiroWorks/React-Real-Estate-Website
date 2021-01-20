import React, { Component } from 'react';
//import items from './data';
import Dynamo from './dynamo';
//import Client from "./Contentful";

const RoomContext = React.createContext();

export default class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    //
    type: 'all',
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    airconditioning: false,
    garden: false
  };

  componentDidMount = async () => {
    try {
      this.db = new Dynamo();
      await this.db.query();
      let response = this.db.data;
      console.log("response",response);
      let rooms = this.formatData(response);
      let featuredRooms = rooms.filter(house => house.featured === true);
      let maxPrice = Math.max(...rooms.map(item => item.price));
      let maxSize = Math.max(...rooms.map(item => item.size));
      this.setState({
        rooms,
        featuredRooms,
        sortedRooms: rooms,
        loading: false,
        price: maxPrice,
        maxPrice,
        maxSize
      });
    } catch (error) {
      console.log(error);
    }
  };

  /*componentDidMount() {
    // this.getData();
    this.db = new Dynamo();
    let items = this.db.data;
    let rooms = this.formatData(items);
    let featuredRooms = rooms.filter(house => house.featured === true);
    let maxPrice = Math.max(...rooms.map(item => item.price));
    let maxSize = Math.max(...rooms.map(item => item.size));
    this.setState({
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,
      //
      price: maxPrice,
      maxPrice,
      maxSize
    });
  }*/

  formatData(items) {
    let tempItems = items.map(item => {
      let id = item.zpid.S;//item.sys.id;
      let images = [item.imgSrc.S]//item.fields.images.map(image => image.fields.file.url);
      let name = item.title.S;
      let slug = id;
      let type = 'replaceType';
      let price;
      let p = item.price.S;
      let z = item.zestimate.N;
      if (p) {
        price = parseInt(p.replace(/\D/g, "")); //regex $3,400 -> 3400
      } else if (z) {
        price = z;
      } else {
        price = -1
      }
      let size = item.area.N;
      let capacity = item.bedrooms.N;
      let garden = false
      let airconditioning = false;
      let featured = true;
      let description = 'description'
      let extras = ['extra1','extra2']

      let house = { id, images, name, slug, type, price, size, capacity, garden, airconditioning, featured, description, extras };
      return house;
    });
    return tempItems;
  }

  getRoom = slug => {
    let tempRooms = [...this.state.rooms];
    const house = tempRooms.find(house => house.slug === slug);
    return house;
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(name, value);

    this.setState(
      {
        [name]: value
      },
      this.filterRooms
    );
  };

  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      airconditioning,
      garden
    } = this.state;

    let tempRooms = [...rooms];
    // transform values
    // get capacity
    capacity = parseInt(capacity);
    price = parseInt(price);
    // filter by type
    if (type !== 'all') {
      tempRooms = tempRooms.filter(house => house.type === type);
    }
    // filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(house => house.capacity >= capacity);
    }
    // filter by price
    tempRooms = tempRooms.filter(house => house.price <= price);
    //filter by size
    tempRooms = tempRooms.filter(
      house => house.size >= minSize && house.size <= maxSize
    );
    //filter by airconditioning
    if (airconditioning) {
      tempRooms = tempRooms.filter(house => house.airconditioning === true);
    }
    //filter by garden
    if (garden) {
      tempRooms = tempRooms.filter(house => house.garden === true);
    }
    this.setState({
      sortedRooms: tempRooms
    });
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}
const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext };

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {value => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

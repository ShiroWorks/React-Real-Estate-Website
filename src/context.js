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
    statecode: 'all'
  };

  componentDidMount = async () => {
    try {
      this.db = new Dynamo();
      await this.db.query('properties');
      let response = this.db.data;
      await this.db.query('featured');
      let featuredList = this.db.data.map(item => item.zpid.S);
      let rooms = this.formatData(response, featuredList);
      let featuredRooms = rooms.filter(house => house.featured === true);
      let maxPrice = Math.max(...rooms.map(item => item.price));
      let maxSize = Math.max(...rooms.map(item => item.size));
      this.setState({
        rooms,
        featuredList,
        featuredRooms,
        sortedRooms: rooms,
        loading: false,
        price: maxPrice,
        maxPrice,
        maxSize,
        statecode: 'all'
      });
    } catch (error) {
      console.log(error);
    }
  };

  formatData(items, featuredList) {
    /* current data:
    address: {S: "12 Park Ave, Bronxville, NY 10708"}
    area: {N: "4871"}
    bathrooms: {N: "6"}
    bedrooms: {N: "7"}
    city: {S: "Bronxville"}
    hasImage: {BOOL: true}
    imgSrc: {S: "https://photos.zillowstatic.com/fp/30f2be80a9abcbda6c22db0d5a5b7d10-p_e.jpg"}
    price: {S: "$3,500,000"}
    price_to_rent_ratio: {N: "0.23"}
    broker: {S: "Julia B Fee Sotheby's International Realty"}
    state: {S: "NY"}
    street: {S: "63-65 Loomis Ave"}
    title: {S: "House for sale"}
    url: {S: "https://www.zillow.com/homedetails/12-Park-Ave-Bronxville-NY-10708/131678989_zpid/"}
    zestimate: {N: "3446572"}
    zestimate_rent: {N: "8070"}
    zipcode: {S: "10708"}
    zpid: {S: "131678989"}*/
    let tempItems = items.map(item => {
      //data from the database
      let address = item.address.S;
      let area = item.area.N;
      let bathrooms = item.bathrooms.N;
      let bedrooms = item.bedrooms.N;
      let broker = item.broker.S;
      let city = item.city.S;
      let hasImage = item.hasImage.BOOL;
      let title = item.title.S;
      let imgSrc = item.imgSrc.S;//item.fields.images.map(image => image.fields.file.url);
      let statecode = item.state.S;
      let street = item.street.S;
      let url = item.url.S;
      let zipcode = item.zipcode.S;
      let zpid = item.zpid.S; //item.sys.id;

      //data built into the site
      let id = zpid;
      let featured = featuredList.includes(id);
      let images = [imgSrc];
      //name is redundant but still used
      let name = city + ", " + statecode;
      let slug = id;
      let type = title;
      
      //picks best price to use
      let price;
      let p = item.price.S;
      let z = item.zestimate.N;
      if (p) {
        price = parseInt(p.replace(/\D/g, "")); //regex $3,400 -> 3400
      } else if (z) {
        price = parseInt(z);
      } else {
        price = -1
      }

      //size protection
      let size;
      if (area) {
        size = area;
      } else {
        size = -1;
      }
      //capacity protection
      let capacity;
      if (bedrooms) {
        capacity = bedrooms;
      } else {
        capacity = 1;
      }


      let house = { id, images, name, slug, type, price, size, capacity, featured, address, bathrooms, bedrooms, city, statecode, street,zipcode, hasImage, url, broker};
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
      statecode
    } = this.state;
    let tempRooms = [...rooms];
    // filter by type
    if (type !== 'all') {
      tempRooms = tempRooms.filter(house => house.type === type);
    }
    // filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(house => house.capacity === capacity);
    }
    // filter by price
    tempRooms = tempRooms.filter(house => house.price <= price);
    //filter by size
    tempRooms = tempRooms.filter(
      house => house.size >= minSize && house.size <= maxSize
    );
    //filter by 2-digit state code
    if (statecode !== 'all') {
      tempRooms = tempRooms.filter(house => house.statecode === statecode);
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

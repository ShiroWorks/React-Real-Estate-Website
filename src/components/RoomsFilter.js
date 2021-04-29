import React, {useState} from 'react';
import { useContext } from 'react';
import { RoomContext } from '../context';
import Title from './Title';
import Select from 'react-select';
import { isMobile } from "react-device-detect";
import { Range, getTrackBackground } from "react-range";
// get all unique values
const getUnique = (items, value) => {
  return [...new Set(items.map(item => item[value]))];
};

const RoomsFilter = ({ rooms }) => {
  // react hooks
  const context = useContext(RoomContext);
  const {
    handleChange,
    handleCustomSelectChange,
    handlePrice,
    type,
    capacity,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    statecode,
  } = context;

  const [focusedSelectName, setSelectName] = useState('');
  const [priceValue, setPrice] = useState(price || 0);

  const focusHandle = (name) => {
    setSelectName(name);
  };

  const optionsStyles = {
    option: (styles, { isSelected }) => {
      return {
        ...styles,
        ':before': {
          backgroundColor: isSelected ? '#000' : 'transparent',
          borderColor: isSelected ? '#000' : '#979797'
        }
      }
    }
  };

  // get unique states
  let statecodes = getUnique(rooms, 'statecode');
  // add all
  statecodes = ['all', ...statecodes];
  // map to jsx
  statecodes = statecodes.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ));
  // get unique types
  let types = getUnique(rooms, 'type');
  // add all
  types = ['all', ...types];
  // map to jsx
  types = types.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ));
  // get maximum capacity
  let maxCap = Math.max(...rooms.map(item => item.capacity));
  //create an ordered array from minimum to maximum
  let p;
  if (maxCap !== -Infinity){
    p = [...Array(maxCap+1).keys()]
  } else {
    p = []
  }
  let people;
  if (p.length > 0) {
    people = p.slice(1)
  } else {
    people = []
  }
  people = people.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ));
  return (
    <section className="filter-container">
      <Title title="search rooms" />
      <form className="filter-form">
        {/* select state */}
        <div className="form-group select-wrap">
          <label htmlFor="statecode">state</label>
          {isMobile
            ? (
              <select
                name="statecode"
                id="statecode"
                onChange={handleChange}
                className="form-control"
                value={statecode}
              >
                {statecodes}
              </select>
            )
            : (
              <Select
                id="statecode"
                className={`form-control ${focusedSelectName === 'statecode' ? 'focus' : ''}`}
                options={statecodes.map((item) => ({
                  value: item.props.value,
                  label: item.props.value
                }))}
                name="statecode"
                value={{
                  value: statecode,
                  label: statecode
                }}
                onMenuOpen={() => focusHandle('statecode')}
                onMenuClose={() => focusHandle('')}
                onChange={handleCustomSelectChange}
                isSearchable={false}
                styles={optionsStyles}
              />
            )
          }
        </div>
        {/* end of select state */}
        {/* select type */}
        <div className="form-group select-wrap">
          <label htmlFor="type">house type</label>
          {isMobile
            ? (
              <select
                name="type"
                id="type"
                onChange={handleChange}
                className="form-control"
                value={type}
              >
                {types}
              </select>
            )
            : (
              <Select
                id="type"
                className={`form-control ${focusedSelectName === 'type' ? 'focus' : ''}`}
                options={types.map((item) => ({
                  value: item.props.value,
                  label: item.props.value
                }))}
                name="type"
                value={{value: type, label: type}}
                onMenuOpen={() => focusHandle('type')}
                onMenuClose={() => focusHandle('')}
                onChange={handleCustomSelectChange}
                isSearchable={false}
                styles={optionsStyles}
              />
            )
          }
        </div>
        {/* end of select type */}
        {/* guests  */}
        <div className="form-group select-wrap">
          <label htmlFor="capacity">bedrooms</label>
          {isMobile
            ? (
              <select
                name="capacity"
                id="capacity"
                onChange={handleChange}
                className="form-control"
                value={capacity}
              >
                {people}
              </select>
            )
            : (
              <Select
                id="capacity"
                className={`form-control ${focusedSelectName === 'capacity' ? 'focus' : ''}`}
                options={people.map((item) => ({
                  value: item.props.value,
                  label: item.props.value
                }))}
                name="capacity"
                value={{value: capacity, label: capacity}}
                onMenuOpen={() => focusHandle('capacity')}
                onMenuClose={() => focusHandle('')}
                onChange={handleCustomSelectChange}
                isSearchable={false}
                styles={optionsStyles}
              />
            )
          }
        </div>
        {/* end of guests */}
        {/* house price */}
        <div className="form-group">
          <label htmlFor="price">max price: ${price}</label>
          <Range
            step={1}
            min={minPrice}
            max={maxPrice}
            values={[priceValue]}
            id="price"
            onChange={(values) => setPrice(values[0])}
            onFinalChange={handlePrice}
            rtl={false}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                  ...props.style,
                  height: '9px',
                  width: '100%',
                  borderRadius: '5px',
                  backgroundColor: '#d8d8d8'
                }}
              >
                <div
                  ref={props.ref}
                  style={{
                    height: '9px',
                    width: '100%',
                    borderRadius: '5px',
                    background: getTrackBackground({
                      values: [priceValue],
                      colors: ['#816b6b', '#d8d8d8'],
                      min: minPrice,
                      max: maxPrice,
                      rtl: false
                    }),
                    alignSelf: 'center'
                  }}
                  >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props, isDragged }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: '9px',
                  width: '9px',
                  borderRadius: '50%',
                  backgroundColor: '#816b6b',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '-2px 1px 3px -1px #544646'
                }}
              >
                <div
                  style={{
                    height: '9px',
                    width: '9px',
                    borderRadius: '50%',
                    backgroundColor: '#816b6b'
                  }}
                />
              </div>
            )}
          />
        </div>
        {/* end of house price*/}
        {/* size */}
        <div className="form-group">
          <label htmlFor="price">house area</label>
          <div className="size-inputs">
            <input
              type="number"
              name="minSize"
              value={minSize}
              onChange={handleChange}
              className="size-input"
            />
            <input
              type="number"
              name="maxSize"
              value={maxSize}
              onChange={handleChange}
              className="size-input"
            />
          </div>
        </div>
        {/* end of select type */}
        {/* extras
        <div className="form-group">
          <div className="single-extra">
            <input
              type="checkbox"
              name="airconditioning"
              id="airconditioning"
              checked={airconditioning}
              onChange={handleChange}
            />
            <label htmlFor="airconditioning">airconditioning</label>
          </div>
          <div className="single-extra">
            <input
              type="checkbox"
              name="garden"
              checked={garden}
              onChange={handleChange}
            />
            <label htmlFor="airconditioning">garden</label>
          </div>
        </div>
        end of extras type */}
      </form>
    </section>
  );
};

export default RoomsFilter;

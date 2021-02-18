import React from "react";
import Dynamo from '../dynamo';
import { useContext } from 'react';
import { RoomContext } from '../context';

const addPhrase = 'Add to Featured'
const removePhrase = 'Remove from Featured'

const FeaturedButton = ({zpid}) =>{
    const context = useContext(RoomContext);
    const {
        featuredList
    } = context;
    const params = new URLSearchParams(window.location.search)
    let firstPhrase;
    if (featuredList.includes(zpid)) {
        firstPhrase = removePhrase;
    } else {
        firstPhrase = addPhrase;
    }
    if (params.get('curator') === '1') {
        return (
            <button id="featuredButton" onClick={() => 
                checkFeatured(zpid, featuredList)
            }>{firstPhrase}</button>
        )
    } else {
        return null;
    }

}

async function checkFeatured(zpid, featuredList) {
    //if pressed, the button has been pressed, meaning the db has to be edited. if not, it's being initialized.
    let db = new Dynamo()
    var button = document.getElementById('featuredButton')
    if (featuredList.includes(zpid)){
        db.deleteFeatured(zpid);
        button.innerHTML = addPhrase;
    } else {
        db.addFeatured(zpid);
        button.innerHTML = removePhrase;
    }
    window.location.reload();
  }

export default FeaturedButton;
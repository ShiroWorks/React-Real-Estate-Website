import React from "react";
import Dynamo from '../dynamo';

const addPhrase = 'Add to Featured'
const removePhrase = 'Remove from Featured'

const FeaturedButton = ({zpid}) =>{
    const params = new URLSearchParams(window.location.search)
    let firstPhrase;
    if (isFeatured(zpid)) {
        firstPhrase = removePhrase;
    } else {
        firstPhrase = addPhrase;
    }
    if (params.get('curator') === '1') {
        return (
            <button id="featuredButton" onClick={() => checkFeatured(zpid)}>{firstPhrase}</button>
        )
    } else {
        return null;
    }

}

async function checkFeatured(zpid, pressed) {
    //if pressed, the button has been pressed, meaning the db has to be edited. if not, it's being initialized.
    let db = new Dynamo()
    var button = document.getElementById('featuredButton')
    if (isFeatured(zpid,db)){
        db.deleteFeatured(zpid);
        button.innerHTML = addPhrase;
    } else {
        db.addFeatured(zpid);
        button.innerHTML = removePhrase;
    }
  }

async function isFeatured(zpid, db=undefined) {
    if (db === undefined) {
        db = new Dynamo()
    }
    await db.query('featured');
    let featuredList = db.data.map(item => item.zpid.S);
    return featuredList.includes(zpid)
}

export default FeaturedButton;
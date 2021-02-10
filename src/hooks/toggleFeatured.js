import Dynamo from '../dynamo';

export default async function toggleFeatured(zpid) {
    this.db = new Dynamo();
    await this.db.query('featured');
    let fList = this.db.data.map(item => item.zpid.S);
    if (zpid in fList){
        this.db.addFeatured(zpid);
    } else {
        this.db.deleteFeatured(zpid);
    }
  }
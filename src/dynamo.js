var AWS = require('aws-sdk');
export default class Dynamo {
    
    constructor() {
        AWS.config.update({accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
          region: process.env.REACT_APP_AWS_REGION,});
        this.db = new AWS.DynamoDB();
        this.docClient = this.db.docClient();
    };    

    async query(TableName) {
        var params = {
            TableName : TableName
        };

        return new Promise((resolve, reject) => {
          
          this.db.scan(params, (err, data) => {
                  if (err) {
                    reject(err)  // calling `reject` will cause the promise to fail with or without the error passed as an argument
                    return        // and we don't want to go any further
                  }
                  this.data = data.Items;
                  resolve(data)
                });
        })
        
    }

    addFeatured(zpid) {
      var params = {
        TableName :"featured",
        Item:{
            "zpid":zpid
        }
      };
      this.docClient.put(params, function(err) {
          if (err) {
              console.log(err);
          }
        });
    }

    deleteFeatured(zpid) {
      var params = {
        TableName :"featured",
        Key:{
            "zpid":zpid
        }
      };
      this.docClient.put(params, function(err) {
          if (err) {
              console.log(err);
          }
        });
    }
    
    getData() {
        const data = this.data;
        if (data) {
            console.log(this.data)
            return this.data
        } else {
            setTimeout(this.getData, 300)
        };
    }
};
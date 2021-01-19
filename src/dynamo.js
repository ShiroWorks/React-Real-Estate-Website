var AWS = require('aws-sdk');
export default class Dynamo {
    
    constructor() {
        AWS.config.update({accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
          region: process.env.REACT_APP_AWS_REGION,});

    };

    

    async query() {
        var dynamodb = new AWS.DynamoDB();
        this.docClient = new AWS.DynamoDB.DocumentClient();
        var params = {
            TableName : "properties"
        };

        return new Promise((resolve, reject) => {
          
          dynamodb.scan(params, (err, data) => {
                  if (err) {
                    reject(err)  // calling `reject` will cause the promise to fail with or without the error passed as an argument
                    return        // and we don't want to go any further
                  }
                  this.data = data.Items;
                  resolve(data)
                });
        })
        
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
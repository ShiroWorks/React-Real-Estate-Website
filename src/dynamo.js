var AWS = require('aws-sdk');
export default class Dynamo {
    
    constructor() {
        AWS.config.update({accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
          region: process.env.REACT_APP_AWS_REGION,});
        this.query();
    };

    callback(err, data) {
        if (err) {
            throw(err);
        } else {
            this.data = data.Items;
            console.log(this.data);
        }
    }

    query() {
        var dynamodb = new AWS.DynamoDB();
        this.docClient = new AWS.DynamoDB.DocumentClient();
        var params = {
            TableName : "properties"
        };
        dynamodb.scan(params, this.callback);
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
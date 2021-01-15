var AWS = require('aws-sdk');
export default class Dynamo {
    
    constructor() {
        AWS.config.update({accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
          region: process.env.REACT_APP_AWS_REGION,});
    };

    queryData() {
        //takes a 2-character state code and queries the data for it
        var dynamodb = new AWS.DynamoDB();

        this.docClient = new AWS.DynamoDB.DocumentClient();

        var params = {
            TableName : "properties"
        };
        dynamodb.scan(params, function (err, data) {
            if (err) {
                console.log(err, err.stack);
                return {}
            } else {
                console.log('data', data);
                return data.Items;
            }
        });
    }
};
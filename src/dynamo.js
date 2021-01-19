import * as AWS from 'aws-sdk';
export default class Dynamo {
    constructor() {
        AWS.config.region = process.env.REACT_APP_AWS_REGION; // Region
        AWS.config.credentials = new AWS.Credentials({
            accessKeyID: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
        });
        AWS.config.credentials.accessKeyID = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
        AWS.config.credentials.secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
        this.dynamodb = new AWS.DynamoDB();
        this.docClient = new AWS.DynamoDB.DocumentClient();
    };

    queryData() {
        //takes a 2-character state code and queries the data for it
        var params = {
            TableName : "properties",
            Key: {
                'zpid': '109181542'
            }
        };
        this.docClient.query(params, function (err, data) {
            if (err) {
                console.log(err, err.stack);
                return {}
            } else {
                console.log('data');
                return data.Items;
            }
        });
    }
};
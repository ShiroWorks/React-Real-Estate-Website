import * as AWS from 'aws-sdk';

AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:5f4a6a00-a943-4869-ad45-18141eabbff3',
        RoleArn: 'arn:aws:iam::433484206610:role/Cognito_DynamoPoolUnauth_Role'
    });

export default class Dynamo {
    constructor() {
        this.dynamodb = new AWS.DynamoDB();
        this.docClient = new AWS.DynamoDB.DocumentClient();
    };

    queryData(state) {
        //takes a 2-character state code and queries the data for it
        var params = {
            TableName : "properties",
            KeyConditionExpression: "#state = :state",
            ExpressionAttributeNames:{
                "#state": "state"
            },
            ExpressionAttributeValues: {
                ":state":state
            }
        };

        this.docClient.query(params, function(err, data) {
            if (err) {
                console.log('error at query');
            } else {
                return data;
            }
        });
    }
};
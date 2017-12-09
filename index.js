// Load the SDK for JavaScript
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({
  region: 'us-east-1',
  endpoint: 'https://dynamodb.us-east-1.amazonaws.com'
});

const docClient = new AWS.DynamoDB.DocumentClient();
const params = { TableName: "fillups" };

exports.handler = (event, context, callback) => {
  const onScan = (err, data) => {
    const response = {
      "statusCode": err ? 500 : 200,
      headers: {
        "Access-Control-Allow-Origin" : "http://jesswray.com", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
      },
      "body": JSON.stringify(err || data),
    };

    callback(null, response);
  };

  docClient.scan(params, onScan);
};

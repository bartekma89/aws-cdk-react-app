import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { parseJSON } from "../model/shared/utils";

export const updateSpaces = async (
  event: APIGatewayProxyEvent,
  dynamoDBDocClient: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> => {
  if (
    event.queryStringParameters &&
    "id" in event.queryStringParameters &&
    event.body
  ) {
    const id = event.queryStringParameters.id;
    const item = parseJSON(event.body);
    const requestBodyKey = Object.keys(item)[0];
    const requestBodyValue = item[requestBodyKey];

    const updateSpacesResult = await dynamoDBDocClient.send(
      new UpdateCommand({
        TableName: process.env.TABLE_NAME,
        Key: { id },
        UpdateExpression: "set #destination = :destination",
        ExpressionAttributeNames: {
          "#destination": requestBodyKey,
        },
        ExpressionAttributeValues: {
          ":destination": requestBodyValue,
        },
        ReturnValues: "UPDATED_NEW",
      })
    );

    console.log(updateSpacesResult);

    return {
      statusCode: 204,
      body: JSON.stringify(updateSpacesResult.Attributes),
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify("Provide right args"),
  };
};

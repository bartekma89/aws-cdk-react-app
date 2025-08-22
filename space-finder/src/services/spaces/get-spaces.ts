import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  DynamoDBDocumentClient,
  GetCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

export const getSpaces = async (
  event: APIGatewayProxyEvent,
  dynamoDBDocClient: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> => {
  if (event.queryStringParameters) {
    if ("id" in event.queryStringParameters) {
      const spaceId = event.queryStringParameters.id;
      const getItemResponse = await dynamoDBDocClient.send(
        new GetCommand({
          TableName: process.env.TABLE_NAME,
          Key: {
            id: spaceId,
          },
        })
      );

      console.log("Space found:", getItemResponse.Item);
      if (getItemResponse.Item) {
        return {
          statusCode: 200,
          body: JSON.stringify(getItemResponse.Item),
        };
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: `Space id ${spaceId} not found.` }),
        };
      }
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Invalid query parameters." }),
      };
    }
  }

  const result = await dynamoDBDocClient.send(
    new ScanCommand({
      TableName: process.env.TABLE_NAME,
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify(result.Items),
  };
};

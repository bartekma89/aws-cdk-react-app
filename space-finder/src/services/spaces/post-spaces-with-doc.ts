import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { parseJSON } from "../model/shared/utils";

export const postSpacesWithDoc = async (
  event: APIGatewayProxyEvent,
  dynamoDBDocClient: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> => {
  const item = parseJSON(event.body);
  item.id = crypto.randomUUID();

  await dynamoDBDocClient.send(
    new PutCommand({
      TableName: process.env.TABLE_NAME,
      Item: item,
    })
  );

  return {
    statusCode: 201,
    body: JSON.stringify({
      id: item.id,
    }),
  };
};

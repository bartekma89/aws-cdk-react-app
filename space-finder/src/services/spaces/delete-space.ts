import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent } from "aws-lambda";
import { hasAdminGroup } from "../model/shared/utils";

export const deleteSpace = async (
  event: APIGatewayProxyEvent,
  dynamoDBDocClient: DynamoDBDocumentClient
) => {
  const isAuthenticated = hasAdminGroup(event);
  if (!isAuthenticated) {
    return {
      statusCode: 401,
      body: JSON.stringify("Unathorized"),
    };
  }

  if (event.queryStringParameters && "id" in event.queryStringParameters) {
    const id = event.queryStringParameters.id;

    await dynamoDBDocClient.send(
      new DeleteCommand({
        TableName: process.env.TABLE_NAME,
        Key: { id },
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify(`Deleted space with id: ${id}`),
    };
  }
};

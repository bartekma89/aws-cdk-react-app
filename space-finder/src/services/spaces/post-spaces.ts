import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const postSpaces = async (
  event: APIGatewayProxyEvent,
  dbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> => {
  const id = crypto.randomUUID();
  const item = JSON.parse(event.body);
  item.id = id;

  const result = await dbClient.send(
    new PutItemCommand({
      TableName: process.env.TABLE_NAME,
      Item: {
        id: { S: id },
        location: { S: item.location },
      },
    })
  );

  console.log(result);

  return {
    statusCode: 201,
    body: JSON.stringify({
      id,
    }),
  };
};

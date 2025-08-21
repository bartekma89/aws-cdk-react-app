import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { postSpaces } from "./post-spaces";

const dynamoDBClient = new DynamoDBClient({});

async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  let message: string;

  try {
    switch (event.httpMethod) {
      case "GET":
        message = "Hello from GET request!";
        break;
      case "POST":
        return postSpaces(event, dynamoDBClient);
      default:
        break;
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "An error occurred",
        error: (error as Error).message,
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(message),
  };
}

export { handler };

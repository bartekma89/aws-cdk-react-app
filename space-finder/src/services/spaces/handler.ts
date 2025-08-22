import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { postSpaces } from "./post-spaces";
import { getSpaces } from "./get-spaces";
import { updateSpaces } from "./update-space";
import { deleteSpace } from "./delete-space";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { JsonError, MissingFieldError } from "../model/shared/validator";

const dynamoDBDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  let message: string;

  try {
    switch (event.httpMethod) {
      case "GET":
        const resultData = await getSpaces(event, dynamoDBDocClient);
        console.log("Get result:", resultData);
        return resultData;
      case "POST":
        return await postSpaces(event, dynamoDBDocClient);
      case "PUT":
        const result = await updateSpaces(event, dynamoDBDocClient);
        console.log("Update result:", result);
        return result;
      case "DELETE":
        const deleteResult = await deleteSpace(event, dynamoDBDocClient);
        console.log("Delete result:", deleteResult);
        return deleteResult;
      default:
        break;
    }
  } catch (error) {
    if (error instanceof MissingFieldError) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: error.message }),
      };
    }

    if (error instanceof JsonError) {
      return {
        statusCode: 400,
        body: error.message,
      };
    }

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

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";

async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  let message;

  switch (event.httpMethod) {
    case "GET":
      message = "Hello from GET request!";
      break;
    case "POST":
      message = "Hello from POST request!";
      break;
    default:
      break;
  }

  return {
    statusCode: 200,
    body: JSON.stringify(message),
  };
}

export { handler };

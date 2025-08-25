import { APIGatewayProxyEvent } from "aws-lambda";
import { JsonError } from "./validator";
import { randomUUID } from "crypto";

export function createRandomId() {
  return randomUUID();
}

export function parseJSON(arg: string) {
  try {
    return JSON.parse(arg);
  } catch (error) {
    throw new JsonError(error.message);
  }
}

export function hasAdminGroup(event: APIGatewayProxyEvent) {
  const groups = event.requestContext.authorizer?.claims["cognito:groups"];
  if (!groups) {
    return false;
  }
  return groups.split(",").includes("admins");
}

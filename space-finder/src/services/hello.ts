import {
  APIGatewayProxyEvent,
  APIGatewayProxyResultV2,
  Context,
} from "aws-lambda";
import { v4 as uuid } from "uuid";
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({});

async function handler(event: APIGatewayProxyEvent, context: Context) {
  const command = new ListBucketsCommand({});
  const listBucketResult = await s3Client.send(command);

  const response: APIGatewayProxyResultV2 = {
    statusCode: 200,
    body: JSON.stringify(
      "Hello from Lambda!" + JSON.stringify(listBucketResult.Buckets, null, 2)
    ),
  };

  console.log("Context:", JSON.stringify(context, null, 2));
  console.log("Event:", JSON.stringify(event, null, 2));

  return response;
}

export { handler };

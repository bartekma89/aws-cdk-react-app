import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";
import { AuthService } from "./AuthService";
import { awsConfig } from "./config";

async function testAuth() {
  const service = new AuthService();
  await service.login(awsConfig.name, awsConfig.password);

  const idToken = await service.getToken();
  console.log("ID Token:", idToken);

  const credentials = await service.generateTemporaryCredentials();
  console.log("Temporary Credentials:", credentials);

  const buckets = await listBuckets(credentials);
  console.log("Buckets:", buckets);
}

async function listBuckets(credentials: any) {
  const client = new S3Client({ credentials });
  const command = new ListBucketsCommand({});
  const response = await client.send(command);
  console.log("S3 Buckets:", response.Buckets);

  return response;
}

testAuth();

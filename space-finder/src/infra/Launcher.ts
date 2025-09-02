import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack";
import { LambdaStack } from "./stacks/LambdaStack";
import { ApiStack } from "./stacks/ApiStack";
import { AuthStack } from "./stacks/AuthStack";
import { BucketUIStack } from "./stacks/BucktUIStack";
import { BucketDeploymentStack } from "./stacks/BucketDeploymentStack";

const app = new App();
const dataStack = new DataStack(app, "DataStack");
const lambdaStack = new LambdaStack(app, "LambdaStack", {
  spacesTable: dataStack.spacesTable,
});
const authStack = new AuthStack(app, "AuthStack");
const bucket = new BucketUIStack(app, "BucketUIStack");
new BucketDeploymentStack(app, "BucketDeploymentStack", {
  bucket: bucket.bucket,
});
new ApiStack(app, "ApiStack", {
  spacesLambdaIntegration: lambdaStack.spacesLambdaIntegration,
  userPool: authStack.userPool,
});

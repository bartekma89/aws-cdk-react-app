import { Stack, StackProps } from "aws-cdk-lib";
import {
  CognitoUserPoolsAuthorizer,
  LambdaIntegration,
  RestApi,
  AuthorizationType,
  MethodOptions,
} from "aws-cdk-lib/aws-apigateway";
import { IUserPool } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

interface ApiStackProps extends StackProps {
  spacesLambdaIntegration: LambdaIntegration;
  userPool: IUserPool;
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    const api = new RestApi(this, "spaces-api");

    const authorizer = new CognitoUserPoolsAuthorizer(
      this,
      "SpacesAuthorizer",
      {
        cognitoUserPools: [props.userPool],
      }
    );

    const optionsWithAuth: MethodOptions = {
      authorizer,
      authorizationType: AuthorizationType.COGNITO,
    };

    const spacesResource = api.root.addResource("spaces");
    spacesResource.addMethod(
      "GET",
      props.spacesLambdaIntegration,
      optionsWithAuth
    );
    spacesResource.addMethod(
      "POST",
      props.spacesLambdaIntegration,
      optionsWithAuth
    );
    spacesResource.addMethod(
      "PUT",
      props.spacesLambdaIntegration,
      optionsWithAuth
    );
    spacesResource.addMethod(
      "DELETE",
      props.spacesLambdaIntegration,
      optionsWithAuth
    );
  }
}

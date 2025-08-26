import { Amplify } from "aws-amplify";
import { fetchAuthSession, signIn } from "@aws-amplify/auth";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { awsConfig } from "./config";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: awsConfig.userPoolId,
      userPoolClientId: awsConfig.userPoolClientId,
    },
  },
});

export class AuthService {
  public async login(userName: string, password) {
    const signInOutput = await signIn({
      username: userName,
      password: password,
      options: {
        authFlowType: "USER_PASSWORD_AUTH",
      },
    });

    return signInOutput;
  }

  public async getToken() {
    const authSession = await fetchAuthSession();
    return authSession.tokens?.idToken.toString();
  }

  public async generateTemporaryCredentials() {
    const idToken = await this.getToken();
    const congnitoIdentityPool = `cognito-idp.${awsConfig.region}.amazonaws.com/${awsConfig.userPoolId}`;

    const congnitoIdentity = new CognitoIdentityClient({
      credentials: fromCognitoIdentityPool({
        identityPoolId: awsConfig.IdentityPoolId,
        logins: {
          [congnitoIdentityPool]: idToken,
        },
      }),
    });

    const credentials = await congnitoIdentity.config.credentials();
    return credentials;
  }
}

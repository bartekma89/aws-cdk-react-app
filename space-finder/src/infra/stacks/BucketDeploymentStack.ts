import { CfnOutput, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { getSuffixFromStack } from "../Utils";
import { Bucket, BlockPublicAccess, IBucket } from "aws-cdk-lib/aws-s3";
import {
  Distribution,
  ResponseHeadersPolicy,
} from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { join } from "path";
import { Construct } from "constructs";

interface BucketDeploymentStackProps extends StackProps {
  bucket: IBucket;
}

export class BucketDeploymentStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    props?: BucketDeploymentStackProps
  ) {
    super(scope, id, props);

    const distributionBucket = new Distribution(
      this,
      "spaceFinderDistribution",
      {
        defaultBehavior: {
          origin: new S3Origin(props.bucket),
          // CORS policy - zezwalanie na requesty z kazdej domeny
          // responseHeadersPolicy: ResponseHeadersPolicy.CORS_ALLOW_ALL_ORIGINS,
        },
        defaultRootObject: "index.html",
      }
    );

    new BucketDeployment(this, "spaceFinderDeploy", {
      destinationBucket: props.bucket,
      distribution: distributionBucket,
      distributionPaths: ["/*"],
      sources: [
        Source.asset(
          join(
            __dirname,
            "..",
            "..",
            "..",
            "..",
            "space-finder-frontend",
            "dist"
          )
        ),
      ],
    });

    new CfnOutput(this, "bucketDeploymentUrl", {
      value: distributionBucket.domainName,
    });
  }
}

// tworzenie buckety
// laczenie buckety z cloudfront
// deploy do bucketu pliki z builda
// wyswietlanie strony z cloudfront

import { Stack, StackProps } from "aws-cdk-lib";
import { getSuffixFromStack } from "../Utils";
import { Bucket, BlockPublicAccess } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class BucketUIStack extends Stack {
  public readonly bucket: Bucket;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const suffix = getSuffixFromStack(this);

    this.bucket = new Bucket(this, "spaceFinderBucket", {
      publicReadAccess: false,
      bucketName: `space-finder-frontend-deployment-${suffix}`,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
    });
  }
}

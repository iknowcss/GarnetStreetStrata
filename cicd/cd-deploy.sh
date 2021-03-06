#!/bin/sh
set -eu
. cicd/set-vars.sh

sam deploy \
  --stack-name "${STACK_NAME}" \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides \
    "DeployEnv=$DEPLOY_ENV" \
    "PinpointProjectId=$PINPOINT_PROJECT_ID" \
  --no-fail-on-empty-changeset \
  --s3-bucket garnet-street-strata-build

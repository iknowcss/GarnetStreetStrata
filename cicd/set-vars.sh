#!/bin/sh
set -eu

export PYTHONPATH="$PWD/LambdaCommonLayer/python/lib/python3.8/local-packages"
export DEPLOY_ENV="${DEPLOY_ENV:-dev}"
export STACK_NAME="GarnetStreetStrata-${DEPLOY_ENV}"

# Import deploy-env environment variables
env_file="./cicd/deploy-env/${DEPLOY_ENV}.env"
if [ -f "$env_file" ]; then
  set -o allexport
  # shellcheck source=/dev/null
  . "$env_file"
  set +o allexport
fi

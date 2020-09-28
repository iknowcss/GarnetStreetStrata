#!/bin/sh
set -eu

export DEPLOY_ENV="${DEPLOY_ENV:-dev}"

# Import deploy-env environment variables
env_file="./cicd/deploy-env/${DEPLOY_ENV}.env"
if [ -f "$env_file" ]; then
  set -o allexport
  # shellcheck source=/dev/null
  . "$env_file"
  set +o allexport
fi

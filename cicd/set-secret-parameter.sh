#!/bin/sh
set -eu
. cicd/set-vars.sh

name_prefix="/${STACK_NAME}/"

help() {
echo "Usage: $0 NAME DESCRIPTION VALUE
Add a parameter to the SSM Parameter Store as a SecureString. The parameter
name will be prefixed with \"$name_prefix\" based on the current
environment variables set in cicd/set-vars.sh."
}

if [ -z "${1:-}" ] || [ -z "${2:-}" ] || [ -z "${3:-}" ]; then
  help
  exit 1
fi

parameter_name="${name_prefix}$1"

echo "Store parameter with name \"${parameter_name}\""
aws ssm put-parameter \
  --type SecureString \
  --name "$parameter_name" \
  --description "$2" \
  --value "$3" \
  --overwrite

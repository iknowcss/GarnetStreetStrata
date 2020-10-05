#!/bin/sh
set -eu
. cicd/set-vars.sh

(cd SignUpWebsiteBucket && yarn build)

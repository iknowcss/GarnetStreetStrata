#!/bin/sh
set -eu
. cicd/set-vars.sh

aws s3 sync SignUpWebsiteBucket/ s3://strata80garnetstreet.com \
  --acl public-read \
  --cache-control max-age=30 \
  --delete

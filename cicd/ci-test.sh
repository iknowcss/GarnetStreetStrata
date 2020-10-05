#!/bin/sh
set -eu
. cicd/set-vars.sh

pytest

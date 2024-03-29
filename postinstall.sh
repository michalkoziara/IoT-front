#!/usr/bin/env bash

echo "Building Angular app for $NODE_ENV"

build_dev='ng build --aot --prod --configuration development'
if [ "$CONFIGURATION" = "development" ]; then
 echo "running $build_dev ..."
 eval "$build_dev"
fi

build_prod='ng build --aot --prod --configuration production'
if [ "$CONFIGURATION" = "production" ]; then
 echo "running $build_prod ..."
 eval "$build_prod"
fi

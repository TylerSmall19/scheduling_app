#!/bin/bash

echo "API KEY LOOKUP: "
echo $API_LOOKUP_KEY

echo "API KEY: "
echo ${!API_LOOKUP_KEY}

./build-base.sh
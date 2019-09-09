#!/bin/bash

# exec "sed -i s/HEADER_PLACEHOLDER/${!API_LOOKUP_KEY}/g netlify.toml"
npm run lambdas:build && npm run build;
#!/bin/bash
docker build -t playwright-tests .
docker run --rm \
  -v $(pwd)/playwright-report:/app/playwright-report \
  playwright-tests

# 🎭 Playwright Test Suite

This project uses **Playwright v1.52.0** and is configured to run tests both locally and in a Dockerized environment for full consistency across development and CI.

---
## Table of Contents:
- [Project Structure](project-structure)
- [Local Setup](local-setup)
- [Running tests locally](running-tests-locally)
- [Running tests via Docker](running-tests-via-docker)
- [Github Actions CI](github-actions-ci)

## 📁 Project Structure
```
├── tests/                  # Playwright test specs
├── bin/test.sh             # Docker test runner script
├── Dockerfile              # Docker image config
├── package.json            # NPM dependencies with pinned Playwright version
├── package-lock.json       # Locked dependency tree
└── playwright-report/      # Generated HTML reports (gitignored)
```

## ⚙️ Local Setup

### 1. Install dependencies
```bash
npm ci
```
- This installs the exact versions defined in package-lock.json.

### 2. Install Playwright browsers
```bash
npx playwright install
```
Or if you're setting up for the first time and need system dependencies:

```bash
npx playwright install --with-deps
```
## 🚀 Running Tests Locally

- Run the tests
```bash
npx playwright test
```
- View the test report
```bash
npx playwright show-report
```
- This will open the HTML report in your default browser.

## 🐳 Running Tests via Docker (CI-Aligned Workflow)
This ensures you're using the same Playwright version, browsers, and OS as in GitHub Actions CI.

### 1. Build the Docker image
```bash
docker build -t playwright-tests .
```
### 2. Run tests with Docker
Use the provided script:
```bash
docker run --rm \
  -v $(pwd)/playwright-report:/app/playwright-report \
  playwright-tests
```
- This does the following:
  - Runs tests in a Docker container
  - Persists the test report to ./playwright-report
  - Cleans up the container after completion
    
### (Optional) Use bash script 
Use the provided script:
```bash
./bin/test.sh
```
- This bash script executes the previous steps 1 and 2 in one go
```bash
# test.sh
#!/bin/bash
docker build -t playwright-tests .
docker run --rm \
  -v $(pwd)/playwright-report:/app/playwright-report \
  playwright-tests
```
### 3. View the report

```bash
npx playwright show-report
```
Or open manually:
```bash
open ./playwright-report/index.html
```
## 🤖 GitHub Actions CI
Playwright tests are automatically run on every push and pull request to main or master.

Key configuration:
  - **Docker image:** mcr.microsoft.com/playwright:v1.52.0-jammy
  - **GitHub runner:** ubuntu-22.04
  - **Report** uploaded as an **artifact**

Playwright version is specified in package.json:

```json
"devDependencies": {
  "@playwright/test": "1.52.0"
}
```
Dockerfile is pinned to the same version:

```Dockerfile
FROM mcr.microsoft.com/playwright:v1.52.0-jammy
package-lock.json is committed to lock all dependencies exactly.
```


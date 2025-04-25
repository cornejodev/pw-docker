# Use official Playwright image
# this maps to ubuntu-22.04
FROM mcr.microsoft.com/playwright:v1.52.0-jammy

# Set working dir
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN npm ci

# Run tests and generate HTML report by default
CMD ["npx", "playwright", "test", "--reporter=html"]

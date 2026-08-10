FROM python:3.12-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libffi-dev \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create necessary directories
RUN mkdir -p data/sessions data/logs data/sent_gifts data/user_configs

# Expose port
EXPOSE 5913

# Run the application with gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:5913", "--workers", "2", "--timeout", "120", "admin_routes:app"]

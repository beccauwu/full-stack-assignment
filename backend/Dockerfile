FROM python:3.10-slim-bullseye
WORKDIR /backend

COPY requirements.txt .

RUN apt-get update \
    && apt-get -y install libpq-dev gcc \
    && pip install --no-cache-dir -r requirements.txt \
    && apt-get -y purge gcc \
    && apt-get -y autoremove

COPY . .

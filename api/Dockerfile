FROM python:3.9.2

ENV PYTHONUNBUFFERED=1

WORKDIR /api

COPY requirements.txt /api

RUN pip install -r requirements.txt

COPY . /api


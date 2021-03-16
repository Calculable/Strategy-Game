FROM python:3.9.2

ENV PYTHONUNBUFFERED=1

WORKDIR /service

COPY requirements.txt /service

RUN pip install -r requirements.txt

COPY . /service


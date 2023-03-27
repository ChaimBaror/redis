FROM python:3.8-alpine

WORKDIR /app

RUN pip install redis

COPY subscriber.py .

CMD [ "python", "subscriber.py" ]
FROM python:3.10

EXPOSE 5000

WORKDIR /app
COPY ./requirements.txt /app
RUN pip install -r /app/requirements.txt

COPY . /app

CMD ["flask", "run", "--host", "0.0.0.0"]

# 构建后端工程
FROM continuumio/anaconda3:5.2.0
WORKDIR /app
RUN apt-get install python3.6-dev libmysqlclient-dev python-psycopg2 libpq-dev python3-tk python3-tk-dbg -y
RUN pip install pipenv
RUN pipenv install psycopg2-binary
COPY ./sphinxquant .
COPY ./entrypoint.sh .
RUN pipenv install

ENTRYPOINT ["./entrypoint.sh"]
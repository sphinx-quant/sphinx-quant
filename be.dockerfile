# 构建前端页面
FROM continuumio/anaconda3:2019.03
WORKDIR /app
RUN conda install python=3.6 
COPY ./sphinxquant .
COPY ./entrypoint.sh .
RUN pipenv install

ENTRYPOINT ["./entrypoint.sh"]
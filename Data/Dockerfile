FROM postgres:10-alpine

ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD posgres
ENV POSTGRES_DB bikeshare_v2

COPY *.sh /docker-entrypoint-initdb.d/
COPY *.sql /docker-entrypoint-initdb.d/
COPY *.zip.* /tmp/

# get the bikeshare_backup.sql out of the zip
RUN cat /tmp/*.zip.* > /tmp/bikeshare_backup.zip && \
    unzip /tmp/bikeshare_backup.zip -d /tmp && \
	rm /tmp/*.zip

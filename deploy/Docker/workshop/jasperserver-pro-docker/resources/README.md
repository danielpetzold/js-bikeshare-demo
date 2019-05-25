Put your downloaded JasperReports Server WAR file installer archive here, for example:
```console
$ cp ~/Downloads/TIB_js-jrs_7.2.0_bin.zip resources/
```
Archive name should be the same as downloaded, or you would need to
modify your `Dockerfile` for that.

Dockerfile does:
```
COPY resources/TIB_js-jrs*.zip /tmp/jasperserver.zip 

```

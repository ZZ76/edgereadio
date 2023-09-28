### Start server in development environment
```
$ start-dev.sh
```

### Start in production environment
```
$ start-prod.sh
```

### Set port
To change default port which is 5000, add `--port` Option in `.sh` file.
```
flask run --host=0.0.0.0 --port=3000
```

### Initiate database
```
$ export FLASK_APP=starter_dev.py
$ flask db init
```
This will initiate `data-dev.sqlite` if it is not created yet.

### Manually interact with the database
```
$ export FLASK_APP=starter_dev.py
$ flask shell
```
e.g. check all records in `data-dev.sqlite`
```
>>>Station.query.all()
```

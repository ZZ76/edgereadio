#!/usr/bin/env python3

import os
from app import create_app, db
from app.radio.models import Station
from flask_migrate import Migrate

app = create_app('default')
migrate = Migrate(app, db)

@app.cli.command()
def test():
    import unittest
    tests = unittest.TestLoader().discover('tests')
    unittest.TextTestRunner(verbosity=2).run(tests)

@app.shell_context_processor
def make_shell_context():
    return dict(db=db, Station=Station)

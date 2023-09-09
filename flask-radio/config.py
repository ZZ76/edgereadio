#!/usr/bin/env python3

import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    DEBUG = False
    @staticmethod
    def init_app(app):
        pass

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = \
        'sqlite:///' + os.path.join(basedir, 'data-dev.sqlite')

class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = \
        'sqlite:///' + os.path.join(basedir, 'data.sqlite')

class TestingConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'sqlite:///'

config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
'''
|-flasky
        |-app/
                |-templates/
                |-static/
                |-main/
                        |-__init__.py
                        |-errors.py
                        |-forms.py
                        |-views.py
                |-__init__.py
                |-email.py
                |-models.py
        |-migrations/
        |-tests/
                |-__init__.py
                |-test*.py
        |-venv/
        |-requirements.txt
        |-config.py
        |-flasky.py
'''

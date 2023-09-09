#!/usr/bin/env python3
from . import db

class Station(db.Model):
    __tablename__ = 'stations'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    url = db.Column(db.String(256), nullable=False)
    tags = db.Column(db.String(128))

    def __init__(self, **kwargs):
        super(Station, self).__init__(**kwargs)

    def __repr__(self):
        return '<Station %r>' % self.name

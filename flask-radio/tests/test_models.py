import unittest
from app import create_app, db
from app.models import Station

class StationModelTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def add_station(self):
        station = Station(name='test_station',
                    url='test_url',
                    tags='test_tag1, test_tag2')
        db.session.add(station)
        db.session.commit()

    def test_add_station(self):
        self.add_station()
        r = Station.query.filter_by(name='test_station').first()
        self.assertTrue(r.url == 'test_url')

    def test_update_station(self):
        self.add_station()
        station = Station.query.filter_by(name='test_station').first()
        station.url = 'test_url_2'
        db.session.commit()
        r = Station.query.filter_by(name='test_station').first()
        self.assertTrue(r.url == 'test_url_2')

    def test_remove_station(self):
        self.add_station()
        station = Station.query.filter_by(name='test_station').first()
        db.session.delete(station)
        db.session.commit()
        self.assertTrue(Station.query.count() == 0)

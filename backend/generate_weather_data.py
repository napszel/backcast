#!/usr/bin/python
# -*- coding: utf-8 -*-

import json
import pprint
import sqlite3
pp = pprint.PrettyPrinter(indent=4)

conn = sqlite3.connect('../generated/weather.db')
cur = conn.cursor()
cur.execute('SELECT DISTINCT date_for from forecast;')
dates = cur.fetchall()

bigtable = {}

# dict for each date_for
#    '2020-08-20': {   'Budapest': [   {   'date_taken': '2020-08-13',
#                                          'temp_max': 44.59,
#                                          'temp_min': 34.24,
#                                          'weather_desc': 'Few Clouds',
#                                          'weather_icon': '02d'}],
#                      'Krakow': [   {   'date_taken': '2020-08-13',
#                                        'temp_max': 44.67,
#                                        'temp_min': 35.52,
#                                        'weather_desc': 'Overcast Clouds',
#                                        'weather_icon': '04d'}],
#                      'Zurich': [   {   'date_taken': '2020-08-13',
#                                        'temp_max': 33.79,
#                                        'temp_min': 23.28,
#                                        'weather_desc': 'Broken Clouds',
#                                        'weather_icon': '04d'}]}}

for date in dates:
    cur.execute('SELECT DISTINCT city_id, city.name from forecast JOIN city on city.rowid=forecast.city_id WHERE date_for=?;', (date[0],))
    cities = cur.fetchall()
    next_date = {}
    list_of_cities = {}
    for city_id, city_name in cities:
        cur.execute('SELECT * from forecast WHERE date_for=? AND city_id=? ORDER BY date_taken ASC;', (date[0], city_id))
        next_city = {}
        forecasts = cur.fetchall()
        list_of_forecasts = []
        for fc in forecasts:
            next_data = {}
            next_data["date_taken"] = fc[0]
            next_data["temp_min"] = fc[3]
            next_data["temp_max"] = fc[4]
            next_data["weather_desc"] = fc[5]
            next_data["weather_icon"] = fc[6]
            list_of_forecasts.append(next_data)
        list_of_cities[city_name] = list_of_forecasts

    bigtable[date[0]] = list_of_cities

html = open('../generated/weather_data.js', 'w')
html.write("weather_data = " + json.dumps(bigtable) + "\n")
html.close()

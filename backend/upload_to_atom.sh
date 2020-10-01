#!/bin/bash

set -e

lftp -c "open sftp://napszel:$1@atom.hu && cd public_html/backcast && put ../index.html && put ../javascript.js && put ../style.css && cd generated && put ../generated/weather_data.js" </dev/null >/dev/null

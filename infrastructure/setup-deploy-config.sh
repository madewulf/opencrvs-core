# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.
#
# OpenCRVS is also distributed under the terms of the Civil Registration
# & Healthcare Disclaimer located at http://opencrvs.org/license.
#
# Copyright (C) The OpenCRVS Authors. OpenCRVS and the OpenCRVS
# graphic logo are (registered/a) trademark(s) of Plan International.
set -e
echo
echo "Setting up deployment config for $1 - `date --iso-8601=ns`"

# Set hostname in traefik config
sed -i "s/{{hostname}}/$1/g" /tmp/compose/infrastructure/traefik.toml

# Set hostname in openhim-console config
sed -i "s/{{hostname}}/$1/g" /tmp/compose/infrastructure/openhim-console-config.deploy.json

# Set hostname in compose file
sed -i "s/{{hostname}}/$1/g" /tmp/compose/docker-compose.deploy.yml

# Setup an encryption key for Kibana
KIBANA_ENCRYPTION_KEY=`uuidgen`
sed -i "s/{{KIBANA_ENCRYPTION_KEY}}/$KIBANA_ENCRYPTION_KEY/g" /tmp/compose/infrastructure/monitoring/kibana/kibana.yml
sed -i -e "s%{{SMTP_HOST}}%$SMTP_HOST%" /tmp/compose/infrastructure/monitoring/elastalert/rules/alert.yaml
sed -i -e "s%{{SMTP_PORT}}%$SMTP_PORT%" /tmp/compose/infrastructure/monitoring/elastalert/rules/alert.yaml
sed -i -e "s%{{ALERT_EMAIL}}%$ALERT_EMAIL%" /tmp/compose/infrastructure/monitoring/elastalert/rules/alert.yaml
sed -i -e "s%{{SMTP_USERNAME}}%$SMTP_USERNAME%" /tmp/compose/infrastructure/monitoring/elastalert/rules/auth.yaml
sed -i -e "s%{{SMTP_PASSWORD}}%$SMTP_PASSWORD%" /tmp/compose/infrastructure/monitoring/elastalert/rules/auth.yaml


echo "DONE - `date --iso-8601=ns`"
echo

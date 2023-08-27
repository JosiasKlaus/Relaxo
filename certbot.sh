#!/bin/bash
CERTBOT_DIR="./certbot";
CERTBOT_DIR_FLAGS="--work-dir $CERTBOT_DIR --config-dir $CERTBOT_DIR/config --logs-dir $CERTBOT_DIR/logs";

# Check if running as root
if [ "${EUID:-$(id -u)}" -ne 0 ]; then
    echo "Please run this script as root." >&2;
    exit 1;
fi

# Check if domain argument is given
if [ -z "$1" ]; then
    echo "Please provide a domain as argument." >&2;
    exit 1;
fi

# Check and install certbot
if [ $(dpkg-query -W -f='${Status}' certbot 2>/dev/null | grep -c "ok installed") -eq 0 ]; then
    apt-get update;
    apt-get install -y --no-install-recommends certbot;
fi

# Create certbot folder structure
mkdir -p $CERTBOT_DIR/{config,logs};

# Register certbot account
certbot register $CERTBOT_DIR_FLAGS --non-interactive --register-unsafely-without-email --agree-tos --staging;

# Obtain certificate
certbot certonly $CERTBOT_DIR_FLAGS --non-interactive --standalone --domain $1 --staging;

# Set permissions on directories
chown -R $(logname):$(logname) $CERTBOT_DIR;

exit 0;
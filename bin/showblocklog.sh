#!/usr/bin/expect

set timeout 30
set USER proxy
set PASSWD ws1qa

spawn su $USER
expect "Password: "
send -- "$PASSWD\r"
send -- "exec watch tail -40 /var/log/squid/access-block-regex.log\r"
interact

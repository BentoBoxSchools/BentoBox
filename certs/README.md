## For development
Create a self-signed cert.

```
openssl req -nodes -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365
```

This should create two files
- cert.pem
- key.pem

# digitalocean-api-broker
a simple proxy to provide control over API requests to Digital Ocean. Allows you to obfuscate the API key from end users (useful in a development organization), as well as log requests.

### Usage
```
node main.js
```

### Requirements
* colors
* http-proxy

`DIGITALOCEAN_TOKEN` set as an environment variable at runtime. This should be your Digital Ocean API V2 key.

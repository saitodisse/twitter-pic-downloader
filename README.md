# twitter-pic-downloader

> Downloads images from some twitter stream

### Install cli tool

```sh
npm install twitter-pic-downloader -g
```

----------

### Configure .env file

1) Create an `.env` file:

```sh
touch .env
# or use wget
wget https://raw.githubusercontent.com/saitodisse/twitter-stream-cli/master/.env-example -O .env
```

2) Create an app on https://apps.twitter.com/ and put keys on `.env` file:

```sh
# Twitter API keys: https://apps.twitter.com
CONSUMER_KEY=__XXX__
CONSUMER_SECRET=__XXX__
TOKEN=__XXX__
TOKEN_SECRET=__XXX__

# [optional] Firebase URL: https://www.firebase.com/account
FIREBASE_URL=https://__XXX__.firebaseio.com
```

----------

### Run

Track "photo" and save to "/tmp" folder

```sh
$ twitter-pic-downloader photo -s /tmp
```

----------

### Devs

```sh
npm install
npm test
node ./bin/twitter-pic-downloader.js -h

```


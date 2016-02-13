import merge from 'lodash.merge';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
const superagent = require('superagent');
const Rx = require('rx');

class Saver {
  constructor(opts) {
    this.opts = merge({}, opts);
    dotenv.load({ silent: true });
  }

  save(tweetParsed, destinationPath) {
    return Rx.Observable.create((observer) => {
      const extension = tweetParsed.media_url.replace(/^.+(\.[^.]+)$/, '$1');
      const filename = `${tweetParsed.screen_name} ${tweetParsed.id_str}${extension}`;
      const fullPath = path.join(destinationPath, filename);
      superagent
        .get(tweetParsed.media_url)
        .end((err, res) => {
          fs.writeFile(fullPath, res.body, (error) => {
            if (error) {
              observer.onError(error);
            }
            observer.onNext(fullPath);
          });
        });
    })
  }
}

export default Saver;

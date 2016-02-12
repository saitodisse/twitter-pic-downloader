import merge from 'lodash.merge';
import dotenv from 'dotenv';
import request from 'superagent';
import fs from 'fs';
import path from 'path';

class Saver {
  constructor(opts) {
    this.opts = merge({}, opts);
    dotenv.load({ silent: true });
  }

  save(tweetParsed, destinationPath) {
    const extension = tweetParsed.media_url.replace(/^.+(\.[^.]+)$/, '$1');
    const filename = `${tweetParsed.screen_name} ${tweetParsed.id_str}${extension}`;
    const fullPath = path.join(destinationPath, filename);
    request
      .get(tweetParsed.media_url)
      .end((err, res) => {
        fs.writeFile(fullPath, res.body, (error) => {
          if (error) {
            throw error;
          }
          console.error(`   > saved: ${fullPath}'`);
        });
      });
  }
}

export default Saver;

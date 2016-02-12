import merge from 'lodash.merge';
import dotenv from 'dotenv';
import TwiterStream from 'twitter-stream-cli';
import Formatter from '../formatter';

class Main {
  constructor(opts) {
    this.opts = merge({}, opts);
    dotenv.load({ silent: true });
  }

  getMedia(tweet) {
    return tweet.extended_entities.media.reduce((prev, curr) => {
      prev.push({
        screen_name: tweet.user.screen_name,
        id_str: tweet.id_str,
        media_url: curr.media_url,
      });
      return prev;
    }, []);
  }

  run() {
    const twitterStream = new TwiterStream(this.opts);
    const formatter = new Formatter(this.opts);

    const tweetsWithImages$ = twitterStream.run()
    // all
    .do((x) => {
      if (this.opts['show-all']) {
        formatter.format([x]).forEach((item) => {
          console.error(item);
        });
      }
    })
    // to get only tweets with images
    .filter((x) => x.extended_entities &&
                   x.extended_entities.media &&
                   x.extended_entities.media.length > 0)
    .map((tweet) => {
      return this.getMedia(tweet);
    })
    .selectMany((x, _i) => x)
    .distinct((x) => x.media_url);

    return tweetsWithImages$;
  }
}

export default Main;

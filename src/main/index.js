import merge from 'lodash.merge';
import dotenv from 'dotenv';
import TwiterStream from 'twitter-stream-cli';

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
    const twiterStream = new TwiterStream({
      track: this.opts['track-words']
    });
    return twiterStream.run()
    .startWith(null)
    .filter((x) => x !== null &&
                   x.extended_entities &&
                   x.extended_entities.media &&
                   x.extended_entities.media.length > 0)
    .map((tweet) => {
      return this.getMedia(tweet);
    })
    .selectMany((x, _i) => x)
    .distinct((x) => x.media_url);
  }
}

export default Main;

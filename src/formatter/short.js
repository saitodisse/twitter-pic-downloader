import c from 'chalk';
import { merge, map } from 'lodash';

class ShortFormatter {
  constructor(opts) {
    this._opts = merge({}, opts);
  }

  _getShortTweet(tweetText) {
    let result = tweetText.replace(/[\n\r]/g, ' ');
    if (result.length >= 80) {
      result = result.substring(0, 80);
    }
    return result;
  }

  format(jsonResults) {
    return map(jsonResults, (item) => {
      return [
        ` - @${c.blue.bold(item.user.screen_name)}`,
        ` @${c.italic.gray(item.lang)}`,
        `: ${c.bold(this._getShortTweet(item.text))}`
      ].join('');
    });
  }
}

export default ShortFormatter;


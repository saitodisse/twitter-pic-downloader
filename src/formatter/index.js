import { merge } from 'lodash';
import ShortFormatter from './short';

class Formatter {
  constructor(opts) {
    this._opts = merge({}, opts);
    this._formatterInstance = new ShortFormatter(this._opts);
  }

  format(jsonResults) {
    return this._formatterInstance.format(jsonResults);
  }
}

export default Formatter;

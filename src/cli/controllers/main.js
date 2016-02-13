import { CliController } from 'cli-router';
import Main from '../../main';
import Saver from '../../saver';
const Rx = require('rx');

class MainController extends CliController {
  index(params) {
    const main = new Main(params);
    const saver = new Saver(params);

    // var combination = Rx.Observable.concat(main.run(), source2);
    main.run()
    .map((url) => {
      return saver.save(url, params.save)
      .subscribe((x) => console.log(x));
    })
    .subscribe();

    return Rx.Observable.of(null);
  }
}

export default MainController;

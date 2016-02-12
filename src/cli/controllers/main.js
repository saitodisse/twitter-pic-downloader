import { CliController } from 'cli-router';
import Rx from 'rx';
import Main from '../../main';
import Saver from '../../saver';

class MainController extends CliController {
  index(params) {
    const main = new Main(params);
    const saver = new Saver(params);

    main.run()
    .map((url) => {
      saver.save(url, params.save);
      return url;
    })
    .subscribe();

    return Rx.Observable.of(null);
  }
}

export default MainController;

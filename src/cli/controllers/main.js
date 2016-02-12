import { CliController } from 'cli-router';
import Main from '../../main';
import Saver from '../../saver';

class MainController extends CliController {
  index(params) {
    const main = new Main(params);
    const saver = new Saver(params);
    return main.run()
    .map((url) => {
      saver.save(url, params.save);
      return null;
    });
  }
}

export default MainController;

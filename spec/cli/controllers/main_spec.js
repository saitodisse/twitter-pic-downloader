import h from '../../spec_helper';
import path from 'path';
import MainCliRouter from '../../../src/cli';

describe('controller main:', () => {
  const cli = new MainCliRouter({
    path: path.join(__dirname, '..', '..', '..', '..', 'bin', 'usage.txt'),
    controllers_root: path.join(__dirname, '..', '..', '..', '..', 'src', 'cli', 'controller'),
  });
  const getDocoptResult = (argv) => cli._cli.docopt({ exit: false, argv });

  it('should track-words one word', () => {
    const docoptResult = getDocoptResult(['banana']);
    h.expect(docoptResult['<track-words>']).to.deep.equal(['banana']);
  });

  it('should track-words two words', () => {
    const docoptResult = getDocoptResult(['banana', 'pizza']);
    h.expect(docoptResult['<track-words>']).to.deep.equal(['banana', 'pizza']);
  });

  it('should track-words one "two words"', () => {
    const docoptResult = getDocoptResult(['banana pizza']);
    h.expect(docoptResult['<track-words>']).to.deep.equal(['banana pizza']);
  });

  it('should `--save /tmp` be understood', () => {
    const docoptResult = getDocoptResult(['banana', '--save', '/tmp']);
    h.expect(docoptResult['<track-words>']).to.deep.equal(['banana']);
    h.expect(docoptResult['--save']).to.deep.equal('/tmp');
  });
});

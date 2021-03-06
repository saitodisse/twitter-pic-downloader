import h from '../../spec_helper';
import path from 'path';
import MainCliRouter from '../../../src/cli';

describe('controller main:', () => {
  const cli = new MainCliRouter({
    path: path.join(__dirname, '..', '..', '..', '..', 'bin', 'usage.txt'),
    controllers_root: path.join(__dirname, '..', '..', '..', '..', 'src', 'cli', 'controller'),
  });
  const getDocoptResult = (argv) => cli._cli.docopt({ exit: false, argv });

  it('should track one word', () => {
    const docoptResult = getDocoptResult(['--save', '/tmp', 'banana']);
    h.expect(docoptResult['<track>']).to.deep.equal(['banana']);
  });

  it('should track two words', () => {
    const docoptResult = getDocoptResult(['--save', '/tmp', 'banana', 'pizza']);
    h.expect(docoptResult['<track>']).to.deep.equal(['banana', 'pizza']);
  });

  it('should track one "two words"', () => {
    const docoptResult = getDocoptResult(['--save', '/tmp', 'banana pizza']);
    h.expect(docoptResult['<track>']).to.deep.equal(['banana pizza']);
  });

  it('should `--save /tmp` be understood', () => {
    const docoptResult = getDocoptResult(['--save', '/tmp', 'banana']);
    h.expect(docoptResult['<track>']).to.deep.equal(['banana']);
    h.expect(docoptResult['--save']).to.deep.equal('/tmp');
  });
});

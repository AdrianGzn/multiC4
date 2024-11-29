import { ToLowercasePipe } from './to-lowercase.pipe';

describe('ToLowercasePipe', () => {
  it('create an instance', () => {
    const pipe = new ToLowercasePipe();
    expect(pipe).toBeTruthy();
  });
});

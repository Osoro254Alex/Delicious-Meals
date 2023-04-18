const renderlike = require('./renderLike.js');

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(
    [
      {
        id: '1',
      },
      {
        id: '2',
      },
    ],
  ),
}));

describe('check the render like ', () => {
  test('render like ', async () => {
    const liks = await renderlike();
    expect(liks.length).toBe(2);
  });
});
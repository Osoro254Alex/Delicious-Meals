const renderComment = require('./rendercomment.js');

global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(
      [
        {
          id: '1',
          name: 'Rashid',
          comment: 'How are you',
        },
        {
          creation_date: '2',
          username: 'Sami',
          comment: 'Yes',
        },
      ],
    ),
  }));

describe('something is testing',()=>{
    test('test comment', async()=>{
        let comments = await renderComment(1,"Rashid","Hi Rashid");
        expect(comments.length).toBe(2);
    })
})
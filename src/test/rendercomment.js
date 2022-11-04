const commUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/7wsNKEjPfzGMOmZ1AdMF/comments';

const renderComment = async (id, name, comm) => {
  const body = JSON.stringify({ item_id: id, username: name, comment: comm });
  const comments = await fetch(commUrl, {
    method: 'POST',
    body,
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  });
  const data = await comments.json();
  return data;
};

module.exports = renderComment;
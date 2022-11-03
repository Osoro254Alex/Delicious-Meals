const commUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/7wsNKEjPfzGMOmZ1AdMF/comments';

const renderComment = async (id, name, comm) => {
  const body = JSON.stringify({ item_id: id, username: name, comment: comm });
 await fetch(commUrl, { method: 'POST', body, headers: { 'Content-type': 'application/json; charset=UTF-8' } });
};
export default renderComment;
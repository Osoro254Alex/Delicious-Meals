const involve = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/7wsNKEjPfzGMOmZ1AdMF/likes/';

const getArr = async () => {
  const response = await fetch(involve);
  return response.json();
};

module.exports = getArr;

import './style.css';
import './stylepopup.css';
import popData from './modules/popup.js';
import foods from './modules/recordfood.js';

const cardsContainer = document.querySelector('.card-cont');
const url = 'https://www.themealdb.com/api/json/v1/1/search.php?f=d';

const involve = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/7wsNKEjPfzGMOmZ1AdMF/likes/';

const liking = (arr) => {
  const ids = document.querySelectorAll('.likes');
  arr.forEach((element) => {
    ids.forEach((id) => {
      if ((element.item_id) === Number((id.dataset.id))) {
        id.innerText = `${element.likes} Likes`;
      }
    });
  });
};

const getArr = () => {
  fetch(involve)
    .then((response) => response.json())
    .then((data) => liking(data));
};

cardsContainer.addEventListener('click', (e) => {
  if (e.target.className === 'fa-regular fa-heart icon') {
    const { children } = e.target.parentElement;
    const childArr = Array.from(children);
    childArr.forEach((child) => {
      child.classList.toggle('active');
    });
  }
});

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    data = data.meals;
    data.pop();
    data.forEach((item) => {
      cardsContainer.innerHTML += `
        <section class="card">
          <img class="card-img" src="${item.strMealThumb
}" alt="Meal-image">
          <div class="row">
              <h3>${item.strMeal}</h3>
              <div id="${item.idMeal}" class = "icon-bag">
                <i class="fa-regular fa-heart icon"></i>
                <i class="fa-solid fa-heart icon active"></i>
              </div>
          </div>
          <p data-id ="${item.idMeal}" class="likes">5 Likes</p>
          <div class="btns">
              <button data-name ="${item.idMeal}" class="comment">Comments</button>
          </div>
        </section>`;
    });

    const comment = Array.from(document.querySelectorAll('.comment'));
    comment.forEach((itemss) => {
      itemss.addEventListener('click', (e) => {
        data.forEach((item) => {
          if (item.idMeal === e.target.dataset.name) {
            popData(e.target.dataset.name);
          }
        });
      });
    });

    const like = Array.from(document.querySelectorAll('.fa-regular'));
    like.forEach((item) => {
      item.addEventListener('click', () => {
        let make = parseInt(item.parentElement.parentElement.nextElementSibling.innerText, 10);
        const identit = Number(item.parentElement.id);

        const object = {
          item_id: identit,
          likes: make,
        };

        fetch(involve, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(object),
        });

        make += 1;

        item.parentElement.parentElement.nextElementSibling.innerText = `${make} Likes`;
      }, { once: true });
    });

    const allFoods = Array.from(document.querySelectorAll('.card'));
    const meals = document.querySelector('.title');
    meals.innerText = `Delicious Meals(${foods(allFoods)})`;
  })
  .then(getArr());

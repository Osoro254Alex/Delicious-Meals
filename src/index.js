import { identity, once } from 'lodash';
import './style.css';

const cardsContainer = document.querySelector(".card-cont")
const url = 'https://www.themealdb.com/api/json/v1/1/search.php?f=k';

const involve = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/wIvcfoeCMowsKdAOdXJy/likes/';

const liking = (arr) => {
  const ids = document.querySelectorAll('.likes');
  arr.forEach((element) => {
    ids.forEach((id) => {
      if ((element.item_id) === Number((id.dataset.id))) {
        console.log(ids)
        ids.innerText = `${element.likes} likes`;
      }
    });
  });
};

const getArr = () => {
  fetch(involve)
    .then((response) => response.json())
    .then((data) => liking(data));
};


fetch(url)
  .then((res) => res.json())
  .then((data) => {
    data = data.meals;
    data.pop()
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
          <p data-id ="${item.idMeal}" class="likes">0 Likes</p>
          <div class="btns">
              <button class="comment">Comments</button>
          </div>
        </section>`;
    });

  });

cardsContainer.addEventListener("click", (e)=>{

if(e.target.className === "fa-regular fa-heart icon"){
  const children = e.target.parentElement.children;
  const childArr = Array.from(children)
  childArr.forEach((child) =>{
    child.classList.toggle("active")
  })

}

if(e.target.className === "fa-regular fa-heart icon active"){
  const identit = (Number(e.target.parentElement.id))
  let likes = parseInt(e.target.parentElement.parentElement.nextElementSibling.innerText)
  const object = {
    item_id: identit,
    likes: likes,
  };
  fetch(involve, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(object),
  });
  likes += 1;

  e.target.parentElement.parentElement.nextElementSibling.innerText = `${likes} likes;`
}

})
.then(getArr())




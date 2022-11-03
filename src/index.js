import { identity, once } from 'lodash';
import './style.css';
import './stylepopup.css';

const cardsContainer = document.querySelector(".card-cont")
const center = document.getElementById('center');
const url = 'https://www.themealdb.com/api/json/v1/1/search.php?f=h';

const involve = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/wIvcfoeCMowsKdAOdXJy/likes/';


const liking = (arr) => {
  const ids = document.querySelectorAll('.likes');
  arr.forEach((element) => {
    ids.forEach((id) => {
      if ((element.item_id) === Number((id.dataset.id))) {
        id.innerText = `${element.likes} likes`;
      }
    });
  });
};


const getArr = () => {
  fetch(involve)
    .then((response) => response.json())
    .then((data) => liking(data));
};


cardsContainer.addEventListener("click", (e)=>{

  if(e.target.className === "fa-regular fa-heart icon"){
    const children = e.target.parentElement.children;
    const childArr = Array.from(children)
    childArr.forEach((child) =>{
      child.classList.toggle("active")
    })
  
  }
  
  })


fetch(url)
  .then((res) => res.json())
  .then((data) => {
    data = data.meals;
    data.pop()
    data.forEach((item) => {
      console.log(item);
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
          <p hidden>${item.strInstructions}</p>
              <button class="comment">Comments</button>
          </div>
        </section>`;
    });


    const comment = Array.from(document.querySelectorAll('.comment'));
    comment.forEach((item)=>{
      item.addEventListener('click', ()=>{
        center.innerHTML='';
        center.style.display="flex";
    
        center.innerHTML +=
        `<section class="modal-section">
        <div class="container">
            <div class="xicon"><i class="fa-solid fa-xmark" id="x-marks"></i></div>
            <img class="foodimg"
                src="${item.parentElement.parentElement.children[0].getAttribute('src')}"
                alt="">
            <h3 class="dfi">${item.parentElement.parentElement.children[1].children[0].innerText}</h3>
            <p class="paragraph">${item.previousElementSibling.innerText}</p>
            <p class="comments">Comments</p>
            <p class="atc">Add To Comment</p>
            <input type="text" class="name" id="name" placeholder="Enter Your Name">
            <textarea name="comments" id="comments" class="commentpopup">
            </textarea>
            <input type="submit" value="Submit" class="submit">
        </div>
      </div>
</section>`;   
let xMaks=document.getElementById("x-marks");
xMaks.addEventListener('click',()=>{
  center.innerHTML='';
  center.style.display="none";

})
})});

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

    item.parentElement.parentElement.nextElementSibling.innerText = `${make} likes;`
  }, { once: true });
});
})
.then(getArr());











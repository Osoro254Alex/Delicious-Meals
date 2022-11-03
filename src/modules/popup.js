import renderComment from './rendercomment.js';

const cardsCont = document.querySelector('.card-cont');
const popCont = document.querySelector('.center');

const popData = async (elId) => {
  let mealInfo = '';
  await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${elId}`)
    .then((res) => res.json())
    .then((arr) => {
      arr = arr.meals;
      mealInfo = arr;
      return fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/7wsNKEjPfzGMOmZ1AdMF/comments?item_id=${elId}`);
    })
    .then((response) => response.json())
    .then((comms) => {
      popCont.innerHTML = `
  <section class="modal-section">
  <div class="container">
      <div class="xicon"><i class="fa-solid fa-xmark"></i></div>
      <img class="foodimg" src="${mealInfo[0].strMealThumb
}" alt="">
      <h3 class="dfi">${mealInfo[0].strMeal}</h3>
      <div class="Infor-meal">
        <div class="Infor-meal-left">
          <ul class="Infor-meal-ul">
            <li><strong>Category:</strong> <span> &nbsp </span> ${mealInfo[0].strCategory}</li>
            <li><strong>Watch Video:</strong><span> &nbsp </span> <a href="${mealInfo[0].strYoutube}" class="link">Youtube Link</a></li>
          </ul>
        </div>
        <div class="Infor-meal-right">
          <ul class="Infor-meal-ul">
            <li><strong>Tags:</strong> <span> &nbsp </span> ${mealInfo[0].strTags}</li>
            <li><strong>Area:</strong> <span> &nbsp </span> ${mealInfo[0].strArea}</li>
          </ul>
        </div>
      </div>
      <p class="comments">Comments</p>
      <div class="con-comm">
      </div>
      <p class="atc">Add To Comment</p>
      <form class="form" action="">
        <input type="text" class="name" id="name" placeholder="Enter Your Name" required>
        <textarea class="commentpopup" cols = 30 rows = 5 placeholder="Add your Comment" required></textarea>
        <input type="submit" value="Submit" class="submit">
      </form>
      </div>

  </div>
</section>`;

      let todayDate = new Date();
      const dd = String(todayDate.getDate()).padStart(2, '0');
      const mm = String(todayDate.getMonth() + 1).padStart(2, '0');
      const yyyy = todayDate.getFullYear();
      todayDate = `${dd}/${mm}/${yyyy}`;

      let totalComms = comms.length;

      const commee = document.querySelector('.comments');
      const commentCont = document.querySelector('.con-comm');

      if (!(totalComms > 0)) {
        totalComms = 0;
        commee.innerText = `Comments (${totalComms})`;
      } else {
        commee.innerText = `Comments (${totalComms})`;
        comms.forEach((item) => {
          commentCont.innerHTML += `
    <p> 
    <time class ="time">${todayDate}</time>   
    <big class="name-comme">${item.username} :</big> 
    <i class="comme">${item.comment}</i>
    </p>`;
        });
      }

      popCont.classList.add('popin');
      popCont.classList.remove('displayer');
      cardsCont.classList.add('body');

      const cancel = document.querySelector('.fa-xmark');
      cancel.addEventListener('click', (e) => {
        e.target.parentElement.parentElement.parentElement.parentElement.classList.remove('popin');
        popCont.classList.add('displayer');
        cardsCont.classList.remove('body');
      });

      const nameInput = document.querySelector('.name');
      const commInput = document.querySelector('.commentpopup');

      const submit = document.querySelector('.submit');
      submit.addEventListener('click', (e) => {
        e.preventDefault();

        

        if (!(nameInput.value === '' || commInput.value === '')) {
          renderComment(elId, nameInput.value, commInput.value);
          totalComms += 1;
          commee.innerText = `Comments (${totalComms})`;

          commentCont.innerHTML += `
    <p> 
    <time class ="time">${todayDate}</time>   
    <big class="name-comme">${nameInput.value} :</big> 
    <i class="comme">${commInput.value}</i>
    </p>`;

          document.forms[0].reset();
        }
      });
    });
};

export default popData;

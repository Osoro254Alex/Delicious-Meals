

const popCont = document.querySelector(".center")
const popData = async (arrElem) => {          
  popCont.innerHTML = `
  <section class="modal-section">
  <div class="container">
      <div class="xicon"><i class="fa-solid fa-xmark"></i></div>
      <img class="foodimg" src="${arrElem.strMealThumb
      }" alt="">
      <h3 class="dfi">${arrElem.strMeal}</h3>
      <p class="paragraph">${arrElem.strInstructions}</p>
      <p class="comments">Comments</p>
      <p class="atc">Add To Comment</p>
      <input type="text" class="name" id="name" placeholder="Enter Your Name">
      <textarea name="comments" id="comments" class="commentpopup" placeholder="Enter Your Name">
      </textarea>
      <input type="submit" value="Submit" class="submit">
      </div>

  </div>
</section>`;

popCont.classList.add("popin")
popCont.classList.remove("displayer")

const smallPop = document.querySelector(".modal-section")
const cancel = document.querySelector(".fa-xmark")
cancel.addEventListener("click", (e)=>{
 e.target.parentElement.parentElement.parentElement.parentElement.classList.remove("popin")
 popCont.classList.add("displayer")
})
}

export default popData;



       

        

var searchBtn = document.getElementById("search-btn");
var mealList = document.getElementById("meal");
var mealDetailsContent = document.querySelector(".meal-details-content");
var recipeCloseButton = document.getElementById("recipe-close-btn");

// event listener
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
recipeCloseButton.addEventListener("click", () => {
  mealDetailsContent.parentElement.classList.remove('showRecipe');
});

// get meal list
function getMealList() {
  var searchInputTxt = document.getElementById("search-input").value.trim();
  console.log(searchInputTxt);
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
  .then(response => response.json())
  .then(data => {
    var html = "";
    if (data.meals) {
      data.meals.forEach(meal => {
        html += `
        <div class="meal-item" data-id="${meal.idMeal}>
         <div class="meal-img">
          <img src="${meal.strMealThumb}" alt="food">
         </div>
        <div class="meal-name">
          <h3>${meal.strMeal}</h3>
          <a href="#" class="recipe-btn">Grab Recipe</a>
        </div>
      </div>
      `;
      });
      mealList.classList.remove("notFound");
    } else {
      html = "The Mad Archer didn't find any meals with those ingredients.";
      mealList.classList.add("notFound");
    }
    mealList.innerHTML = html;
  })
}

function getMealRecipe(event) {
  event.preventDefault();
  if (event.target.classList.contains("recipe-btn")) {
    var mealItem = event.target.parentElement.parentElement;
    fetch(`https//www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
      .then(response => response.json())
      .then(data => mealRecipeModal(data.meals));
  }
}

function mealRecipeModal(meal) {
  console.log(meal);
  meal = meal[0];
  var html = `
    <h2 class="recipe-title">${meal.strMeal}/h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instruct">
      <h3>Instructions:</h3>
      <p>${meal.strInstructions}</p>
    </div>
    <div class="recipe-meal-img">
      <img src="${meal.strMealThumb}" alt="food image">
    </div>
    <div class="recipe-link">
      <a href="${meal.strYouTube}" target="_blank">Watch Video</a>
    </div>
    `;
    mealDetailsContentContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe')
}


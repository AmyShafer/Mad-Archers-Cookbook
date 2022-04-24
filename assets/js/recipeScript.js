var searchButton = document.getElementById('search-button');
var possibleRecipes = document.getElementById('meal');
var seeRecipe = document.querySelector('.selected-recipe-info');
var searchHistory = document.querySelector('.past-ingredients');
var closeButton = document.getElementById('recipe-close-button');

// Recipe matches with the ingredient user entered
function getPossibleRecipes() {
   var searchInputText = document.getElementById('search-input').value.trim();
   var mostRecentSearchKey = localStorage.setItem("Most Recent Search:", searchInputText);
   lastSearch();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "recipe-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            possibleRecipes.classList.remove('noMatches');
        } else {
            html = "Mad Archer did not find any recipes with the ingredients you entered!";
            possibleRecipes.classList.add('noMatches');
        }

        possibleRecipes.innerHTML = html;
    });
}

// get recipe of the meal the user selected
function selectRecipe(event) {
    event.preventDefault();
    if(event.target.classList.contains('recipe-btn')) {
        let mealItem = event.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => recipeCard(data.meals));
    }
}

// display the recipe card when clicked
function recipeCard(meal){
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "youtube-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    seeRecipe.innerHTML = html;
    seeRecipe.parentElement.classList.add('showRecipe');
}

function lastSearch () {
  searchHistory.setAttribute("style", "display: block;");
  var pastIngredient = localStorage.getItem("Most Recent Search:");
  var ingredientToAdd = "";
  ingredientToAdd = document.createElement("li");
  ingredientToAdd.setAttribute("style", "display: block; color: #fff243; font-size: 3em");
  ingredientToAdd.textContent = pastIngredient; 
  console.log(ingredientToAdd);
  searchHistory.appendChild(ingredientToAdd);
}

lastSearch();
// Event Listeners
searchButton.addEventListener('click', getPossibleRecipes);
possibleRecipes.addEventListener('click', selectRecipe);
closeButton.addEventListener('click', () => {
    seeRecipe.parentElement.classList.remove('showRecipe');
});
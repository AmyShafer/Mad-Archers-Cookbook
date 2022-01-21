var searchButton = document.getElementById('search-button');
var possibleRecipes = document.getElementById('meal');
var seeRecipe = document.querySelector('.meal-details-content');
var recipeCloseBtn = document.getElementById('recipe-close-btn');

// get meal list that matches with the ingredients
function getMealList(){
   var searchInputText = document.getElementById('search-input').value.trim();
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
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            possibleRecipes.classList.remove('notFound');
        } else{
            html = "Mad Archer did not find any recipes with the ingredients you entered!";
            possibleRecipes.classList.add('notFound');
        }

        possibleRecipes.innerHTML = html;
    });
}


// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => recipeCard(data.meals));
    }
}

// create a modal
function recipeCard(meal){
    console.log(meal);
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
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    seeRecipe.innerHTML = html;
    seeRecipe.parentElement.classList.add('showRecipe');
}

// event listeners
searchButton.addEventListener('click', getMealList);
possibleRecipes.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    seeRecipe.parentElement.classList.remove('showRecipe');
});
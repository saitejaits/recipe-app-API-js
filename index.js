const searchBoxEl = document.querySelector(".searchBox");
const searchBtnEl = document.querySelector(".searchBtn");
const recipe_containerEl = document.querySelector(".recipe-container");
const recipeDtailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtnEl = document.querySelector(".recipe-closeBtn")



const fetchRecipes = async (query) => {
    recipe_containerEl.innerHTML = "<h2>Feching Recipes...</h2>";
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
    
        recipe_containerEl.innerHTML = "";
        response.meals.forEach(meal => {
            const recipeDiv = document.createElement("div");
            recipeDiv.classList.add("recipe");
            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}">
                <h3>${meal.strMeal}</h3>
                <p><span>${meal.strArea}</span>Dish</p>
                <p>Belongs to <span>${meal.strCategory}</span> Category</p>
            
            `
            const button = document.createElement("button");
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button);
    
            button.addEventListener("click", () => {
                openRecipePopup(meal);
            })
    
            recipe_containerEl.appendChild(recipeDiv);
            // console.log(meal)
        })
    } catch (error) {
        recipe_containerEl.innerHTML = "<h2>Error in Feching Recipes...</h2>";
    }

    // console.log(response.meals[0]);
}

// Function to fetch Ingredients and measurements
const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for (let i=1; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else {
            break;
        }
    }
    return ingredientsList;
    // console.log(meal);
}

const openRecipePopup = (meal) => {
    recipeDtailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>

    <div class="recipeInstructions">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    
    `
    recipeDtailsContent.parentElement.style.display = "block";
}
// close btn
recipeCloseBtnEl.addEventListener("click", () =>{
    recipeDtailsContent.parentElement.style.display= "none"
})

searchBtnEl.addEventListener("click",(e) => {
    e.preventDefault();
    const searchInput = searchBoxEl.value.trim();

    if(!searchInput) {
        recipe_containerEl.innerHTML = `<h2>Type the meal in the search bar </h2>`
        return;
    }

    fetchRecipes(searchInput);
    // console.log("Button Clicked");
})
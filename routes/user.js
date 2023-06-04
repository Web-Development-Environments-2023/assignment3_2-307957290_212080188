var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const user_utils = require("./utils/user_utils");
const recipe_utils = require("./utils/recipes_utils");

/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) {
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT user_id FROM users").then((users) => {
      if (users.find((x) => x.user_id === req.session.user_id)) {
        req.user_id = req.session.user_id;
        next();
      }
    }).catch(err => next(err));
  } else {
    res.sendStatus(401);
  }
});


/**
 * This path gets body with recipeId and save this recipe in the favorites list of the logged-in user
 */
router.post('/favorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipeId;

    await user_utils.markAsFavorite(user_id,recipe_id);
    res.status(200).send("The Recipe successfully saved as favorite");
    } catch(error){
    next(error);
  }
})

// /**
//  * This path returns the favorites recipes that were saved by the logged-in user
//  */

router.get('/favorites', async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const recipes = await user_utils.getFavoriteRecipes(user_id);
    const recipeIds = recipes.map((recipe) => recipe.recipeId);
    
    let results = [];
    for (const recipeId of recipeIds) {
      const recipe = await recipe_utils.getRecipeDetails(recipeId);
      results.push(recipe);
    }
    
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
});



/**
 * This path gets body with recipe's details and save this recipe in the UserRecipes table and list in recipes tables
 */
router.post('/addMyRecipe', async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const recipe_id = req.body.id;


    // Get the recipe details from the request body
    const recipeDetails = req.body;

    // Call the function to add the recipe
    await recipe_utils.addRecipe(recipeDetails);
    await user_utils.markAsMyRecipe(user_id, recipe_id); 


    res.status(200).send("Your recipe has been added successfully.");
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns the recipes added by the logged-in user
 */
router.get('/addMyRecipe', async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const recipes = await user_utils.getMyRecipe(user_id);
    // console.log("1: ", recipes)
    const recipeIds = recipes.map((recipe) => recipe.recipe_id);

    // console.log("2: ", recipeIds)

    let results = [];
    for (const recipeId of recipeIds) {
      const recipe = await recipe_utils.getRecipeDetails(recipeId);
      results.push(recipe);
    }
    
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
});

/**
 * This path gets body with recipeId and save this recipe in the family recipes list of the logged-in user
 */
router.post('/family', async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipeId;
    

    await user_utils.markAsFamilyRecipe(user_id, recipe_id);
    res.status(200).send("The recipe has been successfully saved as a family recipe");
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns the family recipes that were saved by the logged-in user
 */
router.get('/family', async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const recipes = await user_utils.getFamilyRecipes(user_id);
    const recipeIds = recipes.map((recipe) => recipe.recipeId);

    let results = [];
    for (const recipeId of recipeIds) {
      const recipe = await recipe_utils.getRecipeDetails(recipeId);
      results.push(recipe);
    }

    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
});

router.get("recipe/:recipeId", async (req, res, next) => {
  try {
    console.log(": ", req.params.recipeId);
    const recipe = await recipe_utils.getRecipeDetails(req.params.recipeId);
    const ingredients = await recipe_utils.getRecipeIngredients(req.params.recipeId);
    const directions = await recipe_utils.getRecipeDirections(req.params.recipeId);
    
    // Add the ingredients to the recipe object
    recipe.ingredients = ingredients;
    recipe.directions = directions;
    

    await recipe_utils.markLastViewedRecipes(user_id, req.params.recipeId);

    
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});


router.get("/recipe/:recipeId", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;

    console.log(": ", req.params.recipeId);
    const recipe = await recipe_utils.getRecipeDetails(req.params.recipeId);
    const ingredients = await recipe_utils.getRecipeIngredients(req.params.recipeId);
    const directions = await recipe_utils.getRecipeDirections(req.params.recipeId);
    
    // Add the ingredients to the recipe object
    recipe.ingredients = ingredients;
    recipe.directions = directions;
    

    await recipe_utils.markLastViewedRecipes(user_id, req.params.recipeId);

    
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns the last 3 recipes viewed by the logged-in user
 */

router.get('/recipe', async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const lastViewedRecipes = await user_utils.getLastViewedRecipes(user_id);

    let results = [];
    for (const recipeId of lastViewedRecipes.slice(0, 3)) {
      const recipe = await recipe_utils.getRecipeDetails(recipeId);
      results.push(recipe);
    }

    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
});







module.exports = router;

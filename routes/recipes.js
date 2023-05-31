var express = require("express");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");

// router.get("/", (req, res) => res.send("im here"));
/**
 * Authenticate all incoming requests by middleware
 */
// router.use(async function (req, res, next) {
//   if (req.session && req.session.user_id) {
//     DButils.execQuery("SELECT user_id FROM users").then((users) => {
//       if (users.find((x) => x.user_id === req.session.user_id)) {
//         req.user_id = req.session.user_id;
//         next();
//       }
//     }).catch(err => next(err));
//   } else {
//     res.sendStatus(401);
//   }
// });


/**
 * This path returns all recipes for a user
 * !!!!!!!!!!!!Need to change!!!!!
 */
router.get("/", async (req, res, next) => {
  try {
    // Retrieve the user ID from the request query
    // const user_id = req.session.user_id;

    // Call the function to get all recipes for the user
    // const recipes = await recipes_utils.getUserRecipes(user_id);
    
    res.send(recipes);
  } catch (error) {
    next(error);
  }
});

/**
 * This pat  h adds a recipe by a user
 */
router.post("/", async (req, res, next) => {
  try {
    // Get the recipe details from the request body
    const recipeDetails = req.body;

    // Call the function to add the recipe
    await recipes_utils.addRecipe(recipeDetails);

    res.status(201).send("Recipe successfully added");
  } catch (error) {
    next(error);
  }
});


/**
 * This path returns a full details of a recipe by its id
 */
router.get("/:recipeId", async (req, res, next) => {
  try {
    console.log(": ", req.params.recipeId)
    const recipe = await recipes_utils.getRecipeDetails(req.params.recipeId);
    const ingredients = await recipes_utils.getRecipeIngredients(req.params.recipeId);
    const directions = await recipes_utils.getRecipeDirections(req.params.recipeId);

    // Add the ingredients to the recipe object
    recipe.ingredients = ingredients;
    recipe.directions = directions;



    res.send(recipe);
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns a full details of a recipe by its id
 */
router.delete("/:recipeId", async (req, res, next) => {
  try {
    console.log(": ", req.params.recipeId)
    await recipes_utils.deleteRecipe(req.params.recipeId);
    res.send(204);
  } catch (error) {
    next(error);
  }
});

router.put("/:recipeId", async (req, res, next) => {
  try {
    console.log(": ", req.params.recipeId)
    await recipes_utils.updateRecipe(req.params.recipeId, req.body);
    res.send(200);
  } catch (error) {
    next(error); 
  }
});

// router.get("/search", async (req, res, next) => {
//   try {
//     const { query, filter, sort, limit } = req.query;
//     const results = await recipes_utils.searchRecipes(query, filter, sort, limit);
//     res.status(200).json({ results });
//   } catch (error) {
//     next(error); 
//   }
// });


module.exports = router;

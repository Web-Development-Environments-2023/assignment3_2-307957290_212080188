var express = require("express");
var router = express.Router();
const recipe_utils = require("./utils/recipes_utils");
const serach_itils = require("./utils/search_utils");

router.get("", async (req, res, next) => {
    try {
      const { query, filter, sort, limit } = req.query;

      const recipes = await serach_itils.searchRecipes(filter, sort, limit);
      // const recipeIds = rows.map((row) => row.id);
      
      const recipeIds = recipes.map((recipe) => recipe.id);
      let results = [];
      for (const recipeId of recipeIds) {
        const recipe = await recipe_utils.getRecipeDetails(recipeId);
        results.push(recipe);
      }
      
      res.status(200).send(results);
    //   res.status(200).json({ results });
    } catch (error) {
      next(error); 
    }
});
  
  
  module.exports = router;
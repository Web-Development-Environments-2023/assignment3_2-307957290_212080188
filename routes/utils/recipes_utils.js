const DButils = require("./DButils");


    async function getRecipeDetails(recipe_id) {
        return await getRecipePreview(recipe_id);
    }
      
    async function getRecipePreview(recipe_id) {
        const recipePreview = await DButils.execQuery(`SELECT * FROM recipePreview WHERE id = ${recipe_id}`);      
        if (recipePreview.length > 0) {
          const { id, title, image, readyInMinutes, popularity, vegetarian, vegan, glutenFree } = recipePreview[0];
      
          return {
            id,
            title,
            image,
            readyInMinutes,
            popularity,
            vegetarian,
            vegan,
            glutenFree,
          };
        } 
        else {
          throw new Error("Recipe not found");
        }
    }


  async function addRecipe(recipeDetails) {
      try {
        // Extract the recipe details from the recipeDetails object.
        const { id, title, image, readyInMinutes, popularity, vegetarian, vegan, glutenFree, ingredients, directions } = recipeDetails;

        // Insert the recipe details into the Recipe table.
        await DButils.execQuery(`
          INSERT INTO RecipePreview (id, title, image, readyInMinutes, popularity, vegetarian, vegan, glutenFree)
          VALUES (${id}, '${title}', '${image}', ${readyInMinutes}, ${popularity}, ${vegetarian ? 1 : 0}, ${vegan ? 1 : 0}, ${glutenFree ? 1 : 0})
        `);

        // Insert the recipe ingredients into the RecipeIngredients table.
        for (const ingredient of ingredients) {
          const { name, amount, unit } = ingredient;
          await DButils.execQuery(`
            INSERT INTO RecipeIngredients (recipeId, name, amount, unit)
            VALUES (${id}, '${name}', ${amount}, '${unit}')
          `);
        }
        // Insert the recipe directions into the RecipeDirections table.
        for (let i = 0; i < directions.length; i++) {
          for(let j = 0; j < directions[i].length; j++){
            console.log("directions: ", directions[i][j])
            const stepNumber = j + 1; // Increment the step number
            const instruction = directions[i][j];
            await DButils.execQuery(`
            INSERT INTO RecipeDirections (recipeId, stepNumber, instruction)
            VALUES (${id}, ${stepNumber}, '${instruction}')`);
          }
        }

      // Return the inserted recipeId or any other necessary information
      return id;
    } catch (error) {
      throw error;
    }
  }

  async function getRecipeIngredients(recipeId) {
    const ingredients = await DButils.execQuery(`SELECT name, amount, unit FROM recipeIngredients WHERE recipeId = '${recipeId}'`);
    return ingredients.map((ingredient) => ({
      name: ingredient.name,
      amount: ingredient.amount,
      unit: ingredient.unit
    }));
  }


    async function getRecipeDirections(recipeId) {
      const directions = await DButils.execQuery(
        `SELECT stepNumber, instruction FROM RecipeDirections WHERE recipeId = '${recipeId}' ORDER BY stepNumber`
      );
    
      return directions.map((direction) => {
        const instructionList = direction.instruction.split(",").map((instruction) => instruction.trim());
        return {
          stepNumber: direction.stepNumber,
          instruction: instructionList,
        };
      });
    }

  // Function to delete a recipe by ID
  async function deleteRecipe(recipeId) {
    // Delete a row from RecipePreview where id is recipeId.
    await DButils.execQuery(`DELETE FROM RecipePreview WHERE id = ${recipeId}`);
  }

  async function updateRecipe(recipeId, recipeDetails){
    deleteRecipe(recipeId);
    addRecipe(recipeDetails);
  }

  



module.exports = {
  addRecipe,
  getRecipeDetails,
  getRecipeIngredients,
  getRecipeDirections,
  deleteRecipe,
  updateRecipe
};
      




// exports.getRecipeDetails = getRecipeDetails;

// exports.getRecipePreview = getRecipePreview;


// const axios = require("axios");
// const api_domain = "https://api.spoonacular.com/recipes";



// /**
//  * Get recipes list from spooncular response and extract the relevant recipe data for preview
//  * @param {*} recipes_info 
//  */


// async function getRecipeInformation(recipe_id) {
//     return await axios.get(`${api_domain}/${recipe_id}/information`, {
//         params: {
//             includeNutrition: false,
//             apiKey: process.env.spooncular_apiKey
//         }
//     });
// }



// async function getRecipeDetails(recipe_id) {
//     let recipe_info = await getRecipeInformation(recipe_id);
//     let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = recipe_info.data;

//     return {
//         id: id,
//         title: title,
//         readyInMinutes: readyInMinutes,
//         image: image,
//         popularity: aggregateLikes,
//         vegan: vegan,
//         vegetarian: vegetarian,
//         glutenFree: glutenFree,
        
//     }
// }



// exports.getRecipeDetails = getRecipeDetails;




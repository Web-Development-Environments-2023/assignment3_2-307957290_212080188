const DButils = require("./DButils");


async function markAsFavorite(user_id, recipe_id) {
    const existingFavorite = await DButils.execQuery(
        `SELECT * FROM FavoriteRecipes WHERE user_id='${user_id}' AND recipeId=${recipe_id}`
    );

    if (existingFavorite.length > 0) {
        console.log("User and recipe already exist in favorites.");
        return;
    }

    await DButils.execQuery(`INSERT INTO FavoriteRecipes VALUES ('${user_id}', ${recipe_id})`);
}


async function getFavoriteRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipeId from FavoriteRecipes where user_id='${user_id}'`);
    // console.log("recipes_id:", recipes_id);
    return recipes_id;
}

async function markAsMyRecipe(user_id, recipe_id){
    // Check if the recipe already exists in the UserRecipes table 
    const existingMyRecipe = await DButils.execQuery(
        `SELECT * FROM UserRecipes WHERE user_id='${user_id}' AND recipe_id=${recipe_id}`
    );
    if (existingMyRecipe.length > 0) {
        console.log("The recipe already exists in the UserRecipes table.");
        return;
    }

    // Insert the user's own recipe into the UserRecipes table
    await DButils.execQuery(`
      INSERT INTO UserRecipes (user_id, recipe_id)
      VALUES (${user_id}, ${recipe_id})
    `);
}

async function getMyRecipe(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from UserRecipes where user_id='${user_id}'`);
    // console.log("recipes_id:", recipes_id);
    return recipes_id;
}



exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;
exports.markAsMyRecipe = markAsMyRecipe;
exports.getMyRecipe = getMyRecipe;

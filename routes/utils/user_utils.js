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

async function markAsFamilyRecipe(user_id, recipe_id) {
    const existingFamilyRecipe = await DButils.execQuery(
        `SELECT * FROM FamilyRecipes WHERE user_id='${user_id}' AND recipeId=${recipe_id}`
    );

    if (existingFamilyRecipe.length > 0) {
        console.log("User and recipe already exist in family recipes table.");
        return;
    }

    await DButils.execQuery(`INSERT INTO FamilyRecipes VALUES ('${user_id}', ${recipe_id})`);
}

async function getFamilyRecipes(user_id) {
    const recipes_id = await DButils.execQuery(`SELECT recipeId FROM FamilyRecipes WHERE user_id='${user_id}'`);
    return recipes_id;
}

async function getLastViewedRecipes(user_id) {
    const query = `SELECT recipe_id FROM LastViewedRecipes WHERE user_id = ${user_id} ORDER BY viewed_at DESC LIMIT 3`;
    const result = await DButils.execQuery(query);
    return result.map((row) => row.recipe_id);
  }

module.exports = {
    markAsFavorite,
    getFavoriteRecipes,
    markAsMyRecipe,
    getMyRecipe,
    getFamilyRecipes,
    markAsFamilyRecipe,
    getLastViewedRecipes
  };

// exports.markAsFavorite = markAsFavorite;
// exports.getFavoriteRecipes = getFavoriteRecipes;
// exports.markAsMyRecipe = markAsMyRecipe;
// exports.getMyRecipe = getMyRecipe;
// exports.getFamilyRecipes = getFamilyRecipes;
// exports.markAsFamilyRecipe = markAsFamilyRecipe;

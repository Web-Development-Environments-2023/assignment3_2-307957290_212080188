const DButils = require("./DButils");


async function searchRecipes(filter, sort, limit){
    let limitQuery = "";
    // Add limit condition to the query if limit is provided, otherwise use a default limit value
    if (limit) {
        limitQuery = `LIMIT ${limit}`;
    }
    else {
        // Set a default limit value here
        limitQuery = "LIMIT 5";
    }

    // const recipeIDs = rows.map((row) => row.id);
    const recipes_id = await DButils.execQuery(`SELECT id FROM recipePreview ${limitQuery}`);
        // console.log("recipes_id:", recipes_id);
    return recipes_id;
//   return recipeIDs;
}

module.exports = {
  searchRecipes,
};


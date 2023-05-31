[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=11161714&assignment_repo_type=AssignmentRepo)

Recipe App

This repository contains the backend server for a Recipe App. The server is built using Node.js and Express.js and provides various API endpoints for managing recipes and user-related functionality.
Getting Started

To run the server locally, follow these steps:

    Clone the repository: git clone https://github.com/Web-Development-Environments-2023/assignment3_2-307957290_212080188
    Install the dependencies: npm install
    Set up the database: Create a MySQL database and configure the connection details in the .env file.
    Run the server: npm run start

API Endpoints 
Users

    GET /users/recipe: Returns the last 3 recipes viewed by a user.
    GET /users/recipe/{recipeId}: Returns preview details of a recipe by its ID.
    GET /users/family: Returns an array of family recipes saved by a user.
    POST /users/family: Saves a recipe in the family recipes list of a user.
    GET /users/favorites: Returns the favorite recipes saved by a user.

Recipes

    GET /recipes/{recipeId}: Returns full details of a recipe by its ID.
    POST /recipes: Adds a recipe.
    DELETE /recipes/{recipeId}: Deletes a recipe by its ID.
    PUT /recipes/{recipeId}: Updates a recipe by its ID.

Please note that this is not an exhaustive list of all the API endpoints available in the project. For a complete list of endpoints and their descriptions, please refer to the API documentation or explore the project source code.
Error Handling

If an error occurs during API request processing, an appropriate error response is returned with a corresponding status code and error message.

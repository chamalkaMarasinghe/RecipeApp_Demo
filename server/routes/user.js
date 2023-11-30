const express = require("express");
const router = express.Router();
const { registerUser, isUserExist, addOrRemoveRecipe, login } = require("../controllers/user");

router.get('/user/exist/:email', isUserExist);
router.get('/user/:email/:password', login);
router.post('/user', registerUser);
router.patch('/user/:userId/recipe/:recipeId', addOrRemoveRecipe);

module.exports = router;
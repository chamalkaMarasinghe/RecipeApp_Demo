const UserSchema = require('../models/user');

const registerUser = async(req, res) => {
    try {
        const { firstname, lastname, email, phone, password} = req.body;
        const newUser = await UserSchema.create({ firstname, lastname, email, phone, password});
        res.status(200).json({ "newUser" : newUser});
        
    } catch (error) {
        res.status(500).json({"msg" : error.message});
    }
}

const login = async(req, res) => {
    try {
        const {email, password} = req.params;
        const user = await UserSchema.findOne({email : email});
        if(user){
            if(user.password.localeCompare(password) == 0){
                res.status(202).json({ "status" : "Signed-in Successfully", "user" : user });
            }
            else{
                res.status(401).json({ "status" : "invalid Password"});
            }
        }
        else{
            res.status(401).json({ "status" : "invalid email" });
        }
    } catch (error) {
        res.status(500).json({"msg" : error.message});
    }
}

const isUserExist = async(req, res) => {
    try {
        const {email} = req.params;
        const user = await UserSchema.findOne({email : email});
        if(user){
            res.status(200).json({ "exist" : true });
        }
        else{
            res.status(200).json({ "exist" : false });
        }
    } catch (error) {
        res.status(500).json({"msg" : error.message});
    }
}

const addOrRemoveRecipe = async(req, res) => {
    try {
        const { recipeId, userId } = req.params;
        const currentUser = await UserSchema.findById(userId);
        if(currentUser.favs.includes(recipeId)){
            currentUser.favs = currentUser.favs.filter((item) => {return item != recipeId})
        }
        else{
            currentUser.favs.push(recipeId);
        }
        await currentUser.save();
        res.status(200).json(currentUser);
    } catch (error) {
        res.status(500).json({"msg" : error.message});
    }
}

module.exports = {
    registerUser,
    isUserExist,
    addOrRemoveRecipe,
    login
}
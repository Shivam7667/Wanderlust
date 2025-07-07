
const User = require("../models/user.js");

module.exports.renderSignUpForm = (req, res) =>{
    res.render("users/signup.ejs");
};

module.exports.signUp = async(req, res, next) =>{
    try{
    let {username, email, password} = req.body;
    const newUser = new User({email, username});
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) =>{
        if(err) {
            return next();
        }
        req.flash("success", "Welcome to Wanderlust!");
        res.redirect("/listings");
    });
    
    } catch(e){
        req.flash("error", e.message);
        req.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) =>{
    res.render("users/login.ejs");
};

module.exports.logIn = async(req, res) =>{
    req.flash("success", "Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logOut = (req, res, next) =>{
    req.logout((err) =>{
        if(err) {
            return next(err);
        }
        req.flash("success", "You are logged out Successfully!");
        res.redirect("/listings");
    });
};   
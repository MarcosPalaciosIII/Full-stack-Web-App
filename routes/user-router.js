const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const UserModel = require("../models/user-model");

const router = express.Router();


// STEP #1 show the sign up form
router.get("/signup", (req, res, next) => {
// redirect to home if you are already logged in
  if(req.user){
    res.redirect("/");
    // early return to stop the function since there's an error
    //(prevents the rest of the code form running
    return;
  }

  res.render("user-views/signup-page");
});

// STEP #2: process the sign up form
router.post("/process-signup", (req, res, next) => {
  if(req.body.signupPassword.length < 9 ||
     req.body.signupPassword.match(/[^a-z0-9]/i) === null             //                |
   ) { //               if no special characters
     res.locals.errorMessage = "Password must contain atleast 10 characters long with a special character";
     res.render("user-views/signup-page");

     // early return to stop the function since there's an error
     // (prevents the rest of the code from running)
     return;
   }
   // query the database to see if the email is taken
   UserModel.findOne({ email: req.body.signupEmail})
   .then((userFromDb) => {
     // userFromDb will be null if the email IS NOT taken

     // display the form again if the email is taken
     if(userFromDb !== null) {
       res.locals.errorMessage = "Email is taken";
       res.render("user-views/signup-page");
     }
     // generate a new salt for this user's password
     const salt = bcrypt.genSaltSync(10);
     // encrypt the password submitted from the form
     const scrambledPassword = bcrypt.hashSync(req.body.signupPassword, salt);

     const theUser = new UserModel({
       fullName: req.body.signupFullName,
       email: req.body.signupEmail,
       userName: req.body.signupUsername,
       userAvatar: req.body.signupAvatar,
       userFavLanguages: req.body.signupFavLanguages,
       encryptedPassword: scrambledPassword

     });

     // return the promise of the next database sign up
     return theUser.save();
   })

   .then(() => {
           // redirect to the home page on a successful sign up
           res.redirect("/");
       })
       .catch((err) => {
           next(err);
       });
 }); // POST /process-signup




//STEP #1 show the log in form
router.get("/login", (req, res, next) => {
  // redirect to home if you are already logged in
    if(req.user){
      res.redirect("/");
  // early return to stop the function since there's an error
  //(prevents the rest of the code form running)
      return;
    }

  res.render("user-views/login-page");
});

// STEP #2 process the log in form
router.post("/process-login", (req,res, next) => {
  // find a user document in the database with that email
  UserModel.findOne({ email: req.body.LoginEmail })
  .then((userFromDb) => {
    if (userFromDb === null) {
      // if we didn't find a user
      res.locals.errorMessage = "Email incorrect.";
      res.render("user-views/login-page");

      // early return to stop the function since there's an error
      // (prevents the rest of the code from running)
      return;
    }
    // if email is correct now we check the password
    const isPasswordGood =
     bcrypt.compareSync(req.body.LoginPassword, userFromDb.encryptedPassword);

     if (isPasswordGood === false) {
       res.locals.errorMessage = "Password incorrect.";
       res.render("user-views/login-page");

       // early return to stop the function since there's an error
       // (prevents the rest of the code from running)
       return;
     }

     // CREDENTIALS ARE GOOD! We need to log the users in


      // Passport defines the "req.login()"
      // for us to specify when to log in a user into the session
      req.login(userFromDb, (err) => {
        if (err) {
          // if it didn't work show the error page
          next(err);
        }
        else {
          //redirect to the home page on successful log in
          res.redirect("/");
        }
      }); //req.login()
  })// then()
  .catch((err) => {
    next(err);
  });
});


router.get("/logout", (req, res, next) => {
  //Passport defines the "req.logout()" method
  // for us to specify when to log out a user (clear them from the session)
  req.logout();

  res.redirect("/");
});


// Facebook login ROUTES
//-------------------------------------------------

// link to "facebook/login" to initiate the login proces
router.get("/facebook/login", passport.authenticate("facebook"));
//                        |
//            this name comes from the strategy

// Facebook will redirect here after login is successful
router.get("/facebook/success", // no normal callback here
 passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);


// Google login ROUTES
// ------------------------------------------------

router.get("/google/login", // no normal callback here
passport.authenticate("google", {
  scope: [
     "https://www.googleapis.com/auth/plus.login",
        "https://www.googleapis.com/auth/plus.profile.emails.read"
      ]
  })
);

// Google will redirect here after login is successful
router.get("/google/success",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);



router.get("/profile/:userId", (req, res, next) => {
  // redirect to log in if there is no logged in user
  if (req.user === undefined) {
    res.redirect("/login");
    return;
  }

    res.render("user-views/user-profile");
});


// STEP #1: show edit form
router.get("/user/:userId/edit", (req, res, next) => {
  // redirect to log in if there is no logged in user
  if (req.user === undefined) {
    res.redirect("/login");
    return;
  }
    // retrieve the document from the database
    UserModel.findById(req.params.userId)
      .then((userFromDb) => {
          // create a local variable for the view to access the DB result
          // (this is so we can pre-fill the form)
          res.locals.userDetails = userFromDb;

          res.render("user-views/profile-edit-page");
      })
      .catch((err) => {
          // render the error page with our error
          next(err);
      });
});

router.get("/user/:userId", (req, res, next) => {
  // redirect to log in if there is no logged in user
  if (req.user === undefined) {
    res.redirect("/login");
    return;
  }
  res.render("user-views/user-profile");
});


// STEP #2: receive edit submission
router.post("/user/:userId", (req, res, next) => {

    // retrieve the document from the database
    UserModel.findById(req.params.userId)
      .then((userFromDb) => {
          // update the document
          console.log(userFromDb);
          userFromDb.set({
              userAvatar: req.body.userAvatarEdit,
              userBio: req.body.userBioEdit,
              userFavLanguages: req.body.editFavLanguages
          });
          // set up the "userDetails" local variable in case
          // we get validation errors and need to display the form again
          res.locals.userDetails = userFromDb;
          // if (userFromDb.userFavLanguages !== 3) {
          //   res.locals.errorMessage = "You must select 3 languages.";
          //   res.render("user-views/profile-edit-page");
          // }

          // and then save the updates
          // (return the promise of the next database operation)
          return userFromDb.save();
      })
      .then(() => {
          // STEP #3: redirect after a SUCCESSFUL save
          // redirect to the product details page
          res.redirect(`/user/${req.params.userId}`);
            // you CAN'T redirect to an EJS file
            // you can ONLY redirect to a URL
      })
      .catch((err) => {
          // is this a validation error?
          // if it is then display the form with the error messages
          if (err.errors) {
              res.locals.validationErrors = err.errors;
              res.render("user-views/profile-edit-page");
          }
          // if it isn't then render the error page with our error
          else {
              next(err);
          }
      });
});


module.exports = router;

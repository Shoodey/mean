MEAN - ONetCreative
===================

Items management application using the MEAN Stack.

----------

## Technologies
-------------

> **AngularJS:** front end, client side.
> **MongoDB:** stores data.
> **ExpressJS:** routing system.
> **NodeJS:** back end, server side.


----------

## Developer
-------------

|      Name     |        Email      |      Twitter    |
| ------------- | ----------------- | --------------- |
| EL AMRI Ali  	| shoodey@gmail.com | @MrShoodey      |


----------

## Completed Tasks
-------------

[30/07] Completed tasks (non exhaustive list).

> **Users:**
> 
> *   Registration using: username, email and password. Usernames and emails must be unique.
>*    Login using either username or email.
> 
> **Items:**
> 
> *   Logged in users can create items.
>*    Users can view their items.
> *   Items are stored in DB with: name, content, online (boolean), created_by (logged in user's username, ID later), created_at (Date.now)
> *   Users can add/update their respective items in a single page view.

## TODO List

Todo list (non exhaustive).
> **Users:**
> 
> *   Send confirmation email before logging in users.
> *    Profile management panel with more user info (name, address...)
> *    Register and login using Facebook, Twitter, Google + and Github accounts + attach info to existing users' account
> 
> **Items:**
> 
> *   Render all items in a view. Single items can then be viewed with more info.
> *   Add more info to items + single (later multiple) image upload and link them to the item.
> 
> **Categories:**
>
> *  Admin can create categories.
> * Users can then associate items with the desired category (categories or tags later)

## Issues
-------------

> **Session:**
> 
> *   Even though session is stored in DB, AngularJS doesn't seem to keep the logged in user's info provided by PassportJS.
>
> **Auth:**
> 
> *   I used this middleware in routes/api.js <br>
> ` function isAuthenticated(req, res, next) {`<br>
>&nbsp; &nbsp; &nbsp; `if (!req.isAuthenticated())` <br>
> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; `res.redirect('#/login')`;<br>
> &nbsp; &nbsp; &nbsp; `else next();`<br>
> `};`<br>
>`router.use('/items', isAuthenticated);` <br>
> But I get this error : <br>
>`Failed to load resource: net::ERR_TOO_MANY_REDIRECTS`<br>
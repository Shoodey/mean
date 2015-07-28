var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Item = mongoose.model('Item');
var User = mongoose.model('User');
//Used for routes that must be authenticated.
function isAuthenticated (req, res, next) {

        return next();

};

//Register the authentication middleware
router.use('/items', isAuthenticated);

router.route('/items')
    .post(function(req, res){
        var user_id = req.session.passport.user;
        User.findOne({_id: user_id}, function (err, user) {
            if(err)
                return done(err);
            if(user){
                var item = new Item();
                item.name = req.body.name;
                item.content = req.body.content;
                item.online = req.body.online;
                item.created_by = user.username;

                item.save(function(err, item) {
                    if (err){
                        return res.send(500, err);
                    }
                    return res.json(item);
                });
            }
        });


    })
    //gets all items
    .get(function(req, res){
        Item.find(function(err, items){
            if(err){
                return res.send(500, err);
            }
            return res.send(items);
        });
    });

//item-specific commands. likely won't be used
router.route('/items/:id')
    //gets specified item
    .get(function(req, res){
        Item.findById(req.params.id, function(err, item){
            if(err)
                res.send(err);
            res.json(item);
        });
    })
    //updates specified item
    .put(function(req, res){
        Item.findById(req.params.id, function(err, item){
            if(err)
                res.send(err);

            item.name = req.body.name;
            item.content = req.body.content;
            item.online = req.body.online;

            item.save(function(err, item){
                if(err)
                    res.send(err);

                res.json(item);
            });
        });
    })
    //deletes the item
    .delete(function(req, res) {
        Item.remove({
            _id: req.params.id
        }, function(err) {
            if (err)
                res.send(err);
            res.json("deleted :(");
        });
    });

module.exports = router;
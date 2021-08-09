const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const db = require('../public/javascripts/db');

module.exports = function(passport) {
    router.post('/register', (req, res)=>{
        var count = req.body.count;
        var id = req.body.id;
        var name = req.body.name;
        var pwd = req.body.pwd;
        var pwd2 = req.body.pwd2;

        if(pwd !== pwd2){
            var isRegister = false;
            res.send(isRegister);
        } else{
            bcrypt.hash(pwd, 10, (err, hash)=>{
                if(err) throw err;
                var user = {
                    count: count,
                    id: id,
                    name: name,
                    password: hash
                };
                const sqlQuery = 'INSERT INTO user SET ?';
                db.query(sqlQuery, user, (err2, result)=>{
                    if(err2) throw err2;
                });
                var isRegister = true;
                res.send(isRegister);
            });
        }
    });

    router.post('/login', (req, res, next) => {
        passport.authenticate('local', (authError, userInfo, info) => {
            if(authError) throw authError;
            if(userInfo) { // 로그인 성공
                req.session.save((err)=>{
                    if(err) throw err;
                    return req.login(userInfo, loginError => {
                        if(loginError) throw loginError;
                        res.send({
                            login: true,
                            info: req.user
                        });
                    });                
                });
            } else { // 로그인 실패
                res.send({
                    login: false
                });
            }
        })(req, res, next);
    });

    return router;
}
var db = require('./db');
var bcrypt = require('bcrypt');

module.exports = function(app){
    const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        if(user){
            done(null, user.count);
        }
    });

    passport.deserializeUser((count, done) => {
        var userInfo;
        var sqlQuery = 'SELECT * FROM user WHERE count=?';
        db.query(sqlQuery, [count],
            (err, result) => {
                if(err) throw err;
                var json = JSON.stringify(result[0]);
                userInfo = JSON.parse(json);
                done(null, userInfo);
            }
        );
        console.log(`deserializeUser ${userInfo}`);
    });
    
    passport.use(new LocalStrategy(
        {
            usernameField: 'id',
            passwordField: 'pwd'
        },
        (username, password, done) => {
            const sqlQuery = 'SELECT * FROM user WHERE id=?';
            db.query(sqlQuery, [username],
                (err, result)=>{
                    if(err) throw err;
                    if(result.length === 0) { // id X
                        return done(null, false, { message: 'Incorrect id'});
                    } else{ // id O
                        bcrypt.compare(password, result[0].password, (err, result2)=>{
                            if(err) throw err;
                            if(result2) { // id O pwd O login sucess
                                var json = JSON.stringify(result[0]);
                                var userInfo = JSON.parse(json);
                                return done(null, userInfo);
                            } else { // id O pwd X
                                return done(null, false, { message: 'Incorrect password'});
                            }
                        });
                    }
                });
        }
        ));

    return passport;
}
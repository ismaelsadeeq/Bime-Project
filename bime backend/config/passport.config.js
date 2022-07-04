const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const passport = require('passport');
const Company = require('../models/company')


const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'myVerySecret'

module.exports = passport =>{
    passport.use('jwt.admin',new JwtStrategy(
        jwtOptions,(jwt_payload, done)=>{
            Company.findOne({username:jwt_payload.id}).then(user =>{
                console.log(user);
                console.log(jwt_payload);
                if(user){
                    return done(null, user);
                }
                return done(null, false);
            }).catch(err =>{
                console.log(err);
            });
        }
    ));

    passport.use('jwt.staff',new JwtStrategy(
        jwtOptions,(jwt_payload, done)=>{
            Company.findOne({"staff.staffId":jwt_payload.id}).then(staff =>{

                console.log(staff);
                console.log(jwt_payload);
                if(staff){
                    return done(null, staff);
                }
                return done(null, false);
            }).catch(err =>{
                console.log(err);
            });
        }
    ));
}
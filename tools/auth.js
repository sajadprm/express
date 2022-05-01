// const {
//     sendStatus
// } = require("express/lib/response");
// const async = require("hbs/lib/async");
const Session = require("../model/session.model");
const User = require("../model/user.model");
const RefreshToken=require("../model/refreshToken.model");
const jwt=require("jsonwebtoken");
const confApp=require("../config/app");
const uuid=require("uuid");
const isLoginBySession = async (req, res, next) => {
    try {
        if (!req.cookies.session) {
            return res.sendStatus(401);
        }



        const session = await Session.findOne({
            session: req.cookies.session
        }).populate("user", "_id role isActive");
        if (!session) {
            return res.sendStatus(401);
        }
       
        req.user = session.user;
        return next();


    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }


}

const isLoginByJwtToken= async (req,res,next)=>{
    try{
          if(!req.headers.authorization)
          {
            throw{
                status:401,
                message:"Authorization failed...",
                originError:err
            }
          }

          const user= await jwt.verify(req.headers.authorization,confApp.JWTSecret,async (err,decode)=>{
            if(err)
            {
                if(err.name==="TokenExpiredError")
                {
                    if(!req.cookies.session)
                    {
                       
                        throw{
                            
                            status:423,
                            message:"Token is Expired..",
                            originError:err
                        }
                    }

                    const refreshToken = await RefreshToken.findOne({
                        refreshToken: req.cookies.session
                    }).populate("user");
                    
                     
                    if (!refreshToken) {
                        
                        throw{
                            status:423,
                            message:"Token is Expired..",
                            originError:err
                        }
                    }

            
            
                    refreshToken.refreshToken=uuid.v4();
                    refreshToken.token= await createToken(refreshToken.user);
                    await refreshToken.save();
                                        
                   res.cookie("session",refreshToken.refreshToken,{maxAge:confApp.SessionTime});
                   res.setHeader("authorization", refreshToken.token);
                    console.log("new Token");
                   return refreshToken.user;

                   
                }else
                {
                    throw {
                        status : 403,
                        message : "Invalid token..",
                        originError:err
                    }
                }
                
            }else
            {
                return decode.user;
            }

          })
          req.user=user;
          return next();


    }catch(err){
        return next(err)
    }
}

const createTokenForLogin= async(user,res)=>{
    try{
        const token=createToken(user);
        const refreshToken=new RefreshToken({
        refreshToken:uuid.v4(),
        token,
        user:user._id
    });
   await refreshToken.save();
   
    res.cookie("session",refreshToken.refreshToken,{maxAge:confApp.SessionTime});
    res.setHeader("authorization", refreshToken.token);
    
    }catch(err){
        throw err;
    }


};

const createToken=(user)=>{
return jwt.sign({user},confApp.JWTSecret,{expiresIn:confApp.JWTTime});
}
module.exports = {
    isLoginBySession,
    isLoginByJwtToken,
    createTokenForLogin  
};
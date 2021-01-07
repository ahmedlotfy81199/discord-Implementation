const jwt = require('jsonwebtoken');
module.exports = async function(req,res,next) {
 
   try{

    const id = await jwt.verify(req.header('auth-token'), 'aa')
    req.userId =id.id;   // Add to req object
    next();

   }catch(err){
    res.status(400).json({
        state:0,
        message:"access denied please login to countinue"
    })
       }
    
    }
      
    


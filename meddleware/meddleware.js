const bodyParser=require('body-parser');
const authRoute=require('../route/auth/auth');

module.exports=  (app)=> {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
//routes middlewares
app.get('/',(req,res)=>{
    res.send('welcome please read the docs')
 })
 app.use('/api/user', authRoute);
return app
}
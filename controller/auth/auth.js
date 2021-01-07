const User = require('../../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const generateCode = require('../../helper/randomCode').code
const sendemail = require('../../helper/sendemail').sendemail


// register new user 
const register = async (req, res, next) => {

    const {
        name,
        email,
        password
    } = req.body
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    const existemail = await User.findOne({
        email: email
    })
    if (existemail) {
        return res.json({
            state: 0,
            message: "this account is already registerd before"
        })
    }
    const user = await new User({
        name: name,
        email: email,
        password: hashpassword,
    }).save()
    if (user) {
        return res.json({
            state: 1,
            message: "account created success",
            data: user
        })
    }
    return res.json({
        state: 0,
        message: "account creation failed"
    })
};

//Users login
const login = async (req, res, next) => {
    const {
        email,
        password
    } = req.body
    const user = await User.findOne({
        email: email
    });
    if (!user) {
        return res.json({
            state: 0,
            message: "this email is not registerd"
        })
    }
    const validpassword = await bcrypt.compare(password, user.password)
    if (!validpassword) {
        return res.json({
            state: 0,
            message: "the password is incorrect"
        })
    }
    let token = jwt.sign({
        id: user._id.toString()
    }, 'aa')
    if (token) {
        return res.header('auth-token', token).json({
            state: 1,
            message: "logged in successfull",
            data: {
                token: token
            }
        })
    }
    res.json({
        state: 0,
        message: "logged in faild",

    })


}
//send verify code to user 
const sendVerifyCode = async (req, res, next) => {
    const code = generateCode(4)
    const user = await User.findOne({
        _id: req.userId
    });

    if (!user) {
        return res.json({
            state: 0,
            message: "something went wrong sending your activation code"
        })
    }

    user.EmailActiveCode = code;
    user.codeExpireDate = Date.now() + 3600000;
    user.save();


    sendemail(user.email, 'activating your account',
        `<h1>your activation code is ${code}</h1>
    <h3>not that the given code expire after 1 hour</h3>`)
    return res.json({
        state: 1,
        message: "verify code is sent to your email please check it "
    })


}
// verify the code that the user will enter if its correct the accout will be verefied 
const activeEmail = async (req, res, next) => {
    const {
        activationCode
    } = req.body;
    const user = await User.findOne({
        _id: req.userId
    });
    if (!user) {
        return res.json({
            state: 0,
            message: "please login to con"
        })
    }
    if (user.EmailActiveCode != activationCode) {
        return res.json({
            state: 0,
            message: "activation code is incorrect"
        })
    }
    if (user.codeExpireDate <= Date.now()) {
        return res.json({
            state: 0,
            message: "activation code is expired"
        })
    }
    user.emailVerfied = true;
    user.save();
    return res.json({
        state: 1,
        message: "your accout is verified successfully"
    })

}
//resete user password using his old password 
const resetPassword = async (req, res, next) => {
    const {
        oldPassword,
        newPassword
    } = req.body;
    const user = await User.findById(req.userId);
    console.debug("user is ", user)
    if (!user) {
        return res.json({
            state: 0,
            message: "please login to reset your password"
        })
    };
    const validpassword = await bcrypt.compare(oldPassword, user.password)
    if (!validpassword) {
        return res.json({
            state: 0,
            message: "your old password is incorrecct"
        })
    }
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(newPassword, salt);
    user.password = hashpassword;
    user.save();
    return res.json({
        state: 1,
        message: "password changed successfull"
    })

}
//send forget password code via email 
const forgetPasswordCode = async (req, res, next) => {
    const code = generateCode(4)
    const {
        email
    } = req.body;
    const user = await User.findOne({
        email: email
    });
    if (!user) {
        return res.json({
            state: 0,
            message: "email you have intered is incorrect"
        })
    }
    user.EmailActiveCode = code;
    user.codeExpireDate = Date.now() + 3600000;
    user.save();

    sendemail(user.email, 'reseting your password',
        `<h1>your reset password code is ${code}</h1>
<h3>not that the given code expire after 1 hour</h3>`)
    return res.json({
        state: 1,
        message: "resete password code is sent to your email please check it "
    })
}
//forget password
// the user inserts a code if its right he can change his password
const forgetPassword = async (req, res, next) => {
    const {
        email,
        code,
        newPassword
    } = req.body
    const user = await User.findOne({
        email: email
    });
    if (user.EmailActiveCode != code) {
        return res.json({
            state: 0,
            message: "activation code is incorrect"
        })
    }
    if (user.codeExpireDate <= Date.now()) {
        return res.json({
            state: 0,
            message: "activation code is expired"
        })
    }
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(newPassword, salt);
    user.password = hashpassword;
    user.save();
    return res.json({
        state: 1,
        message: "password changed successfull"
    })

}
module.exports = {
    register,
    login,
    resetPassword,
    sendVerifyCode,
    activeEmail,
    forgetPasswordCode,
    forgetPassword
};
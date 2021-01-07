const crypto = require('crypto');

const code = (NumOfBytes=2)=>{return crypto.randomBytes(NumOfBytes).toString('hex')}

module.exports = {
    code
}
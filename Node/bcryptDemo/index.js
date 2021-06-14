const bcrypt = require('bcrypt');

// const hashPassword = async(pw) => {
//     const salt = await bcrypt.genSalt(12);
//     const hash = await bcrypt.hash(pw, salt);
//     console.log(salt);
//     console.log(hash);
// }

const hashPassword = async(pw, rounds) => {
    const hash = await bcrypt.hash(pw, rounds);
    console.log(hash);

}

const login= async(pw, hashedPw) => {
    const result = await bcrypt.compare(pw, hashedPw);
    if(result) {
        console.log('User successfully authenticated with password');;
    } else {
    console.log('Incorrect password entered');
}
}

const HashedPw = hashPassword('secret', 12);
login('secret','$2b$12$gfBjV4SXic2C9H2B/Z.pU.bsv/fSCYuG2WKLs0HYIs1xXiQHQ40Wy');
import Password from '../../PasswordManager-Backend/models/password.js'
import User from '../../PasswordManager-Backend/models/user.js'
import PasswordDataJson from '../../PasswordManager-Backend/db/password-seeds.json' assert {type: 'json'}
import UserData from '../../PasswordManager-Backend/db/user-seeds.json' assert {type: 'json'}


const userId = await User.deleteMany({}) 
.then(() => {
    return User.create(UserData)
})
.then((data) => {
    return data._id.toString();
})
.catch(console.error)
console.log(userId);



const passwordData = []
PasswordDataJson.forEach((password) => {
    let newPassword = password
    newPassword.userId = userId
    passwordData.push(newPassword)
})


Password.deleteMany({})
.then( () => {
    return Password.insertMany(passwordData)
})
.then(console.log)
.catch(console.error)
.finally(() => {process.exit()})
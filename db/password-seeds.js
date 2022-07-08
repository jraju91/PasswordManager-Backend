import Password from '../../PasswordManager-Backend/models/password.js'

import PasswordData from '../../PasswordManager-Backend/db/password-seeds.json' assert {type: 'json'}

Password.deleteMany({})
.then( () => {
    return Password.insertMany(PasswordData)
})
.then(console.log)
.catch(console.error)
.finally(() => {process.exit()})
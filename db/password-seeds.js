const YelpApp = require('../models/yelp-model')

import Password from '../models/password'

import PasswordData from './password-seeds.json'

Password.deleteMany({})
.then( () => {
    return PasswordData.insertMany(passwordData)
})
.then(console.log)
.catch(console.error)
.finally(() => {process.exit()})
import mongoose from 'mongoose'


const passwordSchema = mongoose.Schema({
        
        nameofwebsite: String,
        username: String,
        password: String,
        linktoreset: String,
    
});

const Password = mongoose.model('Password', passwordSchema);

export default Password;
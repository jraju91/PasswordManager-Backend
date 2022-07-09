import mongoose from '../../PasswordManager-Backend/db/connection.js'


const passwordSchema = mongoose.Schema({

        userId: {
            
        type: String, 
        required:true
    
        },

        nameofwebsite: {
                
                type: String,
                required: true
        },
        
    
        username: {
            type: String,
            required: true
        },
        
        password: {
            
            type: String,
            required: true
        },

        linktoreset: String,
    
});

const Password = mongoose.model('Password', passwordSchema);

export default Password;
import express from 'express';
import { getPasswords, getPassword, createPassword, updatePassword, deletePassword } from '../../PasswordManager-Backend/controllers/passwords.js';


const router = express.Router();

router.get('/', getPasswords);
router.get('/:id', getPassword);
router.post('/', createPassword);
router.put('/:id', updatePassword);
router.delete('/:id', deletePassword);

// PasswordManager-Backend/routes/password.js

export default router;
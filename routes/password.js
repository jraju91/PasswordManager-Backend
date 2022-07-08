import express from 'express';
import { getPasswords, getPassword, createPassword, updatePassword, deletePassword } from '../controllers/passwords';


const router = express.Router();

router.get('/', getPasswords);
router.get('/:id', getPassword);
router.post('/', auth, createPassword);
router.put('/:id', auth, updatePassword);
router.delete('/:id', auth, deletePassword);



export default router;
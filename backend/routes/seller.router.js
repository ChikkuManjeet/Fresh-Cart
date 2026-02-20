import express from 'express';
import { isAuthSeller, logoutSeller, sellerLogin } from '../controllers/seller.controller.js';
const router = express.Router();

router.post('/login', sellerLogin);
router.get('/is-auth', isAuthSeller);
router.get('/logout', logoutSeller);

export default router;

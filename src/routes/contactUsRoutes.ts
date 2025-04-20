import express from 'express';

import { contactUs, deleteContact, getContactUs } from '../services/contactUsServices.js';

const router = express.Router();

router.post('/contactUs', contactUs);
router.get('/get-contact', getContactUs);
router.delete('/delete-contact/:id', deleteContact)

export default router; 
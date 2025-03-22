import express from 'express';

import { contactUs } from '../services/contactUsServices.js';

const router = express.Router();

router.post('/contactUs', contactUs);

export default router; 
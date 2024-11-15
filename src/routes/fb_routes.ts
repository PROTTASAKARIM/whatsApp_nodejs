import express from 'express';
import {fbMessenger_functions } from '../functions/fbMessenger_functions';

const router = express.Router();

router.get(
    '/webhook',
    fbMessenger_functions.getWebhook,
);
router.post(
    '/webhook',
    fbMessenger_functions.postWebhook,
);


// Handles messaging_postbacks events


export const FbMssenerRoutes = router;
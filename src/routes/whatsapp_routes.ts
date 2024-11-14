import express from 'express';
import { whatsapp_functions } from '../functions/whatsapp_functions';

const router = express.Router();

router.post(
    '/template',
    whatsapp_functions.sendTemplateMessage,
);
router.post(
    '/customTemplate',
    whatsapp_functions.sendTemplateMessageCustomTemplate,
);
router.post(
    '/text',
    whatsapp_functions.sendTextMessage,
);
router.post(
    '/media',
    whatsapp_functions.sendMediaMessage,
);
export const WhatsAppRoutes = router;
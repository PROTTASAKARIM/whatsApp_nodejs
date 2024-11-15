"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppRoutes = void 0;
const express_1 = __importDefault(require("express"));
const whatsapp_functions_1 = require("../functions/whatsapp_functions");
const router = express_1.default.Router();
router.post('/template', whatsapp_functions_1.whatsapp_functions.sendTemplateMessage);
router.post('/customTemplate', whatsapp_functions_1.whatsapp_functions.sendTemplateMessageCustomTemplate);
router.post('/text', whatsapp_functions_1.whatsapp_functions.sendTextMessage);
router.post('/media', whatsapp_functions_1.whatsapp_functions.sendMediaMessage);
exports.WhatsAppRoutes = router;

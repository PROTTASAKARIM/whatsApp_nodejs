"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const whatsapp_routes_1 = require("./whatsapp_routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/whatsapp',
        route: whatsapp_routes_1.WhatsAppRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;

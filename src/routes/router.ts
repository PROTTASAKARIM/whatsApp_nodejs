import { Router } from 'express';
import { WhatsAppRoutes } from './whatsapp_routes';


const router = Router();

const moduleRoutes = [

  {
    path: '/whatsapp',
    route: WhatsAppRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

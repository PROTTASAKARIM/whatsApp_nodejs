import { Router } from 'express';
import { WhatsAppRoutes } from './whatsapp_routes';
import { FbMssenerRoutes } from './fb_routes';


const router = Router();

const moduleRoutes = [

  {
    path: '/whatsapp',
    route: WhatsAppRoutes,
  },
  {
    path: '/fb',
    route: FbMssenerRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

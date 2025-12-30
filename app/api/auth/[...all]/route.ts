import { auth } from '@/lib/auth';
import { toNextJsHandler } from 'better-auth/next-js';

export const { POST, GET } = toNextJsHandler(auth);

// export const GET = async (req: Request) => {
//   console.log('Auth GET request:', req.url);
//   return handler.GET(req);
// };

// export const POST = async (req: Request) => {
//   console.log('Auth POST request:', req.url);
//   return handler.POST(req);
// };

import { createCookieSessionStorage } from '@remix-run/cloudflare';

export function getThemeSessionStorage(env) {
  return createCookieSessionStorage({
    cookie: {
      name: '__session',
      httpOnly: true,
      maxAge: 604_800,
      path: '/',
      sameSite: 'lax',
      secrets: [env.SESSION_SECRET || ' '],
      secure: true,
    },
  });
}

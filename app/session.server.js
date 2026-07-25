import { createCookieSessionStorage } from '@remix-run/cloudflare';

// The session only stores the theme preference — nothing sensitive —
// so the cookie is unsigned and no secret is required.
export const themeSessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__session',
    httpOnly: true,
    maxAge: 604_800,
    path: '/',
    sameSite: 'lax',
    secure: true,
  },
});

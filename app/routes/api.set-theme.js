import { json } from '@remix-run/cloudflare';
import { themeSessionStorage } from '~/session.server';

function normalizeTheme(value) {
  if (value === 'light' || value === 'dark') return value;
  return null;
}

export async function action({ request }) {
  // Reject cross-origin submissions (CSRF hardening). Same-origin requests
  // either omit the Origin header or send one matching the request URL.
  const origin = request.headers.get('Origin');
  if (origin && origin !== new URL(request.url).origin) {
    return json({ status: 'error', message: 'Invalid origin' }, { status: 403 });
  }

  const formData = await request.formData();
  const raw = formData.get('theme');
  const theme = normalizeTheme(typeof raw === 'string' ? raw : null);

  if (!theme) {
    return json({ status: 'error', message: 'Invalid theme' }, { status: 400 });
  }

  const session = await themeSessionStorage.getSession(request.headers.get('Cookie'));
  session.set('theme', theme);

  return json(
    { status: 'success' },
    {
      headers: {
        'Set-Cookie': await themeSessionStorage.commitSession(session),
        'Cache-Control': 'no-store',
      },
    }
  );
}

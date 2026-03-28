import { json } from '@remix-run/cloudflare';
import { getThemeSessionStorage } from '~/session.server';

function normalizeTheme(value) {
  if (value === 'light' || value === 'dark') return value;
  return null;
}

export async function action({ request, context }) {
  const formData = await request.formData();
  const raw = formData.get('theme');
  const theme = normalizeTheme(typeof raw === 'string' ? raw : null);

  if (!theme) {
    return json({ status: 'error', message: 'Invalid theme' }, { status: 400 });
  }

  const { getSession, commitSession } = getThemeSessionStorage(context.cloudflare.env);

  const session = await getSession(request.headers.get('Cookie'));
  session.set('theme', theme);

  return json(
    { status: 'success' },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
        'Cache-Control': 'no-store',
      },
    }
  );
}

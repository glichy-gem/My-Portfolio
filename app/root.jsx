import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useLoaderData,
  useNavigation,
  useRevalidator,
  useRouteError,
} from '@remix-run/react';
import { json } from '@remix-run/cloudflare';
import { ThemeProvider, themeStyles } from '~/components/theme-provider';
import { getThemeSessionStorage } from '~/session.server';
import GothamBook from '~/assets/fonts/gotham-book.woff2';
import GothamMedium from '~/assets/fonts/gotham-medium.woff2';
import { useEffect, useRef } from 'react';
import { Error } from '~/layouts/error';
import { VisuallyHidden } from '~/components/visually-hidden';
import { Navbar } from '~/layouts/navbar';
import { Progress } from '~/components/progress';
import config from '~/config.json';
import styles from './root.module.css';
import './reset.module.css';
import './global.module.css';

const THEME_HEADERS = {
  'Cache-Control': 'private, no-store, max-age=0, must-revalidate',
  Vary: 'Cookie',
};

function normalizeTheme(value) {
  return value === 'light' ? 'light' : 'dark';
}

export function headers({ loaderHeaders }) {
  const h = new Headers(loaderHeaders);
  h.set('Cache-Control', THEME_HEADERS['Cache-Control']);
  const vary = h.get('Vary');
  if (!vary || !/\bCookie\b/i.test(vary)) {
    h.set('Vary', vary ? `${vary}, Cookie` : 'Cookie');
  }
  return h;
}

export const links = () => [
  {
    rel: 'preload',
    href: GothamMedium,
    as: 'font',
    type: 'font/woff2',
    crossOrigin: '',
  },
  {
    rel: 'preload',
    href: GothamBook,
    as: 'font',
    type: 'font/woff2',
    crossOrigin: '',
  },
  { rel: 'manifest', href: '/manifest.json' },
  { rel: 'icon', href: '/favicon.ico' },
  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  { rel: 'shortcut_icon', href: '/shortcut.png', type: 'image/png', sizes: '64x64' },
  { rel: 'apple-touch-icon', href: '/icon-256.png', sizes: '256x256' },
  { rel: 'author', href: '/humans.txt', type: 'text/plain' },
];

export const loader = async ({ request, context }) => {
  const { url } = request;
  const { pathname } = new URL(url);
  const pathnameSliced = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  const canonicalUrl = `${config.url}${pathnameSliced}`;

  const { getSession } = getThemeSessionStorage(context.cloudflare.env);

  let theme = 'dark';
  try {
    const session = await getSession(request.headers.get('Cookie'));
    theme = normalizeTheme(session.get('theme'));
  } catch {
    theme = 'dark';
  }

  // Do not commitSession on root GET — races POST /api/set-theme. Cookie is set only in that action.
  return json({ canonicalUrl, theme }, { headers: THEME_HEADERS });
};

export default function App() {
  let { canonicalUrl, theme } = useLoaderData();
  const fetcher = useFetcher();
  const { revalidate } = useRevalidator();
  const { state } = useNavigation();
  const pendingThemeCookie = useRef(false);

  if (fetcher.formData?.has('theme')) {
    theme = normalizeTheme(fetcher.formData.get('theme'));
  }

  function toggleTheme(newTheme) {
    pendingThemeCookie.current = true;
    fetcher.submit(
      { theme: newTheme ? newTheme : theme === 'dark' ? 'light' : 'dark' },
      { action: '/api/set-theme', method: 'post' }
    );
  }

  useEffect(() => {
    if (fetcher.state !== 'idle' || !pendingThemeCookie.current) {
      return;
    }
    if (fetcher.data && typeof fetcher.data === 'object' && fetcher.data.status === 'success') {
      pendingThemeCookie.current = false;
      const t = window.setTimeout(() => revalidate(), 100);
      return () => window.clearTimeout(t);
    }
    pendingThemeCookie.current = false;
  }, [fetcher.state, fetcher.data, revalidate]);

  useEffect(() => {
    console.info(
      `${config.ascii}\n`,
      `Taking a peek huh? Check out the source code: ${config.repo}\n\n`
    );
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Theme color doesn't support oklch so I'm hard coding these hexes for now */}
        <meta name="theme-color" content={theme === 'dark' ? '#111' : '#F2F2F2'} />
        <meta
          name="color-scheme"
          content={theme === 'light' ? 'light dark' : 'dark light'}
        />
        <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
        <Meta />
        <Links />
        <link rel="canonical" href={canonicalUrl} />
      </head>
      <body data-theme={theme}>
        <ThemeProvider theme={theme} toggleTheme={toggleTheme}>
          <Progress />
          <VisuallyHidden showOnFocus as="a" className={styles.skip} href="#main-content">
            Skip to main content
          </VisuallyHidden>
          <Navbar />
          <main
            id="main-content"
            className={styles.container}
            tabIndex={-1}
            data-loading={state === 'loading'}
          >
            <Outlet />
          </main>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#111" />
        <meta name="color-scheme" content="dark light" />
        <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
        <Meta />
        <Links />
      </head>
      <body data-theme="dark">
        <Error error={error} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

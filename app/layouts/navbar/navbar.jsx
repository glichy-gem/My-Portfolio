import { Icon } from '~/components/icon';
import { tokens } from '~/components/theme-provider/theme';
import { Transition } from '~/components/transition';
import { useScrollToHash } from '~/hooks';
import { Link as RouterLink, useLocation } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import { cssProps, msToNum, numToMs } from '~/utils/style';
import { NavToggle } from './nav-toggle';
import { navLinks, socialLinks } from './nav-data';
import styles from './navbar.module.css';

export const Navbar = () => {
  const [current, setCurrent] = useState();
  const [menuOpen, setMenuOpen] = useState(false);
  const [target, setTarget] = useState();
  const location = useLocation();
  const headerRef = useRef();
  const scrollToHash = useScrollToHash();

  useEffect(() => {
    // Prevent ssr mismatch by storing this in state
    setCurrent(`${location.pathname}${location.hash}`);
  }, [location]);

  // Handle smooth scroll nav items
  useEffect(() => {
    if (!target || location.pathname !== '/') return;
    setCurrent(`${location.pathname}${target}`);
    scrollToHash(target, () => setTarget(null));
  }, [location.pathname, scrollToHash, target]);

  // Check if a nav item should be active
  const getCurrent = (url = '') => {
    const nonTrailing = current?.endsWith('/') ? current?.slice(0, -1) : current;

    if (url === nonTrailing) {
      return 'page';
    }

    return '';
  };

  // Store the current hash to scroll to
  const handleNavItemClick = event => {
    const hash = event.currentTarget.href.split('#')[1];
    setTarget(null);

    if (hash && location.pathname === '/') {
      setTarget(`#${hash}`);
      event.preventDefault();
    }
  };

  const handleMobileNavClick = event => {
    handleNavItemClick(event);
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <header className={styles.navbar} ref={headerRef}>
      <NavToggle onClick={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen} />
      <Transition unmount in={menuOpen} timeout={msToNum(tokens.base.durationL)}>
        {({ visible, nodeRef }) => (
          <nav className={styles.mobileNav} data-visible={visible} ref={nodeRef}>
            {navLinks.map(({ label, pathname }, index) => (
              <RouterLink
                viewTransition
                prefetch="intent"
                to={pathname}
                key={label}
                className={styles.mobileNavLink}
                data-visible={visible}
                aria-current={getCurrent(pathname)}
                onClick={handleMobileNavClick}
                style={cssProps({
                  transitionDelay: numToMs(
                    Number(msToNum(tokens.base.durationS)) + index * 50
                  ),
                })}
              >
                {label}
              </RouterLink>
            ))}
            <SocialIcons />
          </nav>
        )}
      </Transition>
    </header>
  );
};

const SocialIcons = ({ desktop }) => (
  <div className={styles.socials}>
    {socialLinks.map(({ label, url, icon }) => (
      <a
        key={label}
        data-navbar-item={desktop || undefined}
        className={styles.socialLink}
        aria-label={label}
        href={url}
        target={url.startsWith('mailto:') ? undefined : '_blank'}
        rel={url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
      >
        <Icon className={styles.socialIcon} icon={icon} />
      </a>
    ))}
  </div>
);

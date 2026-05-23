import {useParams, Form, Await, useRouteLoaderData} from '@remix-run/react';
import {Suspense, useEffect, useMemo} from 'react';
import {CartForm} from '@shopify/hydrogen';

import {type LayoutQuery} from 'storefrontapi.generated';
import {Link} from '~/components/Link';
import {Cart} from '~/components/Cart';
import {CartLoading} from '~/components/CartLoading';
import {Drawer, useDrawer} from '~/components/Drawer';
import {IconBag, IconMenu, IconSearch} from '~/components/Icon';
import {
  type EnhancedMenu,
  type ChildEnhancedMenuItem,
} from '~/lib/utils';
import {useIsHydrated} from '~/hooks/useIsHydrated';
import {useCartFetchers} from '~/hooks/useCartFetchers';
import type {RootLoader} from '~/root';

type LayoutProps = {
  children: React.ReactNode;
  layout?: LayoutQuery & {
    headerMenu?: EnhancedMenu | null;
    footerMenu?: EnhancedMenu | null;
  };
};

export function PageLayout({children, layout}: LayoutProps) {
  const {headerMenu, footerMenu} = layout || {};
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <a href="#mainContent" className="sr-only">
        Skip to content
      </a>
      {headerMenu && layout?.shop.name && (
        <Header title={layout.shop.name} menu={headerMenu} />
      )}
      <main role="main" id="mainContent" className="flex-grow">
        {children}
      </main>
      {footerMenu && <Footer menu={footerMenu} />}
    </div>
  );
}

function Logo() {
  return (
    <div className="flex flex-col items-center leading-none select-none gap-[3px]">
      <span
        className="font-display font-black text-white uppercase tracking-[0.12em] text-[1.35rem]"
      >
        FINISHLINE
      </span>
      <div className="flex items-center gap-[7px]">
        <span className="block h-px w-[18px] bg-white/60" />
        <span className="text-white/80 text-[8px] tracking-[0.38em] font-normal uppercase leading-none">
          STUDIO
        </span>
        <span className="block h-px w-[18px] bg-white/60" />
      </div>
    </div>
  );
}

function Header({title, menu}: {title: string; menu?: EnhancedMenu}) {
  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer();

  const addToCartFetchers = useCartFetchers(CartForm.ACTIONS.LinesAdd);

  useEffect(() => {
    if (isCartOpen || !addToCartFetchers.length) return;
    openCart();
  }, [addToCartFetchers, isCartOpen, openCart]);

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      {menu && (
        <MobileMenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menu={menu} />
      )}
      <DesktopHeader title={title} menu={menu} openCart={openCart} />
      <MobileHeader title={title} openCart={openCart} openMenu={openMenu} />
    </>
  );
}

function CartDrawer({isOpen, onClose}: {isOpen: boolean; onClose: () => void}) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  if (!rootData) return null;

  return (
    <Drawer open={isOpen} onClose={onClose} heading="Cart" openFrom="right">
      <div className="grid">
        <Suspense fallback={<CartLoading />}>
          <Await resolve={rootData?.cart}>
            {(cart) => <Cart layout="drawer" onClose={onClose} cart={cart} />}
          </Await>
        </Suspense>
      </div>
    </Drawer>
  );
}

export function MobileMenuDrawer({
  isOpen,
  onClose,
  menu,
}: {
  isOpen: boolean;
  onClose: () => void;
  menu: EnhancedMenu;
}) {
  return (
    <Drawer open={isOpen} onClose={onClose} openFrom="left" heading="Menu">
      <nav className="grid gap-5 px-6 py-8">
        {(menu?.items || []).map((item) => (
          <Link
            key={item.id}
            to={item.to}
            target={item.target}
            onClick={onClose}
            className="text-lg font-medium text-primary hover:opacity-70 transition-opacity"
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </Drawer>
  );
}

function DesktopHeader({
  menu,
  openCart,
  title,
}: {
  openCart: () => void;
  menu?: EnhancedMenu;
  title: string;
}) {
  const params = useParams();

  return (
    <header
      role="banner"
      className="bg-[#141414] hidden lg:grid grid-cols-3 items-center h-nav sticky top-0 z-40 w-full px-10"
    >
      {/* Left: nav links */}
      <nav className="flex items-center gap-8">
        {(menu?.items || []).map((item) => (
          <Link
            key={item.id}
            to={item.to}
            target={item.target}
            prefetch="intent"
            className="text-white/75 hover:text-white text-sm font-normal transition-colors duration-150"
          >
            {item.title}
          </Link>
        ))}
      </nav>

      {/* Center: logo */}
      <div className="flex justify-center">
        <Link to="/" prefetch="intent" aria-label={title}>
          <Logo />
        </Link>
      </div>

      {/* Right: icons */}
      <div className="flex items-center justify-end gap-1">
        <Form
          method="get"
          action={params.locale ? `/${params.locale}/search` : '/search'}
        >
          <button
            type="submit"
            className="flex items-center justify-center w-9 h-9 text-white/75 hover:text-white transition-colors"
            aria-label="Search"
          >
            <IconSearch />
          </button>
        </Form>
        <CartCount openCart={openCart} />
      </div>
    </header>
  );
}

function MobileHeader({
  title,
  openCart,
  openMenu,
}: {
  title: string;
  openCart: () => void;
  openMenu: () => void;
}) {
  return (
    <header
      role="banner"
      className="bg-[#141414] flex lg:hidden items-center h-nav sticky top-0 z-40 w-full px-4"
    >
      {/* Left: hamburger */}
      <div className="flex-1 flex items-center">
        <button
          onClick={openMenu}
          className="flex items-center justify-center w-9 h-9 text-white/75 hover:text-white transition-colors"
          aria-label="Open menu"
        >
          <IconMenu />
        </button>
      </div>

      {/* Center: logo */}
      <Link to="/" prefetch="intent" aria-label={title}>
        <Logo />
      </Link>

      {/* Right: cart */}
      <div className="flex-1 flex items-center justify-end">
        <CartCount openCart={openCart} />
      </div>
    </header>
  );
}

function CartCount({openCart}: {openCart: () => void}) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  if (!rootData) return null;

  return (
    <Suspense fallback={<CartBadge count={0} openCart={openCart} />}>
      <Await resolve={rootData?.cart}>
        {(cart) => (
          <CartBadge count={cart?.totalQuantity || 0} openCart={openCart} />
        )}
      </Await>
    </Suspense>
  );
}

function CartBadge({
  count,
  openCart,
}: {
  count: number;
  openCart: () => void;
}) {
  const isHydrated = useIsHydrated();

  const inner = useMemo(
    () => (
      <div className="relative flex items-center justify-center w-9 h-9 text-white/75 hover:text-white transition-colors">
        <IconBag />
        {count > 0 && (
          <span className="absolute bottom-1 right-1 bg-white text-[#141414] text-[0.6rem] font-bold h-[14px] min-w-[14px] flex items-center justify-center rounded-full px-[3px] leading-none">
            {count}
          </span>
        )}
      </div>
    ),
    [count],
  );

  return isHydrated ? (
    <button onClick={openCart} aria-label={`Cart (${count} items)`}>
      {inner}
    </button>
  ) : (
    <Link to="/cart" aria-label={`Cart (${count} items)`}>
      {inner}
    </Link>
  );
}

function Footer({menu}: {menu?: EnhancedMenu}) {
  return (
    <footer
      role="contentinfo"
      className="bg-[#141414] text-white/70"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-12">
        {/* Logo + nav columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-white/10">
          {/* Logo column */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="self-start">
              <Logo />
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-[200px]">
              Personalisierte Laufposter für deinen großen Moment.
            </p>
          </div>

          {/* Nav columns */}
          {(menu?.items || []).map((item) => (
            <div key={item.id} className="flex flex-col gap-3">
              <h3 className="text-white text-sm font-semibold tracking-wide uppercase">
                {item.title}
              </h3>
              {item.items?.length > 0 && (
                <nav className="flex flex-col gap-2">
                  {item.items.map((subItem: ChildEnhancedMenuItem) => (
                    <FooterLink key={subItem.id} item={subItem} />
                  ))}
                </nav>
              )}
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="pt-6 text-xs text-white/40">
          &copy; {new Date().getFullYear()} Finishline Studio. Alle Rechte
          vorbehalten.
        </div>
      </div>
    </footer>
  );
}

function FooterLink({item}: {item: ChildEnhancedMenuItem}) {
  if (item.to.startsWith('http')) {
    return (
      <a
        href={item.to}
        target={item.target}
        rel="noopener noreferrer"
        className="text-sm text-white/60 hover:text-white transition-colors"
      >
        {item.title}
      </a>
    );
  }

  return (
    <Link
      to={item.to}
      target={item.target}
      prefetch="intent"
      className="text-sm text-white/60 hover:text-white transition-colors"
    >
      {item.title}
    </Link>
  );
}

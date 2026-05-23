import {
  defer,
  type MetaArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {Suspense} from 'react';
import {Await, useLoaderData} from '@remix-run/react';
import {Image, Money, getSeoMeta} from '@shopify/hydrogen';

import {Link} from '~/components/Link';
import {PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import type {ProductCardFragment} from 'storefrontapi.generated';
import {flattenConnection} from '@shopify/hydrogen';

export const headers = routeHeaders;

export async function loader(args: LoaderFunctionArgs) {
  const {params, context} = args;
  const {language, country} = context.storefront.i18n;

  if (
    params.locale &&
    params.locale.toLowerCase() !== `${language}-${country}`.toLowerCase()
  ) {
    throw new Response(null, {status: 404});
  }

  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);

  return defer({...deferredData, ...criticalData});
}

async function loadCriticalData({context, request}: LoaderFunctionArgs) {
  const {shop} = await context.storefront.query(SHOP_QUERY);
  return {
    shop,
    seo: seoPayload.home({url: request.url}),
  };
}

function loadDeferredData({context}: LoaderFunctionArgs) {
  const {language, country} = context.storefront.i18n;

  const featuredProducts = context.storefront
    .query(HOMEPAGE_FEATURED_PRODUCTS_QUERY, {
      variables: {country, language},
    })
    .catch((error) => {
      console.error(error);
      return null;
    });

  return {featuredProducts};
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function Homepage() {
  const {featuredProducts} = useLoaderData<typeof loader>();

  return (
    <>
      <HeroSection />

      {/* Featured Products */}
      <section className="px-6 md:px-10 lg:px-12 pt-12 pb-16">
        <h2 className="text-4xl font-bold text-[#1a1a1a] mb-8">
          Vorgestellte Läufe
        </h2>
        <Suspense fallback={<ProductGridSkeleton />}>
          <Await resolve={featuredProducts}>
            {(response) => {
              if (!response?.products?.nodes?.length) return null;
              return (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                  {response.products.nodes.slice(0, 4).map(
                    (product: ProductCardFragment, i: number) => (
                      <HomepageProductCard
                        key={product.id}
                        product={product}
                        loading={i < 2 ? 'eager' : 'lazy'}
                      />
                    ),
                  )}
                </div>
              );
            }}
          </Await>
        </Suspense>
      </section>

      <HowItWorksSection />

      <PersonalizedBannerSection />
    </>
  );
}

function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#d4d0cc]"
      style={{height: 'clamp(420px, 58vh, 640px)'}}
    >
      {/* Gradient placeholder — replace with <Image> once hero image is configured */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#c8c4be]/80 via-[#b8b4ae]/40 to-[#9a9690]/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col px-8 md:px-12 lg:px-16 py-10">
        {/* Push heading to ~40% down */}
        <div className="flex-[0.55]" />
        <h1 className="text-[3.5rem] md:text-[5rem] lg:text-[6rem] font-black text-[#1a1a1a] leading-none tracking-tight">
          Your Race.
        </h1>
        <div className="flex-1" />
        <div className="pb-2">
          <Link
            to="/collections/all"
            className="inline-block bg-[#1a1a1a] text-white px-7 py-4 rounded-xl text-sm font-semibold hover:bg-black transition-colors duration-150"
          >
            Finde dein Rennen
          </Link>
        </div>
      </div>
    </section>
  );
}

function HomepageProductCard({
  product,
  loading,
}: {
  product: ProductCardFragment;
  loading?: HTMLImageElement['loading'];
}) {
  const firstVariant = flattenConnection(product.variants)[0];
  if (!firstVariant) return null;
  const {image, price} = firstVariant;

  return (
    <Link to={`/products/${product.handle}`} prefetch="viewport">
      <div className="flex flex-col gap-3">
        <div className="relative aspect-[4/5] bg-[#f5f5f5] overflow-hidden rounded-sm">
          {image && (
            <Image
              data={image}
              aspectRatio="4/5"
              sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 50vw"
              loading={loading}
              className="object-cover w-full h-full"
              alt={image.altText || product.title}
            />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[#1a1a1a] text-sm font-normal leading-snug">
            {product.title}
          </span>
          <Money
            data={price!}
            className="text-[#1a1a1a] text-sm"
            withoutTrailingZeros
          />
        </div>
      </div>
    </Link>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex flex-col gap-3">
          <div className="aspect-[4/5] bg-[#f0f0f0] rounded-sm animate-pulse" />
          <div className="h-4 w-32 bg-[#f0f0f0] rounded animate-pulse" />
          <div className="h-4 w-16 bg-[#f0f0f0] rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      icon: (
        <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none" stroke="#b5a882" strokeWidth="1.5">
          <rect x="8" y="12" width="32" height="40" rx="2" />
          <line x1="14" y1="24" x2="34" y2="24" />
          <line x1="14" y1="32" x2="34" y2="32" />
          <line x1="14" y1="40" x2="26" y2="40" />
          <circle cx="48" cy="44" r="10" />
          <line x1="45" y1="44" x2="51" y2="44" />
          <line x1="48" y1="41" x2="48" y2="47" />
        </svg>
      ),
      title: 'Rennen wählen',
      description: 'Wähle dein Rennen aus unserem Katalog oder gib deine eigenen Daten ein.',
    },
    {
      icon: (
        <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none" stroke="#b5a882" strokeWidth="1.5">
          <rect x="6" y="14" width="52" height="36" rx="2" />
          <rect x="12" y="20" width="22" height="24" rx="1" />
          <circle cx="46" cy="32" r="7" />
          <line x1="46" y1="25" x2="46" y2="39" strokeWidth="1" />
          <line x1="39" y1="32" x2="53" y2="32" strokeWidth="1" />
        </svg>
      ),
      title: 'Poster personalisieren',
      description: 'Trage deinen Namen, deine Zeit und deine Startnummer ein.',
    },
    {
      icon: (
        <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none" stroke="#b5a882" strokeWidth="1.5">
          <path d="M16 48 L32 8 L48 48" />
          <line x1="20" y1="38" x2="44" y2="38" />
          <circle cx="32" cy="54" r="4" />
        </svg>
      ),
      title: 'Bestellen & genießen',
      description: 'Dein persönliches Finishline-Poster wird zu dir nach Hause geliefert.',
    },
  ];

  return (
    <section className="py-20 px-6 md:px-10 lg:px-12 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs tracking-[0.3em] text-[#9a9690] uppercase mb-3">
          Einfacher Prozess
        </p>
        <h2 className="text-4xl font-bold text-[#1a1a1a] mb-16">
          So funktioniert's
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center gap-4">
              <div className="mb-2">{step.icon}</div>
              <h3 className="text-base font-bold text-[#1a1a1a]">{step.title}</h3>
              <p className="text-sm text-[#6b6b6b] leading-relaxed max-w-[200px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PersonalizedBannerSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#9a9690]"
      style={{height: 'clamp(320px, 45vh, 520px)'}}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#6b6760]/80 to-[#9a9690]/40" />
      <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-12 lg:px-16 pb-14">
        <h2 className="text-[2.5rem] md:text-[4rem] lg:text-[5.5rem] font-black text-white leading-tight max-w-2xl">
          Personalisierte Marathon-Poster
        </h2>
        <div className="mt-6">
          <Link
            to="/collections/all"
            className="inline-block border border-white text-white px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-white hover:text-[#1a1a1a] transition-colors duration-150"
          >
            Kollektion entdecken
          </Link>
        </div>
      </div>
    </section>
  );
}

const SHOP_QUERY = `#graphql
  query shopInfo {
    shop {
      name
      description
    }
  }
` as const;

export const HOMEPAGE_FEATURED_PRODUCTS_QUERY = `#graphql
  query homepageFeaturedProducts($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: BEST_SELLING) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const;

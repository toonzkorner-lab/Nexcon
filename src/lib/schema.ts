import type { Faq, Post, Product, Project, Review, Service, Settings, Site } from "./cms/types";
import { PAGE_COPY, absImage, absUrl, clipMeta, siteOrigin } from "./seo";

function sameAs(s: Settings): string[] {
  return [s.discordUrl, s.telegramUrl].filter(Boolean);
}

export function organization(s: Settings) {
  const origin = siteOrigin(s);
  return {
    "@type": "Organization",
    "@id": `${origin}/#org`,
    name: s.studioName,
    alternateName: s.studioShort,
    url: `${origin}/`,
    email: s.email,
    logo: absUrl("/favicon.svg", s),
    image: absUrl("/og.jpg", s),
    description: s.seoDescription || PAGE_COPY.home.description,
    slogan: s.tagline,
    founder: { "@id": `${origin}/#founder` },
    sameAs: sameAs(s),
    address: {
      "@type": "PostalAddress",
      addressLocality: s.city || "South Texas",
      addressRegion: s.region || "TX",
      addressCountry: s.country || "US",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Texas" },
      { "@type": "Country", name: "United States" },
    ],
  };
}

export function person(s: Settings) {
  const origin = siteOrigin(s);
  return {
    "@type": "Person",
    "@id": `${origin}/#founder`,
    name: s.founderName,
    jobTitle: s.founderTitle,
    description: clipMeta(s.founderBio, 300),
    url: absUrl("/about", s),
    worksFor: { "@id": `${origin}/#org` },
    email: s.email,
    sameAs: sameAs(s),
  };
}

export function website(s: Settings) {
  const origin = siteOrigin(s);
  return {
    "@type": "WebSite",
    "@id": `${origin}/#website`,
    url: `${origin}/`,
    name: s.studioName,
    description: s.seoDescription || PAGE_COPY.home.description,
    inLanguage: "en-US",
    publisher: { "@id": `${origin}/#org` },
  };
}

export function professionalService(site: Site) {
  const s = site.settings;
  const origin = siteOrigin(s);
  const reviews = site.reviews.filter((r) => r.published !== false);
  const avg =
    reviews.length > 0 ? reviews.reduce((n, r) => n + (r.rating || 5), 0) / reviews.length : undefined;
  return {
    "@type": "ProfessionalService",
    "@id": `${origin}/#studio`,
    name: s.studioName,
    url: `${origin}/`,
    image: absUrl("/og.jpg", s),
    email: s.email,
    priceRange: "$$",
    description: s.seoDescription || PAGE_COPY.home.description,
    slogan: s.tagline,
    founder: { "@id": `${origin}/#founder` },
    parentOrganization: { "@id": `${origin}/#org` },
    areaServed: "US",
    serviceType: site.services.map((svc) => svc.name),
    knowsAbout: [
      "Web design",
      "Web development",
      "Discord bots",
      "Telegram bots",
      "Managed hosting",
      "Search engine optimization",
      ...s.stack.slice(0, 8),
    ],
    openingHours: `${s.deskDays} ${s.deskHours}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: s.city || "South Texas",
      addressRegion: s.region || "TX",
      addressCountry: s.country || "US",
    },
    sameAs: sameAs(s),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Studio services",
      itemListElement: site.services.map((svc, i) => ({
        "@type": "OfferCatalog",
        position: i + 1,
        name: svc.group,
        itemListElement: {
          "@type": "Offer",
          name: svc.name,
          url: absUrl(`/services/${svc.slug}`, s),
          price: String(svc.price),
          priceCurrency: "USD",
        },
      })),
    },
    ...(reviews.length
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: avg?.toFixed(1),
            reviewCount: String(reviews.length),
            bestRating: "5",
            worstRating: "1",
          },
          review: reviews.slice(0, 8).map((r) => reviewNode(r)),
        }
      : {}),
  };
}

export function reviewNode(r: Review) {
  return {
    "@type": "Review",
    author: { "@type": "Person", name: r.name },
    datePublished: r.date,
    reviewBody: r.quote,
    reviewRating: {
      "@type": "Rating",
      ratingValue: String(r.rating || 5),
      bestRating: "5",
    },
  };
}

export function breadcrumbs(settings: Settings, crumbs: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absUrl(c.path, settings),
    })),
  };
}

export function faqPage(settings: Settings, faqs: Faq[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function serviceNode(svc: Service, settings: Settings) {
  return {
    "@type": "Service",
    name: svc.name,
    serviceType: svc.group,
    description: clipMeta(svc.seoDescription || svc.description || svc.summary, 300),
    url: absUrl(`/services/${svc.slug}`, settings),
    provider: { "@id": `${siteOrigin(settings)}/#studio` },
    areaServed: "US",
    offers: {
      "@type": "Offer",
      price: String(svc.price),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: absUrl(`/services/${svc.slug}`, settings),
    },
  };
}

export function productNode(p: Product, settings: Settings) {
  return {
    "@type": "Product",
    name: p.name,
    description: clipMeta(p.seoDescription || p.description || p.blurb, 300),
    url: absUrl(`/store/${p.slug}`, settings),
    image: absImage(undefined, settings),
    sku: p.slug,
    brand: { "@type": "Brand", name: settings.studioName },
    offers: {
      "@type": "Offer",
      price: String(p.price),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: absUrl(`/store/${p.slug}`, settings),
    },
  };
}

export function articleNode(post: Post, settings: Settings) {
  const origin = siteOrigin(settings);
  return {
    "@type": "Article",
    headline: post.seoTitle || post.title,
    description: clipMeta(post.seoDescription || post.excerpt, 200),
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: absUrl(`/journal/${post.slug}`, settings),
    author: { "@id": `${origin}/#founder` },
    publisher: { "@id": `${origin}/#org` },
    image: absImage(post.image || undefined, settings),
    inLanguage: "en-US",
    keywords: post.tags.join(", "),
    wordCount: post.body.reduce((n, b) => n + b.paragraphs.join(" ").split(/\s+/).length, 0),
  };
}

export function creativeWorkNode(project: Project, settings: Settings) {
  return {
    "@type": "CreativeWork",
    name: project.seoTitle || project.title,
    description: clipMeta(project.seoDescription || project.summary, 240),
    url: absUrl(`/work/${project.slug}`, settings),
    dateCreated: project.year,
    creator: { "@id": `${siteOrigin(settings)}/#studio` },
    image: absImage(project.image, settings),
    keywords: [...project.tags, ...project.stack].join(", "),
    about: project.client,
  };
}

export function graph(nodes: unknown[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  };
}

export function homeGraph(site: Site) {
  return graph([organization(site.settings), person(site.settings), website(site.settings), professionalService(site)]);
}

export function studioGraph(site: Site) {
  return graph([
    organization(site.settings),
    person(site.settings),
    professionalService(site),
    faqPage(site.settings, site.faqs),
    breadcrumbs(site.settings, [
      { name: "Home", path: "/" },
      { name: "Studio", path: "/studio" },
    ]),
  ]);
}

export function aboutGraph(site: Site) {
  const s = site.settings;
  const origin = siteOrigin(s);
  return graph([
    organization(s),
    person(s),
    website(s),
    {
      "@type": "AboutPage",
      "@id": `${origin}/about#page`,
      url: absUrl("/about", s),
      name: PAGE_COPY.about.title,
      description: PAGE_COPY.about.description,
      isPartOf: { "@id": `${origin}/#website` },
      about: { "@id": `${origin}/#org` },
      mainEntity: { "@id": `${origin}/#founder` },
    },
    breadcrumbs(s, [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ]),
  ]);
}

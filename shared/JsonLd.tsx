import { projects } from "@/data/projects";
import {
  AUTHOR_NAME,
  AUTHOR_NAME_RU,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
  canonicalUrl,
} from "@/utils/site";

type JsonLdProps = {
  locale: string;
  title: string;
  description: string;
  jobTitle: string;
};

export default function JsonLd({ locale, title, description, jobTitle }: JsonLdProps) {
  const url = canonicalUrl(locale);
  const personId = `${SITE_URL}/#person`;
  const websiteId = `${SITE_URL}/#website`;
  const pageId = `${url}#webpage`;
  const isRu = locale === "ru";

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: isRu ? AUTHOR_NAME_RU : AUTHOR_NAME,
        alternateName: ["Frontend Sisyphus", isRu ? AUTHOR_NAME : AUTHOR_NAME_RU],
        jobTitle,
        description,
        url: SITE_URL,
        image: `${SITE_URL}/static/profile-picture.png`,
        email: "mailto:b03246599@gmail.com",
        nationality: {
          "@type": "Country",
          name: isRu ? "Россия" : "Russia",
        },
        homeLocation: {
          "@type": "Place",
          name: isRu ? "Москва" : "Moscow",
          address: {
            "@type": "PostalAddress",
            addressLocality: isRu ? "Москва" : "Moscow",
            addressCountry: "RU",
          },
        },
        knowsLanguage: ["ru", "en"],
        knowsAbout: [
          "Software engineering",
          "React",
          "Next.js",
          "TypeScript",
          "Neural networks",
          "DevOps",
          "Software testing",
          "Cybersecurity",
          "UX",
          "UI design",
        ],
        sameAs: SOCIAL_LINKS,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: SITE_NAME,
        alternateName: isRu ? AUTHOR_NAME_RU : AUTHOR_NAME,
        url: SITE_URL,
        inLanguage: ["ru", "en"],
        description,
        publisher: { "@id": personId },
        author: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": pageId,
        url,
        name: title,
        description,
        inLanguage: locale,
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        mainEntity: { "@id": personId },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${url}/opengraph-image`,
        },
      },
      {
        "@type": "ItemList",
        name: isRu ? "Избранные проекты" : "Selected projects",
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: project.title,
          url: project.siteLink.startsWith("http") ? project.siteLink : url,
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

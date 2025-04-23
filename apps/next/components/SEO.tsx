import { DefaultSeo, NextSeo } from "next-seo";
import defaultSeo from "../next.config";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
}

export const SEO = ({ title, description, keywords, url }: SEOProps) => {
  return (
    <>
      <DefaultSeo {...defaultSeo} />
      <NextSeo
        title={title || defaultSeo.title}
        description={description || defaultSeo.description}
        additionalMetaTags={
          keywords
            ? [
                ...defaultSeo.additionalMetaTags!,
                { name: "keywords", content: keywords },
              ]
            : defaultSeo.additionalMetaTags
        }
        openGraph={{
          ...defaultSeo.openGraph,
          url: url || defaultSeo.openGraph?.url,
        }}
      />
    </>
  );
};
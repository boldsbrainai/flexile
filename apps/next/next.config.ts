import NextBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";
import { DefaultSeoProps } from "next-seo";

const nextConfig: NextConfig = {
  webpack: (config) => {
    Object.assign(config.resolve.alias, {
      "@tiptap/extension-bubble-menu": false,
      "@tiptap/extension-floating-menu": false,
    });
    return config;
  },
  experimental: {
    typedRoutes: true,
    testProxy: true,
    serverActions: {
      allowedOrigins: [process.env.DOMAIN, process.env.APP_DOMAIN].filter((x) => x),
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flexile-(development|production)-(public|private).s3.amazonaws.com",
      },
    ],
  },
  i18n: {
    locales: ['pt-BR', 'en'],
    defaultLocale: 'pt-BR',
  },
};

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const defaultSeo: DefaultSeoProps = {
  title: "Energia Solar Fotovoltaica - GD, GC e Meli",
  description: "Descubra soluções em energia solar fotovoltaica para geração distribuída (GD), geração centralizada (GC) e regiões Meli no Brasil. Reduza custos e aumente a eficiência energética.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.seusite.com.br",
    site_name: "Energia Solar Brasil",
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content: "energia solar, fotovoltaica, GD, GC, Meli, Brasil, eficiência energética, energia renovável",
    },
  ],
};

export default defaultSeo;
export default withBundleAnalyzer(nextConfig);

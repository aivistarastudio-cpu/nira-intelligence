import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Explore NIRA - The Next Generation AI Platform",
  description: "Discover the advanced capabilities of NIRA Intelligence. From image generation to intelligent chat, explore how NIRA empowers creators and teams.",
  alternates: {
    canonical: '/nira',
  },
};

export default function NiraLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

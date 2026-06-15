import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Community Guidelines & Usage",
  description: "Community and usage guidelines for NIRA Intelligence. Understand the rules and best practices for generating content on our AI platform.",
  alternates: {
    canonical: '/guidelines',
  },
};

export default function GuidelinesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

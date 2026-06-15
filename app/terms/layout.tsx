import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Review the Terms of Service for using NIRA Intelligence. These terms govern your access to and use of our premium AI platform.",
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

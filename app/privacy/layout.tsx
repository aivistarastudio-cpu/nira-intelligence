import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the Privacy Policy for NIRA Intelligence. Learn how we collect, use, and protect your personal information and data.",
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

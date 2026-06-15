import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Login - Access Your NIRA Account",
  description: "Sign in to NIRA Intelligence to access premium AI tools for chat, image, and video generation.",
  alternates: {
    canonical: '/login',
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

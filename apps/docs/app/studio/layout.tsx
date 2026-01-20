import { StudioProvider } from '@/lib/studio/theme-context';

export const metadata = {
  title: 'r/ui Studio - Visual Theme Builder',
  description:
    'Design your theme visually, preview on real components, export production-ready code.',
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <StudioProvider>
      <div className="min-h-screen bg-zinc-950">{children}</div>
    </StudioProvider>
  );
}

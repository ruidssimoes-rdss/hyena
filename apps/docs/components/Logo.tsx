interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-3xl',
};

export function Logo({ className, size = 'md' }: LogoProps) {
  return (
    <span className={`${sizeClasses[size]} ${className ?? ''}`}>
      <span className="font-space-mono font-normal text-gray-900">r/</span>
      <span className="font-script text-gray-900" style={{ fontSize: '1.15em' }}>ui</span>
    </span>
  );
}

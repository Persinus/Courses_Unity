import { Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalloutProps {
  variant: 'tip' | 'warning';
  text: string;
}

const calloutConfig = {
  tip: {
    icon: Lightbulb,
    className: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-500/30 dark:text-blue-200',
    iconColor: 'text-blue-500',
  },
  warning: {
    icon: AlertTriangle,
    className: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/30 dark:border-yellow-500/30 dark:text-yellow-200',
    iconColor: 'text-yellow-500',
  },
};

export default function Callout({ variant, text }: CalloutProps) {
  const { icon: Icon, className, iconColor } = calloutConfig[variant];

  return (
    <div className={cn('flex items-start gap-4 rounded-lg border p-4 my-6', className)}>
      <Icon className={cn('h-5 w-5 mt-0.5 shrink-0', iconColor)} />
      <div className="flex-1">
        <p className="m-0 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

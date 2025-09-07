
'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface StatusIndicatorProps {
  lastUpdated: string;
}

export default function StatusIndicator({ lastUpdated }: StatusIndicatorProps) {
  const lastUpdatedDate = new Date(lastUpdated);
  const now = new Date();
  const monthsDiff = (now.getFullYear() - lastUpdatedDate.getFullYear()) * 12 + now.getMonth() - lastUpdatedDate.getMonth();

  let color = 'bg-red-500';
  let tooltipText = 'Last updated over 2 years ago';

  if (monthsDiff <= 6) {
    color = 'bg-green-500';
    tooltipText = 'Updated within the last 6 months';
  } else if (monthsDiff <= 24) {
    color = 'bg-yellow-500';
    tooltipText = 'Updated between 6 months and 2 years ago';
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className={`h-3 w-3 rounded-full ${color}`} />
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText} ({lastUpdatedDate.toLocaleDateString()})</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

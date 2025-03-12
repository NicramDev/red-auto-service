
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

const PageHeader = ({ title, description, className, children }: PageHeaderProps) => {
  return (
    <div className={cn("mb-8 mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4", className)}>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
        {description && <p className="text-gray-500 text-sm md:text-base">{description}</p>}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
};

export default PageHeader;

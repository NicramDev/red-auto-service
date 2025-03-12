
import { useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tag } from '@/lib/types';

interface TagBadgeProps {
  tag: Tag;
  removable?: boolean;
  onRemove?: () => void;
}

const TagBadge = ({ tag, removable = false, onRemove }: TagBadgeProps) => {
  const [isHovering, setIsHovering] = useState(false);
  
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onRemove) {
      onRemove();
    }
  };
  
  return (
    <div
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-all",
        "hover:shadow-sm"
      )}
      style={{ 
        backgroundColor: `${tag.color}20`, // Using hex with 20% opacity
        color: tag.color,
        borderColor: `${tag.color}40`
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <span>{tag.name}</span>
      {removable && (
        <button
          onClick={handleRemove}
          className={cn(
            "ml-1 rounded-full p-0.5 transition-opacity",
            isHovering ? "opacity-100" : "opacity-0"
          )}
          style={{ backgroundColor: `${tag.color}30` }}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
};

export default TagBadge;

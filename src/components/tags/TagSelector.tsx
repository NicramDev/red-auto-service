
import { useState } from 'react';
import { Plus, Tag as TagIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { tags, addTag, getTagById } from '@/lib/data';
import TagBadge from './TagBadge';
import { Tag } from '@/lib/types';
import { toast } from 'sonner';

interface TagSelectorProps {
  selectedTags: string[];
  onChange: (tagIds: string[]) => void;
}

const TagSelector = ({ selectedTags, onChange }: TagSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#FF5A5A');
  
  const handleToggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      onChange(selectedTags.filter(id => id !== tagId));
    } else {
      onChange([...selectedTags, tagId]);
    }
  };
  
  const handleAddNewTag = () => {
    if (newTagName.trim()) {
      const newTag = addTag(newTagName.trim(), newTagColor);
      onChange([...selectedTags, newTag.id]);
      setNewTagName('');
      toast.success(`Dodano nowy tag: ${newTagName}`);
    }
  };
  
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedTags.map(tagId => {
          const tag = getTagById(tagId);
          if (!tag) return null;
          return (
            <TagBadge 
              key={tagId} 
              tag={tag} 
              removable 
              onRemove={() => handleToggleTag(tagId)} 
            />
          );
        })}
        
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 gap-1 rounded-full"
            >
              <TagIcon className="h-3.5 w-3.5" />
              <span>Dodaj tagi</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4">
            <h4 className="font-medium mb-2">Wybierz tagi</h4>
            <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
              {tags.map(tag => (
                <div 
                  key={tag.id} 
                  className="flex items-center justify-between p-2 rounded hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleToggleTag(tag.id)}
                >
                  <TagBadge tag={tag} />
                  <input 
                    type="checkbox" 
                    checked={selectedTags.includes(tag.id)} 
                    readOnly
                  />
                </div>
              ))}
            </div>
            
            <div className="border-t pt-3">
              <h4 className="font-medium mb-2">Stwórz nowy tag</h4>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  placeholder="Nazwa tagu"
                  className="flex-1"
                />
                <input
                  type="color"
                  value={newTagColor}
                  onChange={(e) => setNewTagColor(e.target.value)}
                  className="h-10 w-10 p-1 border rounded cursor-pointer"
                />
              </div>
              <Button 
                className="w-full"
                disabled={!newTagName.trim()}
                onClick={handleAddNewTag}
              >
                <Plus className="h-4 w-4 mr-1" />
                Dodaj nowy tag
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default TagSelector;

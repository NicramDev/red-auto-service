
import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { tags, addTagWithStorage } from '@/lib/data';
import { v4 as uuidv4 } from 'uuid';
import TagBadge from './TagBadge';

interface TagSelectorProps {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}

const TagSelector = ({ selectedTags, onChange }: TagSelectorProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#3b82f6');

  const handleToggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      onChange(selectedTags.filter(id => id !== tagId));
    } else {
      onChange([...selectedTags, tagId]);
    }
  };

  const handleAddNewTag = () => {
    if (newTagName.trim()) {
      const newTag = {
        id: uuidv4(),
        name: newTagName.trim(),
        color: newTagColor
      };
      
      addTagWithStorage(newTag);
      onChange([...selectedTags, newTag.id]);
      
      // Reset form
      setNewTagName('');
      setNewTagColor('#3b82f6');
      setIsAdding(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map(tag => (
          <button
            key={tag.id}
            type="button"
            onClick={() => handleToggleTag(tag.id)}
            className={`flex items-center rounded-full px-3 py-1 text-sm ${
              selectedTags.includes(tag.id) 
                ? 'ring-2 ring-offset-2 ring-brand-500' 
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <TagBadge tag={tag} />
            {selectedTags.includes(tag.id) && (
              <X className="ml-1 h-3 w-3" />
            )}
          </button>
        ))}
        
        {!isAdding && (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-1 rounded-full border border-dashed border-gray-300 px-3 py-1 text-sm text-gray-500 hover:border-gray-400 hover:text-gray-700"
          >
            <Plus className="h-3 w-3" />
            Dodaj tag
          </button>
        )}
      </div>
      
      {isAdding && (
        <div className="mt-3 p-3 border border-gray-200 rounded-md bg-gray-50">
          <h4 className="text-sm font-medium mb-2">Nowy tag</h4>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Nazwa tagu"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Input
                type="color"
                value={newTagColor}
                onChange={(e) => setNewTagColor(e.target.value)}
                className="w-12 h-9 p-1"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={() => setIsAdding(false)}
            >
              Anuluj
            </Button>
            <Button 
              type="button" 
              size="sm"
              onClick={handleAddNewTag}
              disabled={!newTagName.trim()}
            >
              Dodaj
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TagSelector;

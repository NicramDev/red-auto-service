
import { useState } from 'react';
import { Plus, X, Trash2, Pencil } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/layout/Navbar';
import PageHeader from '@/components/layout/PageHeader';
import { tags, addTag, updateTag, deleteTag } from '@/lib/data';
import { Tag } from '@/lib/types';
import TagBadge from '@/components/tags/TagBadge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { v4 as uuidv4 } from 'uuid';

const Tags = () => {
  const [tagsList, setTagsList] = useState([...tags]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tagToDelete, setTagToDelete] = useState<string | null>(null);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#3b82f6');
  const [currentTag, setCurrentTag] = useState<Tag | null>(null);
  
  const { toast } = useToast();

  const handleAddNewTag = () => {
    if (newTagName.trim()) {
      const newTag = {
        id: uuidv4(),
        name: newTagName.trim(),
        color: newTagColor
      };
      
      addTag(newTag);
      setTagsList([...tagsList, newTag]);
      
      toast({
        title: "Sukces!",
        description: "Tag został dodany pomyślnie.",
      });
      
      // Reset form
      setNewTagName('');
      setNewTagColor('#3b82f6');
      setIsAdding(false);
    }
  };
  
  const handleEditTag = (tag: Tag) => {
    setCurrentTag(tag);
    setNewTagName(tag.name);
    setNewTagColor(tag.color);
    setIsEditing(true);
  };
  
  const handleUpdateTag = () => {
    if (currentTag && newTagName.trim()) {
      const updatedTag = {
        ...currentTag,
        name: newTagName.trim(),
        color: newTagColor
      };
      
      updateTag(updatedTag);
      
      setTagsList(tagsList.map(tag => 
        tag.id === currentTag.id ? updatedTag : tag
      ));
      
      toast({
        title: "Sukces!",
        description: "Tag został zaktualizowany pomyślnie.",
      });
      
      // Reset form
      setNewTagName('');
      setNewTagColor('#3b82f6');
      setCurrentTag(null);
      setIsEditing(false);
    }
  };
  
  const handleDeleteTag = (tagId: string) => {
    setTagToDelete(tagId);
  };
  
  const confirmDelete = () => {
    if (tagToDelete) {
      deleteTag(tagToDelete);
      setTagsList(tagsList.filter(tag => tag.id !== tagToDelete));
      
      toast({
        title: "Sukces!",
        description: "Tag został usunięty pomyślnie.",
      });
      
      setTagToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <PageHeader
          title="Zarządzaj tagami"
          description="Dodawaj, edytuj i usuwaj tagi dla pojazdów"
        >
          <Button onClick={() => setIsAdding(true)} className="brand-gradient">
            <Plus className="h-4 w-4 mr-1.5" />
            Dodaj tag
          </Button>
        </PageHeader>
        
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-sm glass-light">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {tagsList.map(tag => (
              <div key={tag.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full" style={{ backgroundColor: tag.color }}></div>
                  <span>{tag.name}</span>
                </div>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handleEditTag(tag)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteTag(tag.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {tagsList.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              Brak tagów. Kliknij "Dodaj tag" aby utworzyć nowy tag.
            </div>
          )}
        </div>
        
        {/* Dialog for adding a new tag */}
        <Dialog open={isAdding} onOpenChange={setIsAdding}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dodaj nowy tag</DialogTitle>
              <DialogDescription>
                Utwórz nowy tag dla pojazdów w Twojej flocie.
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex items-center gap-3 my-4">
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
                  className="w-16 h-10 p-1"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsAdding(false);
                  setNewTagName('');
                  setNewTagColor('#3b82f6');
                }}
              >
                Anuluj
              </Button>
              <Button onClick={handleAddNewTag} disabled={!newTagName.trim()}>
                Dodaj
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Dialog for editing a tag */}
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edytuj tag</DialogTitle>
              <DialogDescription>
                Zmień nazwę lub kolor wybranego tagu.
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex items-center gap-3 my-4">
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
                  className="w-16 h-10 p-1"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsEditing(false);
                  setNewTagName('');
                  setNewTagColor('#3b82f6');
                  setCurrentTag(null);
                }}
              >
                Anuluj
              </Button>
              <Button onClick={handleUpdateTag} disabled={!newTagName.trim()}>
                Zapisz
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Alert dialog for confirming tag deletion */}
        <AlertDialog open={!!tagToDelete} onOpenChange={() => setTagToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Czy na pewno chcesz usunąć ten tag?</AlertDialogTitle>
              <AlertDialogDescription>
                Ta akcja jest nieodwracalna. Tag zostanie usunięty, ale pojazdy oznaczone tym tagiem nie zostaną zmienione.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Anuluj</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                Usuń
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
};

export default Tags;

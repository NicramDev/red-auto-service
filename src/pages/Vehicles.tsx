
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Tag as TagIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/layout/Navbar';
import PageHeader from '@/components/layout/PageHeader';
import VehicleCard from '@/components/vehicles/VehicleCard';
import { vehicles, tags, getTagById } from '@/lib/data';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Tag } from '@/lib/types';

const Vehicles = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // Force refresh when a vehicle is deleted
  const handleVehicleDeleted = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Filter vehicles based on search query and tags
  const filteredVehicles = vehicles.filter(vehicle => {
    const searchString = `${vehicle.brand} ${vehicle.model} ${vehicle.licensePlate}`.toLowerCase();
    const matchesSearch = searchString.includes(searchQuery.toLowerCase());
    
    // If no tags are selected, show all vehicles that match the search
    if (selectedTags.length === 0) {
      return matchesSearch;
    }
    
    // If tags are selected, vehicle must have at least one of the selected tags
    const hasSelectedTag = vehicle.tags?.some(tagId => selectedTags.includes(tagId));
    return matchesSearch && hasSelectedTag;
  });

  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <PageHeader
          title="Pojazdy"
          description="Zarządzaj swoimi pojazdami"
        >
          <Button asChild className="brand-gradient">
            <Link to="/vehicles/new" className="flex items-center gap-1.5">
              <Plus className="h-4 w-4" />
              Dodaj pojazd
            </Link>
          </Button>
        </PageHeader>

        <div className="mb-6 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Szukaj pojazdów..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedTags.map(tagId => {
                  const tag = getTagById(tagId);
                  if (!tag) return null;
                  return (
                    <Badge 
                      key={tagId}
                      className="gap-1 cursor-pointer"
                      style={{ 
                        backgroundColor: `${tag.color}20`,
                        color: tag.color,
                        borderColor: `${tag.color}40`
                      }}
                      onClick={() => toggleTag(tagId)}
                    >
                      {tag.name}
                      <span className="ml-1">×</span>
                    </Badge>
                  );
                })}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-6 text-xs px-2"
                  onClick={() => setSelectedTags([])}
                >
                  Wyczyść
                </Button>
              </div>
            )}
            
            {selectedTags.length === 0 && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <TagIcon className="h-4 w-4" />
                    Filtruj po tagach
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <div className="space-y-2">
                    <h3 className="font-medium">Wybierz tagi</h3>
                    <div className="max-h-48 overflow-y-auto space-y-1">
                      {tags.map((tag: Tag) => (
                        <div 
                          key={tag.id}
                          className="flex items-center justify-between p-1.5 rounded hover:bg-gray-50 cursor-pointer"
                          onClick={() => toggleTag(tag.id)}
                        >
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: tag.color }}
                            />
                            <span>{tag.name}</span>
                          </div>
                          <input 
                            type="checkbox" 
                            checked={selectedTags.includes(tag.id)} 
                            readOnly 
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>

        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle, index) => (
              <VehicleCard 
                key={vehicle.id} 
                vehicle={vehicle} 
                index={index} 
                onDeleted={handleVehicleDeleted}
              />
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 mb-4">Nie znaleziono pojazdów</p>
            {searchQuery || selectedTags.length > 0 ? (
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTags([]);
                }}
                variant="outline"
              >
                Wyczyść wyszukiwanie i filtry
              </Button>
            ) : (
              <Button asChild className="brand-gradient">
                <Link to="/vehicles/new">
                  Dodaj pierwszy pojazd
                </Link>
              </Button>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Vehicles;

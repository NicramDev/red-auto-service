
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(true);
  const [showUpcomingServices, setShowUpcomingServices] = useState(true);
  const [showInsuranceReminders, setShowInsuranceReminders] = useState(true);
  const [showInspectionReminders, setShowInspectionReminders] = useState(true);
  
  const handleSaveSettings = () => {
    // In a real app, save these settings to localStorage or backend
    localStorage.setItem('settings', JSON.stringify({
      notifications,
      showUpcomingServices,
      showInsuranceReminders,
      showInspectionReminders
    }));
    
    toast({
      title: "Zapisano ustawienia",
      description: "Twoje ustawienia zostały zapisane pomyślnie."
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <PageHeader
          title="Ustawienia"
          description="Zarządzaj preferencjami aplikacji"
        />
        
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Powiadomienia</CardTitle>
              <CardDescription>Skonfiguruj, które powiadomienia chcesz otrzymywać</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications" className="flex flex-col space-y-1">
                  <span>Włącz powiadomienia</span>
                  <span className="text-sm text-gray-500">Pozwól aplikacji wyświetlać powiadomienia</span>
                </Label>
                <Switch 
                  id="notifications" 
                  checked={notifications} 
                  onCheckedChange={setNotifications} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="upcoming-services" className="flex flex-col space-y-1">
                  <span>Zbliżające się serwisy</span>
                  <span className="text-sm text-gray-500">Powiadomienia o zbliżających się serwisach</span>
                </Label>
                <Switch 
                  id="upcoming-services" 
                  checked={showUpcomingServices} 
                  onCheckedChange={setShowUpcomingServices}
                  disabled={!notifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="insurance-reminders" className="flex flex-col space-y-1">
                  <span>Wygasające ubezpieczenia</span>
                  <span className="text-sm text-gray-500">Przypomnienia o wygasających polisach OC/AC</span>
                </Label>
                <Switch 
                  id="insurance-reminders" 
                  checked={showInsuranceReminders} 
                  onCheckedChange={setShowInsuranceReminders}
                  disabled={!notifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="inspection-reminders" className="flex flex-col space-y-1">
                  <span>Wygasające przeglądy</span>
                  <span className="text-sm text-gray-500">Przypomnienia o zbliżających się przeglądach</span>
                </Label>
                <Switch 
                  id="inspection-reminders" 
                  checked={showInspectionReminders} 
                  onCheckedChange={setShowInspectionReminders}
                  disabled={!notifications}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Zapisz ustawienia</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;

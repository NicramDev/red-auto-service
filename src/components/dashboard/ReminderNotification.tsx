
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Car, Clock, AlertTriangle, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getUpcomingReminders, getVehicleById } from '@/lib/data';
import { cn } from '@/lib/utils';

const ReminderNotification = () => {
  const [reminders, setReminders] = useState<ReturnType<typeof getUpcomingReminders>>([]);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Check for reminders when the component mounts
    const checkReminders = () => {
      const upcomingReminders = getUpcomingReminders();
      setReminders(upcomingReminders);
      setIsVisible(upcomingReminders.length > 0);
    };
    
    checkReminders();
    
    // Since this is a client-side only app, we can set a timer to check periodically
    // In a real app with a backend, you might use websockets or push notifications
    const interval = setInterval(checkReminders, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);
  
  if (!isVisible || reminders.length === 0) return null;
  
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
      >
        <div className="bg-white rounded-lg shadow-lg border border-amber-200 overflow-hidden mx-4">
          <div className="bg-amber-50 border-b border-amber-100 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <h3 className="font-medium text-amber-800">
                {reminders.length === 1 ? 'Przypomnienie' : `Przypomnienia (${reminders.length})`}
              </h3>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {reminders.map((reminder, index) => {
              const vehicle = getVehicleById(reminder.vehicleId);
              if (!vehicle) return null;
              
              return (
                <Link
                  key={`${reminder.type}-${reminder.vehicleId}-${index}`}
                  to={reminder.type === 'service' ? `/services` : `/vehicles/${reminder.vehicleId}`}
                  className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "mt-0.5 p-1.5 rounded-full",
                      reminder.type === 'service' ? "bg-blue-100" : 
                      reminder.type === 'insurance' ? "bg-amber-100" : "bg-green-100"
                    )}>
                      {reminder.type === 'service' ? (
                        <Clock className="h-4 w-4 text-blue-600" />
                      ) : reminder.type === 'insurance' ? (
                        <ShieldAlert className="h-4 w-4 text-amber-600" />
                      ) : (
                        <Car className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    
                    <div>
                      <p className="font-medium">
                        {vehicle.brand} {vehicle.customName}
                      </p>
                      
                      <p className="text-sm text-gray-500 mt-1">
                        {reminder.type === 'service' && (
                          <>Zaplanowany serwis: {reminder.date} {reminder.time && `o godz. ${reminder.time}`}</>
                        )}
                        {reminder.type === 'insurance' && (
                          <>Kończy się ubezpieczenie: {reminder.date}</>
                        )}
                        {reminder.type === 'inspection' && (
                          <>Kończy się przegląd: {reminder.date}</>
                        )}
                      </p>
                      
                      <div className={cn(
                        "text-xs mt-2 px-2 py-1 rounded-full inline-block",
                        reminder.daysLeft === 0 
                          ? "bg-red-100 text-red-800" 
                          : reminder.daysLeft <= 3
                          ? "bg-amber-100 text-amber-800"
                          : "bg-blue-50 text-blue-800"
                      )}>
                        {reminder.daysLeft === 0 
                          ? "Dzisiaj!"
                          : reminder.daysLeft === 1
                          ? "Jutro"
                          : `Za ${reminder.daysLeft} dni`}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReminderNotification;

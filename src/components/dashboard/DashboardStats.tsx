
import { Car, Wrench, Calendar, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
  delay?: number;
}

export const StatCard = ({ 
  title, 
  value, 
  icon, 
  description, 
  trend, 
  trendValue, 
  className,
  delay = 0
}: StatCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.1 }}
      className={cn(
        "relative overflow-hidden p-6 rounded-xl glass-light border border-gray-200/50 hover:shadow-md transition-all-300",
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="text-2xl font-bold">{value}</div>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
          {trend && trendValue && (
            <div className={cn(
              "flex items-center text-xs font-medium",
              trend === 'up' ? 'text-green-600' : 
              trend === 'down' ? 'text-red-600' : 
              'text-gray-500'
            )}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
            </div>
          )}
        </div>
        <div className="h-10 w-10 rounded-full flex items-center justify-center bg-red-50 text-red-600">
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

interface DashboardStatsProps {
  totalVehicles: number;
  scheduledServices: number;
  completedServices: number;
  criticalAlerts: number;
}

const DashboardStats = ({ 
  totalVehicles, 
  scheduledServices, 
  completedServices,
  criticalAlerts 
}: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard
        title="Pojazdy"
        value={totalVehicles}
        description="W twoim garażu"
        icon={<Car className="h-5 w-5" />}
        delay={0}
      />
      <StatCard
        title="Nadchodzące serwisy"
        value={scheduledServices}
        description="Zaplanowane wizyty"
        icon={<Calendar className="h-5 w-5" />}
        delay={1}
      />
      <StatCard
        title="Wykonane serwisy"
        value={completedServices}
        description="Ukończone usługi"
        icon={<Wrench className="h-5 w-5" />}
        delay={2}
      />
      <StatCard
        title="Alerty"
        value={criticalAlerts}
        description="Wymagają uwagi"
        icon={<AlertCircle className="h-5 w-5" />}
        trend={criticalAlerts > 0 ? 'up' : 'neutral'}
        trendValue={criticalAlerts > 0 ? 'Sprawdź' : 'Brak'}
        className={criticalAlerts > 0 ? "border-red-200 bg-red-50/50" : ""}
        delay={3}
      />
    </div>
  );
};

export default DashboardStats;

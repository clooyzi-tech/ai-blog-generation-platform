interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string | React.ReactNode;
  trend?: {
    value: string;
    isUp: boolean;
  };
}

export default function StatsCard({ title, value, icon, trend }: StatsCardProps) {
  return (
    <div className="glass-panel p-6 rounded-xl relative overflow-hidden group">
      {/* Decorative gradient blur in background */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-[var(--color-primary)]/20 rounded-full blur-2xl group-hover:bg-[var(--color-primary)]/40 transition-colors duration-500" />
      
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-[var(--color-text-muted)] font-medium text-sm">{title}</h3>
        <div className="p-2 bg-[var(--color-bg-dark)] border border-[var(--color-border)] rounded-lg text-[var(--color-primary)] shadow-sm">
          {icon}
        </div>
      </div>
      
      <div className="flex items-end gap-3">
        <p className="text-3xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
          {value}
        </p>
        
        {trend && (
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full mb-1 ${
              trend.isUp
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-rose-500/10 text-rose-400"
            }`}
          >
            {trend.isUp ? "↑" : "↓"} {trend.value}
          </span>
        )}
      </div>
    </div>
  );
}

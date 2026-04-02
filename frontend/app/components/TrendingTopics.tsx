interface Topic {
  topic: string;
  trendScore: number;
}

interface TrendingTopicsProps {
  topics: Topic[];
  niche: string;
}

export default function TrendingTopics({ topics, niche }: TrendingTopicsProps) {
  return (
    <div className="glass-panel p-6 rounded-xl border border-[var(--color-border)] h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-white">Trending Topics</h2>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Based on <span className="text-[var(--color-primary)] font-medium">{niche}</span> niche
          </p>
        </div>
        <span className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg text-xl">🔥</span>
      </div>

      <div className="space-y-4">
        {topics.map((item, i) => (
          <div
            key={i}
            className="group flex items-start gap-4 p-4 rounded-lg bg-[var(--color-bg-dark)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 transition-all duration-300 relative overflow-hidden"
          >
            {/* Hover spark effect */}
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[var(--color-primary)] to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center font-bold text-sm">
              #{i + 1}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors truncate mb-2 whitespace-normal break-words">
                {item.topic}
              </h4>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-[var(--color-bg-card)] rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      item.trendScore > 90 ? 'bg-rose-500' :
                      item.trendScore > 80 ? 'bg-orange-500' :
                      'bg-emerald-500'
                    }`}
                    style={{ width: `${item.trendScore}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-[var(--color-text-muted)] w-8 text-right">
                  {item.trendScore}
                </span>
              </div>
            </div>
          </div>
        ))}

        {topics.length === 0 && (
          <div className="text-center py-8 text-[var(--color-text-muted)] animate-pulse border border-dashed border-[var(--color-border)] rounded-lg">
            Loading trending data...
          </div>
        )}
      </div>
    </div>
  );
}

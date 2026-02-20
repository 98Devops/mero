/**
 * Root loading state for page transitions
 * Displays skeleton loaders while pages are loading
 * 
 * **Validates: Requirements 5.4**
 */

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center space-y-6 md:space-y-8 max-w-5xl mx-auto">
            {/* Headline skeleton */}
            <div className="h-16 md:h-20 lg:h-24 bg-white/5 rounded-xl animate-pulse max-w-4xl mx-auto" />
            
            {/* Subheadline skeleton */}
            <div className="h-8 md:h-10 bg-white/5 rounded-lg animate-pulse max-w-2xl mx-auto" />
            
            {/* CTA buttons skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <div className="h-14 w-48 bg-white/5 rounded-lg animate-pulse" />
              <div className="h-14 w-48 bg-white/5 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section Skeleton */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="space-y-12 md:space-y-16">
            {/* Section title skeleton */}
            <div className="text-center space-y-4">
              <div className="h-12 md:h-14 bg-white/5 rounded-xl animate-pulse max-w-md mx-auto" />
              <div className="h-6 bg-white/5 rounded-lg animate-pulse max-w-xl mx-auto" />
            </div>
            
            {/* Grid skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="glass-card p-6 md:p-8 space-y-4 animate-pulse"
                  style={{
                    animationDelay: `${i * 100}ms`,
                  }}
                >
                  {/* Icon skeleton */}
                  <div className="w-12 h-12 bg-white/5 rounded-lg" />
                  
                  {/* Title skeleton */}
                  <div className="h-6 bg-white/5 rounded-lg w-3/4" />
                  
                  {/* Description skeleton */}
                  <div className="space-y-2">
                    <div className="h-4 bg-white/5 rounded w-full" />
                    <div className="h-4 bg-white/5 rounded w-5/6" />
                    <div className="h-4 bg-white/5 rounded w-4/6" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

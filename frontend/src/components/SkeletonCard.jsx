const SkeletonCard = () => (
  <div
    className="rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10
    animate-pulse"
  >
    <div className="aspect-video bg-white/10" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-white/10 rounded w-3/4" />
      <div className="h-3 bg-white/10 rounded w-full" />
      <div className="h-3 bg-white/10 rounded w-2/3" />
    </div>
  </div>
);

export default SkeletonCard;

export default function SkeletonServices() {
  return (
    <div className="p-4 animate-pulse">
      <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array(4).fill(0).map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  );
}
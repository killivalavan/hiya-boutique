export default function SkeletonClientsGallery() {
  return (
    <div className="p-4 animate-pulse">
      <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array(8).fill(0).map((_, i) => (
          <div key={i} className="aspect-square bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  );
}

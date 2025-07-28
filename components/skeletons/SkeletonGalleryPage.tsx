export default function SkeletonSection() {
  return (
    <div className="px-8 py-7">
      {/* Title Skeleton */}
      <div className="h-6 w-2/3 bg-gray-300 rounded animate-pulse mb-6"></div>

      {/* Large Block Skeleton */}
      <div className="w-full bg-gray-200 rounded-xl animate-pulse" style={{ height: '500px' }}></div>
    </div>
  );
}

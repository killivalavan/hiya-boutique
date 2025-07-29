export default function SkeletonSmallImageCarousel() {
  return (
    <div className="flex justify-center gap-4 my-6 overflow-x-auto px-4">
      {Array.from({ length: 5 }).map((_, idx) => (
        <div
          key={idx}
          className="w-28 h-40 md:w-36 md:h-52 rounded-lg bg-gray-200 animate-pulse shrink-0"
        />
      ))}
    </div>
  );
}

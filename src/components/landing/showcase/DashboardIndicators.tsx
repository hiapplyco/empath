
interface DashboardIndicatorsProps {
  count: number;
  activeIndex: number;
  onClick: (index: number) => void;
}

export const DashboardIndicators = ({ count, activeIndex, onClick }: DashboardIndicatorsProps) => {
  return (
    <div className="absolute bottom-12 left-0 right-0 flex justify-center space-x-1">
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          className={`w-2 h-2 rounded-full ${
            activeIndex === index ? "bg-purple-600" : "bg-gray-300"
          }`}
          onClick={() => onClick(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

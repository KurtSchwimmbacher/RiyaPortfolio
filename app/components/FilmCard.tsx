interface FilmCardProps {
  title: string;
  year: string;
  role: string;
  stillImage?: string;
  stillImageAlt?: string;
  isActive?: boolean;
  isCovered?: boolean;
}

export default function FilmCard({ 
  title, 
  year, 
  role, 
  stillImage, 
  stillImageAlt,
  isActive = false,
  isCovered = false
}: FilmCardProps) {
  return (
    <div className="w-full h-screen bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col relative">
      {/* Film Information - Overlay at top */}
      <div className="absolute top-0 left-0 right-0 p-6 space-y-3 text-white z-10">
        <h3 className="text-2xl md:text-3xl font-bold leading-tight drop-shadow-lg">
          {title}
        </h3>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="text-lg font-medium drop-shadow-md">
            {year}
          </div>
          <div className="text-lg drop-shadow-md">
            {role}
          </div>
        </div>
      </div>

      {/* Film Still Image */}
      <div className="flex-1 bg-gray-100 relative overflow-hidden">
        {stillImage ? (
          <img
            src={stillImage}
            alt={stillImageAlt || `${title} film still`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400 text-sm">Film Still</span>
          </div>
        )}
        
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent"></div>
      </div>
    </div>
  );
}

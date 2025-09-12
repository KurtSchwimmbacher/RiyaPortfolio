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
    <div className="w-full bg-white rounded-t-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Film Still Image */}
      <div className="w-full h-64 md:h-80 bg-gray-100 relative overflow-hidden">
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
      </div>
      
      {/* Film Information */}
      <div className="p-6 space-y-3">
        <h3 className="text-xl md:text-2xl font-bold text-black leading-tight">
          {title}
        </h3>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="text-sm text-gray-600 font-medium">
            {year}
          </div>
          <div className="text-sm text-gray-700">
            {role}
          </div>
        </div>
      </div>
    </div>
  );
}

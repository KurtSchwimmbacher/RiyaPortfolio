import AppWrapper from './components/AppWrapper';
import FilmShowreel from './components/FilmShowreel';

export default function Home() {
  return (
    <AppWrapper>
      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Large title - positioned center right */}
        <div className="flex justify-end items-center flex-1 px-8 pt-24">
          <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-black tracking-tight leading-none">
            Riya
          </h1>
        </div>
        
        {/* Bottom section with contact info and description */}
        <div className="flex justify-between items-end px-8 pb-8">
          {/* Left side - Email and Showreel */}
          <div className="space-y-4">
            <a 
              href="mailto:riya@gmail.com" 
              className="text-black text-lg underline underline-offset-4 hover:underline-offset-2 transition-all duration-200 block"
            >
              riya@gmail.com
            </a>
            <div className="text-black font-bold text-lg leading-tight">
              <div>Directors /</div>
              <div>Production</div>
              <div>Showreel</div>
            </div>
          </div>
          
          {/* Right side - Social handle and bio */}
          <div className="text-right space-y-2">
            <div className="text-black text-lg">
              *(Aliyah Bennett)
            </div>
            <p className="text-black text-sm max-w-xs leading-relaxed">
              Riyah is a creative director and production designer from Pretoria - South Africa. Founded by Aliyah Bennett
            </p>
          </div>
        </div>
      </div>
      
      {/* Film Showreel Section - positioned below hero */}
      <FilmShowreel />
    </AppWrapper>
  );
}

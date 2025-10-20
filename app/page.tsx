import FilmShowreel from './components/FilmShowreel';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Large title - positioned center right */}
        <div className="flex justify-end items-center flex-1 px-6 sm:px-8 pt-16 sm:pt-24">
          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold text-black tracking-tight leading-none">
            Riya
          </h1>
        </div>
        
        {/* Bottom section with contact info and description */}
        <div className="flex justify-between items-end px-6 sm:px-8 pb-6 sm:pb-8">
          {/* Left side - Email and Showreel */}
          <div className="space-y-3 sm:space-y-4">
            <a 
              href="mailto:riya.film.productions@gmail.com" 
              className="text-black text-base sm:text-lg underline underline-offset-4 hover:underline-offset-2 transition-all duration-200 block"
            >
              riya.film.productions@gmail.com
            </a>
            <div className="text-black font-bold text-base sm:text-lg leading-tight">
              <div>Directors /</div>
              <div>Production</div>
              <div>Showreel</div>
            </div>
          </div>
          
          {/* Right side - Social handle and bio */}
          <div className="text-right space-y-2">
            <div className="text-black text-base sm:text-lg">
              *(Aliyah Bennett)
            </div>
            <p className="text-black text-xs sm:text-sm max-w-[14rem] sm:max-w-xs leading-relaxed">
              Riyah is a creative director and production designer from Pretoria - South Africa. Founded by Aliyah Bennett
            </p>
          </div>
        </div>
      </div>
      
      {/* Film Showreel Section - positioned below hero */}
      <FilmShowreel />

      {/* Contact Section */}
      <section id="contact" className="relative z-10 min-h-screen flex flex-col justify-between">
        <div className="flex justify-end items-center flex-1 px-6 sm:px-8 pt-16 sm:pt-24">
          <h2 className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold text-black tracking-tight leading-none">
            Get in touch
          </h2>
        </div>

        <div className="flex justify-between items-end px-6 sm:px-8 pb-6 sm:pb-8">
          <div className="space-y-3 sm:space-y-4">
            <div className="text-black font-bold text-base sm:text-lg leading-tight">
              <div>Links</div>
            </div>
            <div className="flex flex-col space-y-2">
              <a href="#" className="text-black text-base sm:text-lg underline underline-offset-4 hover:underline-offset-2 transition-all duration-200">YouTube</a>
              <a href="#" className="text-black text-base sm:text-lg underline underline-offset-4 hover:underline-offset-2 transition-all duration-200">Instagram</a>
              <a href="#" className="text-black text-base sm:text-lg underline underline-offset-4 hover:underline-offset-2 transition-all duration-200">LinkedIn</a>
            </div>
          </div>
          <div className="text-right space-y-2">
            <p className="text-black text-xs sm:text-sm max-w-[14rem] sm:max-w-xs leading-relaxed">
              Fill these links later. This section sits below your film cards.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

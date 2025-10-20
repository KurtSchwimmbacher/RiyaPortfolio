export default function BioPage() {
  return (
    <div className="min-h-screen bg-black text-white relative">
      <div className="mx-auto px-6 sm:px-8 py-16 sm:py-24 max-w-6xl">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-10 sm:mb-12">Bio</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Image */}
          <div className="w-full">
            <img
              src="/assets/R6II0332.JPG"
              alt="Aliyah Bennett portrait"
              className="w-full h-[60vh] md:h-[80vh] object-cover object-top rounded-sm"
            />
          </div>

          {/* Content */}
          <div className="space-y-4 text-white/90 text-base sm:text-lg leading-relaxed">
            <p>
              I’m Aliyah Bennett, a South African film maker and production designer that explores the dark, weird and wonderful things of the world through film. I double majored in film and TV and production design at Open Window. They challenged us as film makers to push beyond what makes us comfortable, we had to find something wonderful in our discomfort and explore it. Now when I make films I make sure there is something that makes me uncomfortable and pushes me to learn new skills and ways of problem solving.
            </p>
            <p>
              My film ‘Mushrooms’, an experimental film about my dislike towards mushrooms, has won many awards as well as been scouted to play at many festivals. I am currently working on a film titled ’Whirlwind’ Which is a film that I have been developing for a year and plan to use in festivals. ‘Whirlwind’ is a film I created to challenge myself. I wanted to push the boundaries of what I know and create a well put together interesting piece.
            </p>
            <p>
              My films often explore my own emotions, essentially my therapy while also pushing visuals into the realms of surreal and strange.
            </p>
            <p>
              Through my work, I seek to blur the lines between reality and imagination.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


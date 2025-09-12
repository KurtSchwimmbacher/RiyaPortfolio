import FilmCard from './FilmCard';

// Sample film data
const filmData = [
  {
    title: "Die Fokken Voel",
    year: "2025",
    role: "Director",
    stillImage: "/assets/films/die_fokken_voel.png",
    stillImageAlt: "Die Fokken Voel film stil
  },
  {
    title: "Mushrooms",
    year: "2024",
    role: "Director",
    stillImage: "/assets/films/mushrooms.png",
    stillImageAlt: "Mushrooms film still"
  },
  {
    title: "The Overcoat",
    year: "2024",
    role: "Director & Production Designer",
    stillImage: "/assets/films/the_overcoat.png",
    stillImageAlt: "The Overcoat film still"
  },
  {
    title: "Til Death Do I Part",
    year: "2024",
    role: "Director & Production Designer",
    stillImage: "/assets/films/til_death_do_i_part.png",
    stillImageAlt: "Til Death Do I Part film still"
  },
  {
    title: "Womb With A Woo",
    year: "2024",
    role: "Production Designer",
    stillImage: "/assets/films/womb_with_a_woo.png",
    stillImageAlt: "Womb With A Woo film still"
  }
];

export default function FilmShowreel() {
  return (
    <div className="w-full bg-white rounded-t-3xl mt-8">
      {/* Cards Container */}
      <div className="space-y-0">
        {filmData.map((film, index) => (
          <FilmCard
            key={index}
            title={film.title}
            year={film.year}
            role={film.role}
            stillImage={film.stillImage}
            stillImageAlt={film.stillImageAlt}
            isActive={false}
            isCovered={false}
          />
        ))}
      </div>
    </div>
  );
}
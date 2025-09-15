export interface Film {
  title: string;
  year: string;
  role: string;
  stillImage?: string;
  stillImageAlt?: string;
  hasAwards?: boolean;
}

export const filmData: Film[] = [
  {
    title: "Whirlwind", 
    year: "2025",
    role: "Director, Writer, Producer",
    stillImage: "/assets/films/whirlwind.png",
    stillImageAlt: "Whirlwind film still"
  },
  {
    title: "The Can", 
    year: "2025",
    role: "Director, Writer, Producer, Production designer, Editor",
    stillImage: "/assets/films/the_can.png",
    stillImageAlt: "The Can film still"
  },
  {
    title: "Die Fokken Voel",
    year: "2025",
    role: " Production designer, Co-director, Gaffer, Actor ",
    stillImage: "/assets/films/die_fokken_voel.png",
    stillImageAlt: "Die Fokken Voel film still"
  },
  {
    title: "Mushrooms",
    year: "2024",
    role: "Director, Producer, Writer, Production designer, Editor",
    stillImage: "/assets/films/mushrooms.png",
    stillImageAlt: "Mushrooms film still",
    hasAwards: true
  },
  {
    title: "The Overcoat",
    year: "2024",
    role: "Director, Production designer, Producer, Editor",
    stillImage: "/assets/films/the_overcoat.png",
    stillImageAlt: "The Overcoat film still",
    hasAwards: true
  },
  {
    title: "Til Death Do I Part",
    year: "2024",
    role: "Director, Writer, Production designer, Editor, Producer",
    stillImage: "/assets/films/til_death_do_i_part.png",
    stillImageAlt: "Til Death Do I Part film still"
  },
  {
    title: "Womb With A Woo",
    year: "2024",
    role: "Head Production Designer",
    stillImage: "/assets/films/womb_with_a_woo.png",
    stillImageAlt: "Womb With A Woo film still"
  }
];

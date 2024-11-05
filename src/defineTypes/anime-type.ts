type Anime = {
    mal_id: number;
    title: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
    synopsis: string;
    score: number
    episodes: number
    status: string
    genres: Array<{ name: string }>
    aired: {
      string: string
  }
}

type Manga = {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  synopsis: string;
  volumes: number | null;
  chapters: number | null;
  score: number | null;
  popularity: number;
  status: string;
  published: { 
    from: string | null; 
    to: string | null };
  authors: { 
    mal_id: number; 
    name: string; 
    url: string }[]; 
}

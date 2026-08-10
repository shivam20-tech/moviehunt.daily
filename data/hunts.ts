export interface HuntItem {
  id: string;
  day: number;
  type: 'movie' | 'series';
  title: string;
  year: number;
  tagline: string;
  hook: string;
  imdbRating: number;
  cast: string[];
  director: string;
  episodes?: number;
  duration?: string;
  language: string;
  availableOn: {
    name: string;
    url: string;
  };
  storySummary: string;
  whyWatch: string;
  shouldYouWatch: string;
  bestFor: string[]; // e.g. ['🌧 Rainy evening', '🎧 Headphones recommended', '🍿 Watch alone']
  afterCreditsEmotion: string; // e.g. 'Speechless', 'Inspired', 'Heartbroken'
  emotionalLines: string[];
  bestScenes: string[];
  moodTags: string[];
  genres: string[];
  musicVibe: string;
  coverImage: string;
  images: string[];
  trailerYoutubeId?: string;
  hindiTrailerYoutubeId?: string;
  featured?: boolean;
}

export const HUNTS_DATA: HuntItem[] = [
  {
    id: 'day-1-tumbbad',
    day: 1,
    type: 'movie',
    title: 'Tumbbad',
    year: 2018,
    duration: '104 min',
    language: 'Hindi',
    tagline: 'THE MOST BEAUTIFUL INDIAN HORROR FILM',
    hook: 'India made THIS masterpiece?',
    imdbRating: 8.2,
    cast: ['Sohum Shah', 'Jyoti Malshe', 'Anita Date', 'Ronjini Chakraborty'],
    director: 'Rahi Anil Barve',
    availableOn: {
      name: 'Prime Video',
      url: 'https://primevideo.com'
    },
    storySummary: 'A mythological tale of a cursed village where perpetual rain washes over a hidden treasure guarded by Hastar, a fallen god of greed. A father passes down a dangerous secret across generations.',
    whyWatch: 'Some movies scare you. Some movies hypnotize you. Tumbbad does both. Every frame feels like a nightmare you can\'t escape, wrapped in gold and perpetual monsoon rain.',
    shouldYouWatch: 'YES. Mandatory for anyone who loves dark mythology, insane atmosphere, and visual masterpieces.',
    bestFor: ['🌧 Rainy evening', '🎧 Headphones mandatory', '😱 Dark mythology', '🎨 Visual masterpiece'],
    afterCreditsEmotion: 'Speechless',
    emotionalLines: [
      'Greed has a price.',
      'Every frame feels haunted.',
      'Beautiful… but terrifying.',
      'A nightmare wrapped in gold.',
      'This movie stays with you.'
    ],
    bestScenes: [
      'Opening rain sequence',
      'Dark shots of the mansion',
      'Lantern-lit hallway scenes',
      'Hastar reveal flashes'
    ],
    moodTags: ['😱 Thriller', '🤯 Mind-Blowing', '🌧 Rainy Evening'],
    genres: ['Dark Fantasy', 'Horror', 'Period Drama'],
    musicVibe: 'Dark ambient piano, slow haunting instrumental',
    coverImage: 'https://wallpapercave.com/wp/wp7319285.jpg',
    images: [
      "https://wallpaperaccess.com/full/9653795.jpg",
      "https://wallpaperaccess.com/full/9653827.jpg",
      "https://wallpaperaccess.com/full/9653918.jpg",
      "https://wallpaperaccess.com/full/9653928.jpg",
    ],
    trailerYoutubeId: 'Vz21G8V7wzg',
    featured: true
  },
  {
    id: 'day-2-ugly',
    day: 2,
    type: 'movie',
    title: 'Ugly',
    year: 2013,
    duration: '128 min',
    language: 'Hindi',
    tagline: 'THE DARKEST INDIAN THRILLER?',
    hook: 'This movie will ruin your mood.',
    imdbRating: 7.9,
    cast: ['Rahul Bhat', 'Ronit Roy', 'Tejaswini Kolhapure', 'Vineet Kumar Singh'],
    director: 'Anurag Kashyap',
    availableOn: {
      name: 'Disney+ Hotstar',
      url: 'https://www.hotstar.com'
    },
    storySummary: 'When a 10-year-old girl vanishes from a parked car in Mumbai, her struggling actor father and strict police-chief stepfather launch a frantic search that unravels deep personal greed.',
    whyWatch: 'Ugly is not entertainment — it\'s an intense psychological experience. Director Anurag Kashyap pulls no punches, exposing human selfishness.',
    shouldYouWatch: 'YES. If you love raw, realistic neo-noir thrillers that stay with you long after the credits roll.',
    bestFor: ['😱 Psychological Thriller', '🧠 Raw Realism', '🍿 Watch Alone'],
    afterCreditsEmotion: 'Speechless',
    emotionalLines: [
      'Everyone is broken here.',
      'Reality is scarier than horror.',
      'Trust nobody.'
    ],
    bestScenes: ['Rainy city police station interrogation', 'Dark apartment phone calls'],
    moodTags: ['😱 Thriller', '🤯 Mind-Blowing'],
    genres: ['Neo-Noir', 'Psychological Thriller'],
    musicVibe: 'Slow dark synth, lo-fi piano + heavy bass',
    coverImage: 'https://i.pinimg.com/1200x/21/07/8a/21078aa12cca3fb6a8e136d08346a413.jpg',
    images: ['https://m.media-amazon.com/images/M/MV5BOWNjZDEwYzgtZjFkMC00YTVhLThhNmEtMDVmZWIyMTc3YTlkXkEyXkFqcGc@._V1_QL75_UX678_.jpg',
      'https://m.media-amazon.com/images/M/MV5BNzM5OWNiYmYtYjEyNS00YzgwLTkyMDItYmEyOGFmNjk5Y2Q5XkEyXkFqcGc@._V1_QL75_UX699_.jpg',
      'https://m.media-amazon.com/images/M/MV5BNDZkZDNkMDYtZGM2NS00NTE2LWI1OTgtZWQyZjUzOWYyZmM1XkEyXkFqcGc@._V1_QL75_UX729_.jpg',
      'https://m.media-amazon.com/images/M/MV5BZmZhMWIwZTAtODA2Ny00MGFlLWFjNzQtNzliNmFhZDZkOGQwXkEyXkFqcGc@._V1_QL75_UX756_.jpg'],
    trailerYoutubeId: '4ougQY2-zpk',
    featured: true
  },
  {
    id: 'day-3-karwaan',
    day: 3,
    type: 'movie',
    title: 'Karwaan',
    year: 2018,
    duration: '114 min',
    language: 'Hindi',
    tagline: 'A ROAD TRIP FOR THE SOUL',
    hook: 'The feel-good road trip movie you didn\'t know you needed.',
    imdbRating: 7.6,
    cast: ['Irrfan Khan', 'Dulquer Salmaan', 'Mithila Palkar'],
    director: 'Akarsh Khurana',
    availableOn: {
      name: 'Prime Video',
      url: 'https://primevideo.com'
    },
    storySummary: 'Two strangers and a rebellious teenage girl embark on an unexpected road trip across scenic South India due to a hilarious body mix-up, finding humor, peace, and connection along the journey.',
    whyWatch: 'Irrfan Khan\'s effortless comedic brilliance paired with Dulquer Salmaan\'s grounded performance makes Karwaan a warm, soulful, and comforting slice-of-life masterpiece.',
    shouldYouWatch: 'YES. Perfect for cozy evenings when you want a quiet, heartwarming smile.',
    bestFor: ['😊 Feel Good', '🚗 Scenic Road Trip', '☕ Comfort Watch', '❤️ Soulful Humour'],
    afterCreditsEmotion: 'Happy',
    emotionalLines: [
      'Irrfan Khan\'s charm is unmatched.',
      'Sometimes wrong turns lead to the right places.',
      'A quiet comfort film for heavy days.'
    ],
    bestScenes: ['Irrfan Khan\'s roadside van monologues', 'Kerala backwater driving shots'],
    moodTags: ['😊 Feel Good', '❤️ Meaningful'],
    genres: ['Slice of Life', 'Road Comedy', 'Drama'],
    musicVibe: 'Prateek Kuhad acoustic guitar, gentle ukulele',
    coverImage: 'https://wallpapercave.com/wp/wp8160169.jpg',
    images: [
      "https://wallpaperaccess.com/full/26536755.jpg",
      "https://wallpaperaccess.com/full/26536781.jpg",
      "https://wallpaperaccess.com/full/26536771.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Q0gG7sqSpPAmDpnBH-CZ9BHpExSVLUCFaVzmk3oy-g&s=10"],
    trailerYoutubeId: 'IUCeN7kelXs',
    featured: true
  },
  {
    id: 'day-4-masaan',
    day: 4,
    type: 'movie',
    title: 'Masaan',
    year: 2015,
    duration: '109 min',
    language: 'Hindi',
    tagline: 'HEALING BEGINS WHEN YOU LET GO',
    hook: 'This movie will heal something inside you.',
    imdbRating: 8.1,
    cast: ['Vicky Kaushal', 'Richa Chadha', 'Sanjay Mishra', 'Shweta Tripathi', 'Pankaj Tripathi'],
    director: 'Neeraj Ghaywan',
    availableOn: {
      name: 'Disney+ Hotstar',
      url: 'https://www.hotstar.com'
    },
    storySummary: 'Set on the ancient ghats of Varanasi along the Ganges, two parallel lives collide with destiny. Devi, a young woman, battles police extortion and societal stigma after a tragic hotel raid. Meanwhile, Deepak, a lower-caste Dom boy whose family burns cremation pyres, falls in love with Shaalu, an upper-caste college girl.',
    whyWatch: 'Masaan won two prestigious awards at the Cannes Film Festival (FIPRESCI Prize & Promising Future Award). Neeraj Ghaywan\'s masterpiece features Indian Ocean & Swanand Kirkire\'s timeless music ("Tu Kisi Rail Si"), Avinash Arun\'s poetic Varanasi cinematography, and Vicky Kaushal\'s iconic, tear-jerking debut.',
    shouldYouWatch: 'YES. Essential, life-changing viewing for anyone who loves The Lunchbox, October, A Death in the Gunj, or Udaan.',
    bestFor: ['🏆 Cannes Award Winner', '❤️ Deeply Moving Romance & Healing', '🌅 Poetic Varanasi Ghats', '🎭 Vicky Kaushal Breakout Masterpiece'],
    afterCreditsEmotion: 'Tearful',
    emotionalLines: [
      'Hope always returns.',
      'Some scars never fade.',
      'Life goes on.',
      'Heartbreaking yet beautiful.',
      'A modern masterpiece.'
    ],
    bestScenes: [
      'Deepak & Shaalu\'s sweet balloon date along the Ganges',
      'Vicky Kaushal\'s legendary "Yeh dukh kahe khatam nahi hota be" riverbank monologue',
      'Sangam confluence boat scene climax'
    ],
    moodTags: ['😢 Emotional', '❤️ Meaningful', '😊 Feel Good'],
    genres: ['Poetic Drama', 'Romance', 'Social Realism', 'Hindi Masterpiece'],
    musicVibe: 'Indian Ocean soft piano, acoustic guitar, emotional Sitar & Shehnai, "Tu Kisi Rail Si" folk score',
    coverImage: 'https://i.pinimg.com/736x/ef/72/35/ef723501148a0f21e8b59f743aa7cba2.jpg',
    images: [
      "https://wallpaperaccess.com/full/12593570.jpg",
      "https://wallpaperaccess.com/full/12593579.jpg",
      "https://wallpaperaccess.com/full/12593609.jpg",
      "https://wallpaperaccess.com/full/12593639.jpg"
    ],
    featured: true,
    trailerYoutubeId: 'SKJfBo3xMW0'
  },
  {
    id: 'day-5-ship-of-theseus',
    day: 5,
    type: 'movie',
    title: 'Ship of Theseus',
    year: 2012,
    duration: '143 min',
    language: 'English / Hindi',
    tagline: 'THE SMARTEST INDIAN FILM?',
    hook: 'This movie feels like a philosophy dream.',
    imdbRating: 8.0,
    cast: ['Aida El-Kashef', 'Neeraj Kabi', 'Sohum Shah'],
    director: 'Anand Gandhi',
    availableOn: {
      name: 'YouTube',
      url: 'https://youtube.com'
    },
    storySummary: 'Three stories intersect around the paradox of identity: a blind Egyptian photographer regaining her sight, a monk facing a life-and-death ethical crisis, and a stockbroker uncovering organ trafficking.',
    whyWatch: 'Ship of Theseus doesn\'t just entertain you — it changes the way you think. Every conversation feels meaningful, exploring identity, ethics, and what makes us human.',
    shouldYouWatch: 'YES. For anyone seeking cinema in its purest, most intelligent philosophical form.',
    bestFor: ['🤯 Philosophical Cinema', '🧠 Deep Thinking', '🍿 Watch Alone', '🎨 Pure Art Cinema'],
    afterCreditsEmotion: 'Inspired',
    emotionalLines: [
      'Cinema with a soul.',
      'Quietly life-changing.',
      'This movie makes you think deeply.'
    ],
    bestScenes: ['Monk\'s philosophical debates in the temple', 'Photographer discovering light and shadow'],
    moodTags: ['🤯 Mind-Blowing', '❤️ Meaningful'],
    genres: ['Philosophical Drama', 'Art Cinema'],
    musicVibe: 'Ambient electronic, soft experimental piano',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtzV3VQfABvJr_5Qdoz_wewsPpBx-LjEdx4n5mAeM66A&s=10',
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdazqlcfVKPjLPBIkSzL5UhKWi8gUmTK16tfSXQj49LQ&s=10',
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSba-R4Q36JgRJ-vllwu0xqbaO-6HPv83YzvjuRvM467g&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLEB8vUrDb65_btNCPwhBoc0WYzp0PGh_EIqVpYyFRWg&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7cSYedieUe4Zw7Dtz14OjFHzuKpSJq1h8_6oPAKE2bQ&s=10"],
    trailerYoutubeId: 'S5JW92zk32s',
    featured: true
  },
  {
    id: 'day-6-a-death-in-the-gunj',
    day: 6,
    type: 'movie',
    title: 'A Death in the Gunj',
    year: 2016,
    duration: '110 min',
    language: 'English',
    tagline: 'SOME PAIN MAKES NO SOUND',
    hook: 'The saddest movie you\'ll never forget.',
    imdbRating: 7.5,
    cast: ['Vikrant Massey', 'Kalki Koechlin', 'Tillotama Shome', 'Om Puri', 'Jim Sarbh', 'Ranvir Shorey'],
    director: 'Konkona Sen Sharma',
    availableOn: {
      name: 'Prime Video',
      url: 'https://www.primevideo.com'
    },
    storySummary: 'Set during a family road-trip vacation in McCluskieganj in 1979, Shutu, a quiet, sensitive 23-year-old student grieving his father\'s death, struggles to fit in with his assertive, careless relatives and friends. As casual cruelty, emotional neglect, and toxic masculinity build up, Shutu sinks into quiet isolation with devastating consequences.',
    whyWatch: 'Konkona Sen Sharma\'s directorial debut won the Filmfare Award for Best Debut Director. Featuring Vikrant Massey\'s career-defining performance as Shutu alongside Sagar Desai\'s haunting acoustic score and Sirsha Ray\'s misty autumn cinematography.',
    shouldYouWatch: 'YES. Must-watch for lovers of Masaan, October, Udaan, The Lunchbox, or quiet, deeply moving psychological family dramas.',
    bestFor: ['🌲 Heartbreaking Character Study', '🏆 Konkona Sen Sharma Debut Masterpiece', '🎭 Vikrant Massey Career-Best', '🌧️ Atmospheric 1970s McCluskieganj'],
    afterCreditsEmotion: 'Heartbroken',
    emotionalLines: [
      'Be kind. Always.',
      'Silence hides pain.',
      'Some wounds are invisible.',
      'Beautifully heartbreaking.',
      'A masterpiece in silence.'
    ],
    bestScenes: [
      'McCluskieganj misty forest walk with blue butterfly',
      'Family dinner party planchette spirit game confrontation',
      'Heart-shattering gunj climax in the winter forest'
    ],
    moodTags: ['😢 Emotional', '❤️ Meaningful', '🌧️ Rainy Evening'],
    genres: ['Psychological Period Drama', 'Family Tragedy', 'Indian Independent Masterpiece'],
    musicVibe: 'Sagar Desai soft piano, ambient strings, gentle acoustic guitar, emotional 1970s folk score',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Fn-sMe9hJ62gD1zOQefxT-UXUdTHOvQnmyFvQNuiFA&s=10',
    images: [
      'https://resizing.flixster.com/XZChX_k6ofMiRVVogLMpGTO-glM=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p14300688_i_h10_ab.jpg',
      "https://media.newyorker.com/photos/5c7075cc621ded2a5f275bed/master/w_2560%2Cc_limit/Sheena-A-Death-in-the-Gunj.jpg",
      "https://m.media-amazon.com/images/S/pv-target-images/39001898dd2476aa289ba7be5280b7892d387a4895a9b00c96b17c498f9f29c2.jpg",
      "https://variety.com/wp-content/uploads/2016/09/a-death-in-the-gunj-tiff.jpg"],
    featured: true,
    trailerYoutubeId: 'XliKkuxa_nA'
  },
  {
    id: 'day-7-no-smoking',
    day: 7,
    type: 'movie',
    title: 'No Smoking',
    year: 2007,
    duration: '127 min',
    language: 'Hindi',
    tagline: 'THE WEIRDEST INDIAN MASTERPIECE?',
    hook: 'India made THIS psychological nightmare?',
    imdbRating: 7.3,
    cast: ['John Abraham', 'Ayesha Takia', 'Paresh Rawal', 'Ranvir Shorey'],
    director: 'Anurag Kashyap',
    availableOn: {
      name: 'Zee5',
      url: 'https://www.zee5.com'
    },
    storySummary: 'A chain-smoking businessman visits a mysterious rehabilitation center run by a guru to quit smoking, only to find himself trapped in a surreal, controlling nightmare.',
    whyWatch: 'No Smoking feels like a fever dream you can\'t escape. Director Anurag Kashyap created an ahead-of-its-time, mind-bending psychological thriller.',
    shouldYouWatch: 'YES. For fans of dark, weird, and addictive surrealist cinema.',
    bestFor: ['🤯 Surreal Nightmare', '🧠 Psychological Mind-Bend', '🍿 Watch Alone'],
    afterCreditsEmotion: 'Confused',
    emotionalLines: ['This movie feels cursed.', 'Confusing in the best way.'],
    bestScenes: ['Dark corridor and elevator sequences'],
    moodTags: ['🤯 Mind-Blowing', '😱 Thriller'],
    genres: ['Surreal Thriller', 'Psychological Neo-Noir'],
    musicVibe: 'Dark experimental synth, distorted ambient music',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFFdKZEjz0dduDKijA6wissNXJMrri1yDWTGfJQivAv3ML29NH4dcheVMV&s=10',
    images: ["https://m.media-amazon.com/images/S/pv-target-images/d8caac28e77cfa6f78273d67e19b17a9a4a47b18c7aee756ee4fb9d108978f25.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Vm6Tqt-7KayAM7a00LLPKiFvyY5XdfTADxkmdKA0QZcgBshNkSs0dj4&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSriqMsHOE3gur6rewEqLfYeJNstlJttIWrRg99AeDJQoKbXHiGn1ajSlw_&s=10",
      "https://preview.redd.it/thoughts-on-no-smoking-ot-it-really-mind-boggling-as-people-v0-ipdfn2lda4ua1.jpg?auto=webp&s=c4ed80a05b4a074726a144a8b7ce8153fbfd07d1"],
    trailerYoutubeId: '53D_Qs1C6k4',
    featured: true
  },
  {
    id: 'day-8-raman-raghav-2-0',
    day: 8,
    type: 'movie',
    title: 'Raman Raghav 2.0',
    year: 2016,
    duration: '133 min',
    language: 'Hindi',
    tagline: 'THE MOST DISTURBING INDIAN THRILLER?',
    hook: 'This movie feels genuinely disturbing.',
    imdbRating: 7.3,
    cast: ['Nawazuddin Siddiqui', 'Vicky Kaushal', 'Sobhita Dhulipala'],
    director: 'Anurag Kashyap',
    availableOn: {
      name: 'Zee5',
      url: 'https://www.zee5.com'
    },
    storySummary: 'Set in contemporary Mumbai, a ruthless serial killer Ramanna finds a twisted soulmate connection in Raghavan, a corrupt, drug-addicted police officer investigating his brutal murders.',
    whyWatch: 'Some movies make villains scary; this movie makes humans scary. Nawazuddin Siddiqui delivers a chilling performance.',
    shouldYouWatch: 'YES. If you enjoy dark, gritty, and psychologically intense crime thrillers.',
    bestFor: ['😱 Disturbing Serial Killer', '🧠 Dark Neo-Noir'],
    afterCreditsEmotion: 'Speechless',
    emotionalLines: ['Chaos in human form.'],
    bestScenes: ['Neon-lit Mumbai night streets'],
    moodTags: ['😱 Thriller', '🤯 Mind-Blowing'],
    genres: ['Neo-Noir', 'Crime Thriller'],
    musicVibe: 'Dark techno ambience, distorted bass',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxwMWvqLGEbX64c6PTYKoF3d6iYH36YES8A7GBgA8AZQw53Yi7nEje1v4&s=10',
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXtUIPePt6MJ56nL9wyOFW_AAtC79RUg8cuHxKoICB3C2PQJFwxew7diZr&s=10',
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQic8va5W6oOh0WHLJp1RAvpVUiy-6kYJ5aCt2zBuic2WaAsPRKafWWhI&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKH4Rc09rX1sMbvcAEavfHq-708CG3pvbyu2RSHwnp8bAWB30C9B1Do1Q&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXtUIPePt6MJ56nL9wyOFW_AAtC79RUg8cuHxKoICB3C2PQJFwxew7diZr&s=10"
    ],
    trailerYoutubeId: 'xq1cEmhVa68',
    featured: true
  },
  {
    id: 'day-9-talvar',
    day: 9,
    type: 'movie',
    title: 'Talvar',
    year: 2015,
    duration: '132 min',
    language: 'Hindi',
    tagline: 'BASED ON A REAL CASE…',
    hook: 'This movie will mess with your mind.',
    imdbRating: 8.1,
    cast: ['Irrfan Khan', 'Konkona Sen Sharma', 'Neeraj Kabi', 'Sohum Shah'],
    director: 'Meghna Gulzar',
    availableOn: {
      name: 'Disney+ Hotstar',
      url: 'https://www.hotstar.com'
    },
    storySummary: 'Based on the infamous 2008 Noida double murder case, an experienced investigator confronts conflicting police perspectives.',
    whyWatch: 'The scariest part about Talvar? It feels real the entire time. Irrfan Khan delivers a masterclass in a Rashomon-style crime investigation thriller.',
    shouldYouWatch: 'YES. Essential viewing for lovers of grounded, intelligent true-crime cinema.',
    bestFor: ['🔍 True Crime Investigation', '🧠 Rashomon-style Thriller'],
    afterCreditsEmotion: 'Speechless',
    emotionalLines: ['Truth feels impossible here.'],
    bestScenes: ['Irrfan Khan\'s intense interrogation sequence'],
    moodTags: ['😱 Thriller', '🤯 Mind-Blowing'],
    genres: ['True Crime', 'Mystery Thriller'],
    musicVibe: 'Slow suspense piano',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ7zftaVD0O_jE2_GKJyYgWoQ7SwU504haD6qw98-djFOefzjcg_zJbPib&s=10',
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1mgXbM918a19eo6zgoHGQaFoBznZ2WnoZtu7Hhga8JDzMk_wlaHLT_88&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTljZzSbJjxfcg2q13iEsFhDQKs-v61aTO_wgak7nf2M51-RwGSzavZceQ&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO479XBio0pGkJ5cJd8z_p8Mpg-_zGHO1LEu3hqgj6nyu08yCO82cSx4OM&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHQJWNzi_GTMb3e3kwyOqfLXRRfckvXBQXe_l3u4n7lEIri2td6UzAcyY&s=10"],
    //images: ['https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1000&auto=format&fit=crop'],
    trailerYoutubeId: 'aQNMsw8Ljjc',
    featured: true
  },
  {
    id: 'day-10-black-friday',
    day: 10,
    type: 'movie',
    title: 'Black Friday',
    year: 2004,
    duration: '161 min',
    language: 'Hindi',
    tagline: 'THIS MOVIE FEELS TOO REAL.',
    hook: 'This movie feels TOO real.',
    imdbRating: 8.4,
    cast: ['Kay Kay Menon', 'Pavan Malhotra', 'Aditya Srivastava'],
    director: 'Anurag Kashyap',
    availableOn: {
      name: 'Disney+ Hotstar',
      url: 'https://www.hotstar.com'
    },
    storySummary: 'Based on Hussain Zaidi\'s book about the 1993 Bombay bomb blasts, Black Friday meticulously details the conspiracy and police manhunt.',
    whyWatch: 'Black Friday doesn\'t feel like a movie — it feels like documentary-level history haunting you.',
    shouldYouWatch: 'YES. A landmark in Indian cinema for raw, uncompromising crime history.',
    bestFor: ['🔍 True Crime Docu-Drama', '🧠 Brutal Realism'],
    afterCreditsEmotion: 'Speechless',
    emotionalLines: ['Chaos captured perfectly.'],
    bestScenes: ['Police investigation and manhunt across Mumbai'],
    moodTags: ['😱 Thriller', '🤯 Mind-Blowing'],
    genres: ['True Crime', 'Docu-Drama'],
    musicVibe: 'Indian Ocean dark docu soundtrack',
    coverImage: 'https://m.media-amazon.com/images/M/MV5BMjBmYzc2ZmMtZGMwZS00NDg4LTg2ZmEtYzdiYmUxYTQzNGQ1XkEyXkFqcGc@._V1_.jpg',
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcka_r1zVpiirmwS9vYlmv7LJC_PSlLnj001djpJtESwqpHOOWExMnWB9z&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIWaoikqt_RPCl6sp092rX-1tDzbAPUoHjfqJ1JW6LaeTDjRV5Hx4fY1g&s=10",
      "https://aambar.wordpress.com/wp-content/uploads/2016/07/black-friday-2004-2.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_NzoQaldVEx2bF-QGymeXbLBYyq_elVjKdtOigPDIMuBc0j5q5GHbiFqW&s=10"
    ],
    //images: ['https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop'],
    trailerYoutubeId: 'lnZ0O2IP4Uo',
    featured: true
  },
  {
    id: 'day-11-haider',
    day: 11,
    type: 'movie',
    title: 'Haider',
    year: 2014,
    duration: '160 min',
    language: 'Hindi',
    tagline: 'BEAUTIFUL. BUT DEVASTATING.',
    hook: 'This movie feels emotionally frozen.',
    imdbRating: 8.0,
    cast: ['Shahid Kapoor', 'Tabu', 'Kay Kay Menon', 'Shraddha Kapoor', 'Irrfan Khan'],
    director: 'Vishal Bhardwaj',
    availableOn: {
      name: 'Netflix',
      url: 'https://netflix.com'
    },
    storySummary: 'Set in conflict-ridden 1995 Kashmir, a young student Haider returns home after his father\'s disappearance to seek answers.',
    whyWatch: 'Haider isn\'t just a revenge story — it feels like sadness written as poetry.',
    shouldYouWatch: 'YES. Essential viewing for lovers of Shakespearean drama.',
    bestFor: ['❄️ Cold Snowy Aesthetics', '🎭 Shakespeare Adaptation'],
    afterCreditsEmotion: 'Heartbroken',
    emotionalLines: ['Pain hidden under silence.'],
    bestScenes: ['Snow-filled Kashmir landscapes'],
    moodTags: ['😢 Emotional', '🤯 Mind-Blowing'],
    genres: ['Psychological Tragedy', 'Political Drama'],
    musicVibe: 'Vishal Bhardwaj orchestral score',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNRPcrJO3bNZzITXUur4ZEWLvIr_K0vitOQvtuiDvpOhNG6zzTFY1DGvmb&s=10',
    images: ["https://sc0.blr1.cdn.digitaloceanspaces.com/article/29389-hdtqaymtru-1572781922.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl4ArIOFTJoPLMECdjPdYGGIW6cFDWI0k63YIpkX8Gzb2MGOcQkkEH7bM&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv-Or27lvKtMhgmY8HEs-Z1y3jseavI24FGhM33l1FNNywCd64wbwMm4o&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjJVYNUQvPz_wI380kJFi_m2Hgemq_Qc5ne2i_mZfJ3NQdoVw8v7_kHLEI&s=10"],
    trailerYoutubeId: 'kxY32xM3VHY',
    featured: true
  },
  {
    id: 'day-12-the-lunchbox',
    day: 12,
    type: 'movie',
    title: 'The Lunchbox',
    year: 2013,
    duration: '104 min',
    language: 'Hindi / English',
    tagline: 'THIS MOVIE FEELS LIKE A HUG.',
    hook: 'A wrong delivery created a masterpiece.',
    imdbRating: 7.8,
    cast: ['Irrfan Khan', 'Nimrat Kaur', 'Nawazuddin Siddiqui'],
    director: 'Ritesh Batra',
    availableOn: {
      name: 'Netflix',
      url: 'https://netflix.com'
    },
    storySummary: 'A mistaken delivery in Mumbai\'s famously efficient dabbawala lunchbox delivery system connects a lonely housewife Ila with a quiet widower Saajan.',
    whyWatch: 'In a world full of noise, The Lunchbox is a quiet conversation you\'ll never forget.',
    shouldYouWatch: 'YES. A comforting, heartwarming masterpiece about unexpected connections.',
    bestFor: ['😊 Warm Comfort Watch', '❤️ Gentle Romance'],
    afterCreditsEmotion: 'Inspired',
    emotionalLines: ['Two strangers. One connection.'],
    bestScenes: ['Mumbai local train sequences'],
    moodTags: ['😊 Feel Good', '❤️ Meaningful'],
    genres: ['Romantic Drama', 'Slice of Life'],
    musicVibe: 'Soft piano, warm acoustic guitar',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpw1ql0X0xMDqpmqbFYUnWfp2J8wiQ2YajR6TagvALLPCpYRzAfditl8Tz&s=10',
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGjEX2kxZU9oohvPPcTkv-79cTN-Z-Z8FWn28mJrITEJv534d3L_IITZE&s=10",
      "https://www.sonyclassics.com/thelunchbox/home/images/gallery/still-1.jpg",
      "https://m.media-amazon.com/images/S/pv-target-images/70f3d5186f834962ba3d6ad57321658d2dde46d9adddae823d8e310bdfc144fb._SX1080_FMjpg_.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6QIFKF8EFZkJwcPMVcn2aZKgpVgelG27F_mEXdrE7yhimA0RSNKnSwk6S&s=10"],
    trailerYoutubeId: 'sK3R0rvnlPs',
    featured: true
  },
  {
    id: 'day-13-maqbool',
    day: 13,
    type: 'movie',
    title: 'Maqbool',
    year: 2003,
    duration: '132 min',
    language: 'Hindi',
    tagline: 'POWER DESTROYS EVERYTHING.',
    hook: 'Bollywood\'s most underrated masterpiece?',
    imdbRating: 8.0,
    cast: ['Irrfan Khan', 'Tabu', 'Pankaj Kapur', 'Om Puri', 'Naseeruddin Shah'],
    director: 'Vishal Bhardwaj',
    availableOn: {
      name: 'Disney+ Hotstar',
      url: 'https://www.hotstar.com'
    },
    storySummary: 'Set in the Mumbai underworld, Maqbool, the trusted right-hand man of Don Abbaji, is manipulated by Nimmi to murder his boss and usurp the crime empire.',
    whyWatch: 'Some movies entertain you; some movies consume you. Maqbool belongs in the second category.',
    shouldYouWatch: 'YES. Essential for fans of dark crime tragedies, intense performances, and cinematic poetry.',
    bestFor: ['🎭 Shakespeare Adaptation', '🧠 Dark Underworld Tragedy'],
    afterCreditsEmotion: 'Speechless',
    emotionalLines: ['Power changes everything.'],
    bestScenes: ['Irrfan Khan and Tabu intense closeups in dark corridors'],
    moodTags: ['😱 Thriller', '🤯 Mind-Blowing'],
    genres: ['Crime Tragedy', 'Underworld Drama'],
    musicVibe: 'Dark orchestral strings, slow cinematic drums',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5_79wnGzgVaOkzxWnCZmUKOuim4edtWs0hoHXShr1vJgRW4PnbtMPaLM&s=10',
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQVFHCHUzTORsV8HKyBHUqfJUGJrJX5Z1Eisg-STtwaIjXMqPNXobYyq8&s=10",
      "https://indiancinema.sites.uiowa.edu/sites/indiancinema.sites.uiowa.edu/files/2020-04/Maqbool%25201.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbHK6o5V7oRVD4Ewz0l-0BpILjKUNtESIK00IlJTBH5QvuqWma7MWtZ58&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaVSLcmAijyWE9gKQU0Vx-tlCc5wbbyPVwGDs5RcvN-SNhc5l78bV8MqlD&s=10"],
    trailerYoutubeId: 'LESsmI1rJcQ',
    featured: true
  },
  {
    id: 'day-14-kumbalangi-nights',
    day: 14,
    type: 'movie',
    title: 'Kumbalangi Nights',
    year: 2019,
    duration: '135 min',
    language: 'Malayalam',
    tagline: 'THIS MOVIE HEALS YOU.',
    hook: 'The most beautiful movie nobody talks about.',
    imdbRating: 8.5,
    cast: ['Fahadh Faasil', 'Shane Nigam', 'Soubin Shahir', 'Sreenath Bhasi', 'Anna Ben'],
    director: 'Madhu C. Narayanan',
    availableOn: {
      name: 'Prime Video',
      url: 'https://primevideo.com'
    },
    storySummary: 'Four estranged, dysfunctional brothers living in a small island village in Kerala gradually overcome personal trauma.',
    whyWatch: 'Some movies make you cry. Some movies heal something inside you. Kumbalangi Nights does both.',
    shouldYouWatch: 'YES. Universally acclaimed, warm, and deeply healing Malayalam masterpiece.',
    bestFor: ['😊 Feel Good Healing', '🌊 Scenic Kerala Backwaters'],
    afterCreditsEmotion: 'Happy',
    emotionalLines: ['Broken people. Beautiful story.'],
    bestScenes: ['Backwater golden-hour sunset boat shots'],
    moodTags: ['😊 Feel Good', '❤️ Meaningful'],
    genres: ['Slice of Life', 'Family Drama'],
    musicVibe: 'Sushin Shyam warm acoustic guitar',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNZ7SrP4IXCjAEtkntLXoCg9vK4xBCkn54RYi2YXtXNvlN-elJZuEE58Q&s=10',
    images: ["https://sc0.blr1.cdn.digitaloceanspaces.com/article/130591-cujcbfzkkc-1573226920.jpeg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ29YPUWLGZ1wJT7mCUBRI2_gpLb9zPUs0Keb4OrmoQo6kRhOhT8uQV3Y4&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7IrL-soJEpsVrFg6rzCKyIJEAg8e4yJ-NL7RxcQDm5gk_CTfyLUSRFT8&s=10",
      "https://filmysasi.com/wp-content/uploads/2019/02/Kumbalangi-Nights-Malayalam-Film-Review.webp"],
    trailerYoutubeId: '3P4BFBSafF0',
    featured: true
  },
  {
    id: 'day-15-ankhon-dekhi',
    day: 15,
    type: 'movie',
    title: 'Ankhon Dekhi',
    year: 2014,
    duration: '107 min',
    language: 'Hindi',
    tagline: 'QUESTION EVERYTHING.',
    hook: 'This movie changed how I think.',
    imdbRating: 7.9,
    cast: ['Sanjay Mishra', 'Rajat Kapoor', 'Seema Pahwa', 'Taranjit Kaur'],
    director: 'Rajat Kapoor',
    availableOn: {
      name: 'Disney+ Hotstar',
      url: 'https://www.hotstar.com'
    },
    storySummary: 'Set in a crowded Old Delhi joint family household, Bauji experiences a sudden epiphany and vows to only believe things he experiences firsthand.',
    whyWatch: 'Some movies entertain you; some movies quietly change your perspective. Ankhon Dekhi does both.',
    shouldYouWatch: 'YES. A charming, witty, and profoundly philosophical indie masterpiece.',
    bestFor: ['🤯 Philosophical Perspective', '🏠 Old Delhi Warmth'],
    afterCreditsEmotion: 'Inspired',
    emotionalLines: ['Question everything.'],
    bestScenes: ['Sanjay Mishra\'s rooftop philosophical monologues'],
    moodTags: ['🤯 Mind-Blowing', '❤️ Meaningful'],
    genres: ['Philosophical Comedy-Drama', 'Indie'],
    musicVibe: 'Soft piano, reflective ambient music',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoO4rpdN1_jlH-4f2ns3yqzO4dldUIHRIFKT70O38lciBU31TCrPDDwUI&s=10',
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4CIw-W6vPlwjHMReBnyyca_K-jjyMakgnWCstgDDrFHGTHRVitxAH4nY&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKXONs8aBZ0CulrEWO_A-BzeeJE5pQmcshj-Ehb23kscFs-om1r2nCKOg&s=10",
      "https://m.media-amazon.com/images/M/MV5BYTdiMWYwMDQtNTUyOC00M2IxLTk4ODktYjA0YzRmYTk0NjhiXkEyXkFqcGc@._V1_.jpg",
      "https://images.indianexpress.com/2014/03/aankhon-dekhi.jpg"
    ], trailerYoutubeId: 'H3yKUHI2mE4',
    featured: true
  },
  {
    id: 'day-16-iratta',
    day: 16,
    type: 'movie',
    title: 'Iratta',
    year: 2023,
    duration: '112 min',
    language: 'Malayalam',
    tagline: 'NOTHING IS WHAT IT SEEMS.',
    hook: 'This thriller caught me completely off guard.',
    imdbRating: 7.7,
    cast: ['Joju George', 'Anjali', 'Srinda', 'Arya Salim'],
    director: 'Rohit M.G. Krishnan',
    availableOn: {
      name: 'Netflix',
      url: 'https://netflix.com'
    },
    storySummary: 'When an estranged police officer Vinod dies unexpectedly inside a police station, his estranged twin brother Pramod must investigate the complex chain of events.',
    whyWatch: 'Not every thriller needs action. Sometimes all it needs is a story that refuses to leave your mind.',
    shouldYouWatch: 'YES. A masterfully crafted mystery thriller with one of the most unexpected endings in modern Indian cinema.',
    bestFor: ['😱 Shocking Mind-Bending Twist', '🧠 Dark Crime Investigation'],
    afterCreditsEmotion: 'Speechless',
    emotionalLines: ['Nothing is what it seems.'],
    bestScenes: ['Rain-soaked police station investigation sequences'],
    moodTags: ['😱 Thriller', '🤯 Mind-Blowing'],
    genres: ['Psychological Thriller', 'Crime Mystery'],
    musicVibe: 'Dark ambient piano, slow suspense build-up',
    coverImage: 'https://resizing.flixster.com/OY822rB1oIUFB3NghvUMEDWwDFM=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p23955305_v_v9_aa.jpg',
    images: ["https://image.tmdb.org/t/p/original/6pyhhHn5yCNBfhBzOTWuB9Iplih.jpg",
      "https://image.tmdb.org/t/p/original/pAnaar2rD4Z3lAWQ9CBGSH8LUN0.jpg",
      "https://image.tmdb.org/t/p/original/gopRllYWNHSxV0doMyRsku7w9k8.jpg",
      "https://image.tmdb.org/t/p/original/5bG0BETR5mYlnMXYSFnDbWOWW1B.jpg"
    ],
    trailerYoutubeId: 'OIMILWxADV0',
    hindiTrailerYoutubeId: 'Sv141DrUJas',
    featured: true
  },
  {
    id: 'day-17-mard-ko-dard-nahi-hota',
    day: 17,
    type: 'movie',
    title: 'Mard Ko Dard Nahi Hota',
    year: 2018,
    duration: '134 min',
    language: 'Hindi',
    tagline: 'WHAT IF PAIN NEVER EXISTED?',
    hook: 'India\'s most unique action movie.',
    imdbRating: 7.4,
    cast: ['Abhimanyu Dassani', 'Radhika Madan', 'Gulshan Devaiah', 'Mahesh Manjrekar'],
    director: 'Vasan Bala',
    availableOn: {
      name: 'Netflix',
      url: 'https://www.netflix.com'
    },
    storySummary: 'Imagine being born without the ability to feel physical pain. For Surya, Congenital Insensitivity to Pain turns everyday life into a dangerous challenge. Obsessed with retro 80s VHS martial arts films, he trains in karate and sets out to save his childhood friend Supri and defeat a twin-brother villain.',
    whyWatch: 'Winner of the Midnight Madness People\'s Choice Award at the Toronto International Film Festival (TIFF). Vasan Bala created a retro-pop martial arts comedy masterpiece full of inventive slow-motion fight choreography and endless cinephile charm.',
    shouldYouWatch: 'YES. Perfect for lovers of retro martial arts, inventive action-comedy, and unique Indian indie cinema.',
    bestFor: ['🥋 Retro Martial Arts Homage', '🏆 TIFF People\'s Choice Winner', '🍿 Pop-Culture Action Comedy', '🎭 Gulshan Devaiah Dual Role'],
    afterCreditsEmotion: 'Happy',
    emotionalLines: [
      'Action with heart.',
      'Pain isn\'t the only weakness.',
      'Funny. Stylish. Different.',
      'Every fight feels creative.',
      'A hidden gem.'
    ],
    bestScenes: [
      'Surya\'s water-bag hydration backpack training sequence',
      'Supri\'s clinic fight with high-kick martial arts choreography',
      'Gulshan Devaiah\'s double role villain confrontation'
    ],
    moodTags: ['😊 Feel Good', '🤯 Mind-Blowing', '⚔️ High-Octane'],
    genres: ['Martial Arts Action Comedy', 'Retro Pop-Culture', 'Hindi Cinema'],
    musicVibe: 'Karan Kulkarni retro synthwave, funk-inspired action beats, energetic rock instrumental',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEf5FPLAqItHBJo_0gUZqXIVKnrssll6UgojS5tqMoSA&s',
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMYFkb9TTvrnxQpPPivu81D62xk-fENPeljG3jt9oG1A&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXtnlt_nnLldktlwxei9rQk_RbkPkZlvvF0AqzLvy_dA&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6lXF8WVfQiAS0SdtVpdJYW3Wj4AMNxTWBt78e9Hdo5w&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDpLHATvoyGZKYJ2dE4QYBFJUQn4dSnuXT515aUjVPtA&s=10"],
    featured: true,
    trailerYoutubeId: 'jb0-Mw_V_bA'
  },
  {
    id: 'day-18-jallikattu',
    day: 18,
    type: 'movie',
    title: 'Jallikattu',
    year: 2019,
    duration: '91 min',
    language: 'Malayalam',
    tagline: 'PURE CINEMATIC CHAOS.',
    hook: 'A buffalo escaped... and cinema happened.',
    imdbRating: 7.4,
    cast: ['Antony Varghese', 'Chemban Vinod Jose', 'Sabumon Abdusamad'],
    director: 'Lijo Jose Pellissery',
    availableOn: {
      name: 'Prime Video',
      url: 'https://primevideo.com'
    },
    storySummary: 'When a wild bull escapes from a butcher shop in a remote high-range Kerala village, the men of the village band together to hunt it down.',
    whyWatch: 'A movie about a buffalo... that somehow becomes one of the most intense films you\'ll ever watch.',
    shouldYouWatch: 'YES. A raw, relentless cinematic spectacle of sound design and visual frenzy.',
    bestFor: ['🔥 Pure Cinematic Madness', '🥁 Tribal Soundscape'],
    afterCreditsEmotion: 'Speechless',
    emotionalLines: ['Pure chaos on screen.'],
    bestScenes: ['Villagers chasing through dark night forests with flaming torches'],
    moodTags: ['😱 Thriller', '🤯 Mind-Blowing'],
    genres: ['Primal Thriller', 'Action Drama'],
    musicVibe: 'Prashant Pillai tribal percussion',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ73ydE-SUcruUZa1WTaph1KPOEm7MUh5B4ArBB8J4DYw&s=10',
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIdMuR02Jh1SLfsK9nLuAFqjK8E4zMrNHKGlwfLHlTDg&s=10',
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjnXXPo3_MWRJZazl593Qjp7OvhIkD1pq4AJjaL8q7vg&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvPachfZlNpc67viGNACvzyWPWAxA-pm1MCgo6loSIWw&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCfH7iKAI99wdYWBB9zpaxqJhtC3UpWbTAagHa5tgsnw&s=10"],
    trailerYoutubeId: 'ItcQNybOOHM',
    hindiTrailerYoutubeId: 'ykTPOyJVJdQ',
    featured: true
  },
  {
    id: 'day-19-super-deluxe',
    day: 19,
    type: 'movie',
    title: 'Super Deluxe',
    year: 2019,
    duration: '176 min',
    language: 'Tamil',
    tagline: 'NOTHING IS WHAT YOU EXPECT',
    hook: 'This movie breaks every rule of storytelling.',
    imdbRating: 8.2,
    cast: ['Vijay Sethupathi', 'Fahadh Faasil', 'Samantha Ruth Prabhu', 'Ramya Krishnan', 'Mysskin'],
    director: 'Thiagarajan Kumararaja',
    availableOn: {
      name: 'Netflix',
      url: 'https://www.netflix.com'
    },
    storySummary: 'One day. Four intertwined stories. A trans woman Shilpa returns to her family, a newlywed couple deals with a dead body, a group of teenagers tries to watch an adult film, and a religious father tests his faith. Thiagarajan Kumararaja crafts a bold, philosophical, hyper-stylized masterpiece.',
    whyWatch: 'Super Deluxe is one of the most audacious, multi-genre Indian films ever made. Featuring Yuvan Shankar Raja\'s hypnotic score, Nirav Shah\'s vibrant neon cinematography, and Vijay Sethupathi\'s National Award-winning performance as Shilpa.',
    shouldYouWatch: 'YES. Mandatory viewing for anyone who loves Pulp Fiction, Magnolia, Aaranya Kaandam, or groundbreaking cinema.',
    bestFor: ['🏆 National Award Winner (Vijay Sethupathi)', '🎨 Hyper-Stylized Masterpiece', '🌌 Philosophical Dark Comedy', '🍿 Unconventional Storytelling'],
    afterCreditsEmotion: 'Speechless',
    emotionalLines: [
      'Nothing is predictable.',
      'Every story matters.',
      'Chaos becomes beautiful.',
      'Bold. Brilliant. Unforgettable.',
      'A true masterpiece.'
    ],
    bestScenes: [
      'Shilpa\'s emotional reunion with her young son Rasku',
      'Vembu & Mugil disposing of the corpse sequence',
      'Alien monologue & philosophical climax resolution'
    ],
    moodTags: ['🤯 Mind-Blowing', '😱 Thriller', '❤️ Meaningful'],
    genres: ['Hyperlink Neo-Noir', 'Dark Comedy Drama', 'Philosophical Masterpiece'],
    musicVibe: 'Yuvan Shankar Raja dreamlike synth, ambient electronic, emotional retro piano, experimental cinematic soundtrack',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpMHNisQLWcvmhPWH9kH5098qLdJdjIzbxWw_HOKbfBnee70YGbR_aOx4&s=10',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9whOyxKXTqbV4Si_mAgYk8NqfFFxTkGa3pmYYUyV3xg&s=10',
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT394Lp3DdiUXNGoW4xlbTOJeRVJAOry7gUSrqlWGRfNA&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZFjorG1bTmnMIJvqkGYi1iuW7VkrVyBpkNIz4R84ytQ&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGH_FCl-2NSlZQAhNBTiiaCdOR7tQ7afYCkiiyR3gx2Q&s=10"
    ],
    featured: true,
    trailerYoutubeId: '3-Xq_Zz3nPA',
    hindiTrailerYoutubeId: 'zVyR4fLxkWk'
  },
  {
    id: 'day-20-mukundan-unni-associates',
    day: 20,
    type: 'movie',
    title: 'Mukundan Unni Associates',
    year: 2022,
    duration: '126 min',
    language: 'Malayalam',
    tagline: 'THE HERO IS THE VILLAIN.',
    hook: 'The main character is the villain.',
    imdbRating: 7.8,
    cast: ['Vineet Sreenivasan', 'Suraj Venjaramoodu', 'Aarsha Chandini Baiju'],
    director: 'Abhinav Sunder Nayak',
    availableOn: {
      name: 'Disney+ Hotstar',
      url: 'https://www.hotstar.com'
    },
    storySummary: 'Mukundan Unni, an ambitious but struggling advocate with zero ethical boundaries, stops at nothing to build his lucrative legal empire.',
    whyWatch: 'What if the villain was the main character... and you still couldn\'t look away?',
    shouldYouWatch: 'YES. A darkly hilarious, addictive Malayalam thriller satire.',
    bestFor: ['😈 Villain Protagonist', '🖤 Pitch Black Comedy'],
    afterCreditsEmotion: 'Speechless',
    emotionalLines: ['Success at any cost.'],
    bestScenes: ['Vineet Sreenivasan\'s chilling deadpan voiceover monologues'],
    moodTags: ['🤯 Mind-Blowing', '😱 Thriller'],
    genres: ['Dark Comedy Satire', 'Legal Crime Thriller'],
    musicVibe: 'Upbeat dark jazz piano, suspenseful electronic',
    coverImage: 'https://m.media-amazon.com/images/M/MV5BYjlkZWQ1ZWQtY2QyZi00ZDg3LThiOWYtNDgxZGNjY2U3ZGIzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfDoc3MaC1-86fKVVzDNsEFlx1rQv4z02M8bmNcPhAYg&s=10',
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNOIHcMQygU8LKqbMRd_yjfgqs2S43haayxf1govwBug&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXQAOcpr4wY5NrmVHN_D6d9CIYlsiGb22IlOuChsm2Gw&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaX1CoWb1FlL8VHc1Vgi6sQtvBdMAfEeY_nbxyEYCj3A&s=10"
    ],
    trailerYoutubeId: '4tzzEsI_qUA',
    hindiTrailerYoutubeId: 'PwAoLTe_yaQ',
    featured: true
  },
  {
    id: 'day-21-thithi',
    day: 21,
    type: 'movie',
    title: 'Thithi',
    year: 2015,
    duration: '123 min',
    language: 'Kannada',
    tagline: 'LIFE NEVER STOPS MOVING',
    hook: 'One funeral. Three generations. Endless life lessons.',
    imdbRating: 8.2,
    cast: ['Century Gowda', 'Singri Gowda', 'Channegowda', 'Abhishek H.N.'],
    director: 'Raam Reddy',
    availableOn: {
      name: 'Prime Video',
      url: 'https://www.primevideo.com'
    },
    storySummary: 'When 101-year-old local eccentric "Century Gowda" dies in a rural Mandya village in Karnataka, three generations of men react in wildly different ways. His son Gadappa wanders drunk and carefree; his grandson Thamanna schemes to sell ancestral land; his great-grandson Abhi chases a nomad girl.',
    whyWatch: 'Winner of 2 National Film Awards & Golden Leopard at Locarno International Film Festival. Raam Reddy cast non-professional local villagers, creating a satirical, lighthearted, yet deeply authentic portrayal of human nature.',
    shouldYouWatch: 'YES. Must-watch for lovers of Court, Kaaka Muttai, The Lunchbox, or realistic indie cinema.',
    bestFor: ['🏆 Locarno & National Award Winner', '🌾 Authentic Mandya Village Life', '😄 Dark Satirical Humor', '🍿 Non-Professional Cast Masterpiece'],
    afterCreditsEmotion: 'Inspired',
    emotionalLines: [
      'Life goes on.',
      'Simple stories last forever.',
      'Real people. Real emotions.',
      'Funny without trying.',
      'A hidden masterpiece.'
    ],
    bestScenes: [
      'Century Gowda shouting insults at passersby before his peaceful passing',
      'Gadappa wandering the countryside with his tiger-print blanket and brandy',
      'Grand 11th-day Thithi funeral feast gathering climax'
    ],
    moodTags: ['😊 Feel Good', '❤️ Meaningful', '🤯 Mind-Blowing'],
    genres: ['Dark Satirical Comedy', 'Social Realism', 'Kannada Indie Masterpiece'],
    musicVibe: 'Soft Kannada folk instrumental, gentle acoustic guitar, bamboo flute, ambient nature sounds',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW_7fim8g8iwYpqNrDc9XeD8H4Mqw3HSjvkjlMsIotPA&s=10',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqDOVJRi0kureCuahBhlGQtAUehFr8kZB-aowJkPyd1A&s=10',
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8M_QuDEw7493dEFHtMS46zCH-ENHZL9HE9xTZq3ReeQ&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAordiipwPso1RFm5-H-ltzmqNUQbmzHwnwRZFL_Hfmw&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo4bqOwHp_Ph65SBLuesDdpKanJe-YoFjzex76Ss5v-A&s=10"
    ],
    featured: true,
    trailerYoutubeId: 'Q_NltD4Stv4'
  },
  {
    id: 'day-22-ee-ma-yau',
    day: 22,
    type: 'movie',
    title: 'Ee.Ma.Yau.',
    year: 2018,
    duration: '110 min',
    language: 'Malayalam',
    tagline: 'FUNNY. SAD. HUMAN.',
    hook: 'A movie about death you\'ll never forget.',
    imdbRating: 8.3,
    cast: ['Chemban Vinod Jose', 'Vinayakan', 'Dileesh Pothan'],
    director: 'Lijo Jose Pellissery',
    availableOn: {
      name: 'Prime Video',
      url: 'https://primevideo.com'
    },
    storySummary: 'When Vavachan Mesthiri unexpectedly dies, his son tries to honor his father\'s final wish for a grand funeral, launching a chaotic comedy of errors.',
    whyWatch: 'Some movies make you cry. Some movies make you laugh. This one somehow does both at the same time.',
    shouldYouWatch: 'YES. A masterclass in dark satirical tragedy and atmospheric direction.',
    bestFor: ['🌧 Stormy Coastal Vibe', '🖤 Dark Satirical Tragedy'],
    afterCreditsEmotion: 'Speechless',
    emotionalLines: ['Funny. Sad. Human.'],
    bestScenes: ['Opening stormy coastal rain and ocean waves sequence'],
    moodTags: ['😢 Emotional', '🤯 Mind-Blowing'],
    genres: ['Dark Satirical Tragedy', 'Slice of Life'],
    musicVibe: 'Slow piano with ocean ambience, emotional violin',
    coverImage: 'https://m.media-amazon.com/images/M/MV5BNDQ0NTI1NjMtZTUyZC00YzljLWE4N2QtNzFhNjY0MTY2NWU0XkEyXkFqcGc@._V1_.jpg',
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4ypviVlJNE3qkufStvxUTNe9dzeyuqaE4G-L_G3YOorfOpD1rmM4Eh50&s=10',
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvjKO4cQTsFo-X2ZZWqLHHOJfgQaVkohKmRO8am-l4ow&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfWMokIX791_X9KnYVRawR8A1drfskNXrgJx8QmoIaYQ&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL6Rn9KIV7rHEiD3R3QcGVc70C0EPRxk1My0zEFIOhaq9ctyw5kgGnnSYN&s=10"
    ],
    trailerYoutubeId: 'b8WZa0GvNYs',
    featured: true
  },
  {
    id: 'day-23-manjummel-boys',
    day: 23,
    type: 'movie',
    title: 'Manjummel Boys',
    year: 2024,
    duration: '135 min',
    language: 'Malayalam',
    tagline: 'NO ONE GETS LEFT BEHIND.',
    hook: 'This friendship story gave me chills.',
    imdbRating: 8.4,
    cast: ['Soubin Shahir', 'Sreenath Bhasi', 'Balu Varghese', 'Ganapathi'],
    director: 'Chidambaram',
    availableOn: {
      name: 'Disney+ Hotstar',
      url: 'https://www.hotstar.com'
    },
    storySummary: 'Based on a true story from 2006, a tight-knit group of friends from Kochi travel to Kodaikanal where one of them accidentally slips into Guna Caves.',
    whyWatch: 'Not every hero wears a cape. Sometimes they\'re just friends who refuse to give up.',
    shouldYouWatch: 'YES. One of the highest-rated survival thrillers in modern Indian cinema.',
    bestFor: ['🤝 Brotherhood & Friendship', '🕳️ Heart-Stopping Survival'],
    afterCreditsEmotion: 'Inspired',
    emotionalLines: ['No one gets left behind.'],
    bestScenes: ['Heart-stopping descent into the dark abyss of Guna Cave'],
    moodTags: ['😊 Feel Good', '😱 Thriller'],
    genres: ['Survival Thriller', 'Friendship Drama'],
    musicVibe: 'Sushin Shyam emotional piano, deep cinematic build-up',
    coverImage: 'https://a.ltrbxd.com/resized/film-poster/9/6/4/8/0/8/964808-manjummel-boys-0-600-0-900-crop.jpg?v=b58b986b31',
    images: ['https://img10.hotstar.com/image/upload/f_auto,q_auto/sources/r1/cms/prod/4736/1714809064736-i',
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOLbScUiy4p5rLPbmcv9YZ65ampk5xW2ScAdXOuy9HnA&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPLkd2FTqvXEzu7k02bm5PH1TpIheYuICl1IusRuxdIw&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0I1II-7Yspogb-EGCjBiAeVk2tjw5kjVdDiSKKlOdmg&s=10"
    ],
    trailerYoutubeId: 'id848Ww1YLo',
    hindiTrailerYoutubeId: 'UM7PPfz8LQU',
    featured: true
  },
  {
    id: 'day-24-udaan',
    day: 24,
    type: 'movie',
    title: 'Udaan',
    year: 2010,
    duration: '134 min',
    language: 'Hindi',
    tagline: 'SOME PRISONS HAVE NO WALLS.',
    hook: 'This movie understands being trapped.',
    imdbRating: 8.1,
    cast: ['Rajat Barmecha', 'Ronit Roy', 'Aayan Boradia', 'Ram Kapoor'],
    director: 'Vikramaditya Motwane',
    availableOn: {
      name: 'Netflix',
      url: 'https://netflix.com'
    },
    storySummary: 'Expelled from his boarding school, 17-year-old Rohan returns home to industrial Jamshedpur to live under his authoritarian father.',
    whyWatch: 'Growing up isn\'t always beautiful. Sometimes it\'s about surviving long enough to become yourself.',
    shouldYouWatch: 'YES. Mandatory viewing for anyone seeking an inspiring coming-of-age story.',
    bestFor: ['🕊️ Coming of Age Freedom', '❤️ Emotional Liberation'],
    afterCreditsEmotion: 'Inspired',
    emotionalLines: ['Dreams deserve freedom.'],
    bestScenes: ['Rajat Barmecha\'s iconic early morning running sequence along railway tracks'],
    moodTags: ['😢 Emotional', '❤️ Meaningful'],
    genres: ['Coming of Age', 'Indie Drama'],
    musicVibe: 'Amit Trivedi emotional piano, slow indie rock instrumental',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7yJqpGo9gw5kHa2DbK_niWneu0hQgo7cbOpKIOTw1w6Sa4wlD9iXSxEo&s=10',
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ97ERwM5eIWTPGslX1OctOzm_gbYueUUca7bSpQ3MYiA&s=10',
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjylvTytmGcBytvnZTGDmijLdtgFcH8SXJ7mxIfseveA&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKLR64Yne4Npme3wXj1Ob4l8ArW5BHdJCwyNZzuU6bDw&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSKYxFNxHCGelJ5KNY7PVWgxcgtK57_2Mrv3Ti0OYveQ&s=10"
    ],
    trailerYoutubeId: 'wEJxe2bE-cE',
    featured: true
  },
  {
    id: 'day-25-october',
    day: 25,
    type: 'movie',
    title: 'October',
    year: 2018,
    duration: '115 min',
    language: 'Hindi',
    tagline: 'SOME CONNECTIONS HAVE NO NAME.',
    hook: 'This movie says so much without speaking.',
    imdbRating: 7.5,
    cast: ['Varun Dhawan', 'Banita Sandhu', 'Gitanjali Rao'],
    director: 'Shoojit Sircar',
    availableOn: {
      name: 'Prime Video',
      url: 'https://www.primevideo.com'
    },
    storySummary: 'Dan, a careless hotel management trainee, sees his life shift after an unexpected accident involves his co-worker Shiuli.',
    whyWatch: 'October feels like a feeling rather than just a story.',
    shouldYouWatch: 'YES. A quiet, melancholic gem that stays with you long after the credits roll.',
    bestFor: ['🌸 Poetic Quiet Grief', '🌧️ Soft Atmospheric Melancholy'],
    afterCreditsEmotion: 'Heartbroken',
    emotionalLines: ['Silence can be beautiful.'],
    bestScenes: ['White Shiuli flowers falling quietly in morning light'],
    moodTags: ['😢 Emotional', '❤️ Meaningful'],
    genres: ['Poetic Drama', 'Slice of Life'],
    musicVibe: 'Soft ambient piano, gentle emotional strings',
    coverImage: 'https://m.media-amazon.com/images/M/MV5BN2U1MmE4MjAtNGY5Zi00YTgyLTkwNGUtZTM4Y2Q1MzUyOWZkXkEyXkFqcGc@._V1_.jpg',
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN0PTO6NX4NFVDOwUX_6Y5l683yeLDccISYYhnDgdKkg&s=10',
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlcN4rFN0o55ebRRNw-BYdb09GBTKrPW4-efJrLe0jkg&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnypUUV51c6Um6VUqxUfUjofJV0qdL_iKUI6yO5KFxTA&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ11zDVdbaJMRVrLMhokz2YT6TfneldqZy-vUCXZ9kjtw&s=10"
    ],
    trailerYoutubeId: '7vracgLyJwI',
    featured: true
  },
  {
    id: 'day-26-96',
    day: 26,
    type: 'movie',
    title: '96',
    year: 2018,
    duration: '158 min',
    language: 'Tamil',
    tagline: 'SOME MEMORIES NEVER LEAVE.',
    hook: 'This movie hurts without trying to.',
    imdbRating: 8.5,
    cast: ['Vijay Sethupathi', 'Trisha Krishnan', 'Devadarshini'],
    director: 'C. Prem Kumar',
    availableOn: {
      name: 'Aha',
      url: 'https://www.aha.video'
    },
    storySummary: 'Ram, a introverted travel photographer, returns to his high school reunion and meets Jaanu, his childhood first love, after 22 years of separation.',
    whyWatch: 'Not every love story is about being together. Some are about remembering.',
    shouldYouWatch: 'YES. Universally acclaimed as one of the finest romantic films in Indian cinema.',
    bestFor: ['🌧️ Pure Nostalgic Longing', '❤️ Bittersweet Romance'],
    afterCreditsEmotion: 'Heartbroken',
    emotionalLines: ['Some people become memories.'],
    bestScenes: ['High school reunion entrance & emotional eye-contact moment'],
    moodTags: ['😢 Emotional', '❤️ Meaningful'],
    genres: ['Romantic Drama', 'Nostalgic Masterpiece'],
    musicVibe: 'Govind Vasantha emotional piano, nostalgic violin',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNshBW6Rj1aQH8hEe6ZduWSDNsPCD1rkSPg-cgBCot8w&s=10',
    images: ['https://image.tmdb.org/t/p/original/qzu94AvnZ1az30sTUuibx2bXpfs.jpg',
      "https://image.tmdb.org/t/p/original/t35gd4Lmw9suAAvTxnh1pMP41Yy.jpg",
      "https://image.tmdb.org/t/p/original/3cAaj6Z56zYaagyoAi55CGx6oHg.jpg",
      "https://image.tmdb.org/t/p/original/exJu48FYngKifMWKelNPr6hPFjU.jpg"
    ],
    trailerYoutubeId: 'r0synl-lI4I',
    hindiTrailerYoutubeId: 'AW6E5vXSfXo',
    featured: true
  },
  {
    id: 'day-27-the-great-indian-kitchen',
    day: 27,
    type: 'movie',
    title: 'The Great Indian Kitchen',
    year: 2021,
    duration: '100 min',
    language: 'Malayalam',
    tagline: 'THE SCARIEST THING IS HOW NORMAL IT FEELS.',
    hook: 'This movie changed how people see everyday life.',
    imdbRating: 8.2,
    cast: ['Nimisha Sajayan', 'Suraj Venjaramoodu', 'T. Suresh Babu'],
    director: 'Jeo Baby',
    availableOn: {
      name: 'Prime Video',
      url: 'https://www.primevideo.com'
    },
    storySummary: 'A newly married educated woman moves into her husband\'s traditional household in Kerala, facing a relentless cycle of domestic chores.',
    whyWatch: 'The scariest thing about this movie? Everything in it feels normal. And that\'s exactly the point.',
    shouldYouWatch: 'YES. Essential social drama viewing that will permanently change how you observe domestic routines.',
    bestFor: ['🍳 Powerful Domestic Realism', '🧠 Eye-Opening Social Commentary'],
    afterCreditsEmotion: 'Inspired',
    emotionalLines: ['The smallest things matter.'],
    bestScenes: ['Relentless daily morning cooking and dishwashing montages'],
    moodTags: ['❤️ Meaningful', '🤯 Mind-Blowing'],
    genres: ['Social Drama', 'Realist Cinema'],
    musicVibe: 'Slow ambient piano, minimal emotional strings',
    coverImage: 'https://image.tmdb.org/t/p/original/4jgiaVOGD8sTjWlwBdx8q5JMJM3.jpg',
    images: ['https://image.tmdb.org/t/p/original/qwu61UwZVnYW9z2pRy7tjt8SicH.jpg',
      "https://image.tmdb.org/t/p/original/nxcL633U9Av4M3HzcZgRmIYlo9v.jpg",
      "https://image.tmdb.org/t/p/original/pIXCm4p1iEyH8KEzTp8xQ0H4L0K.jpg",
      "https://image.tmdb.org/t/p/original/scV9pqsBTAteZIkdToY6GGgpp7L.jpg"
    ],
    trailerYoutubeId: 'k_E6ctiFn6I',
    featured: true
  },
  {
    id: 'day-28-drishyam',
    day: 28,
    type: 'movie',
    title: 'Drishyam',
    year: 2013,
    duration: '160 min',
    language: 'Malayalam',
    tagline: 'HE OUTSMARTED EVERYONE.',
    hook: 'The smartest Indian thriller ever made?',
    imdbRating: 8.3,
    cast: ['Mohanlal', 'Meena', 'Ansiba Hassan', 'Esther Anil'],
    director: 'Jeethu Joseph',
    availableOn: {
      name: 'Disney+ Hotstar',
      url: 'https://www.hotstar.com'
    },
    storySummary: 'Georgekutty, an uneducated cable operator living a quiet life in rural Kerala, must construct an impenetrable alibi when his family is threatened.',
    whyWatch: 'Some thrillers surprise you. This one outsmarts you.',
    shouldYouWatch: 'YES. The ultimate benchmark for Indian crime mystery thrillers.',
    bestFor: ['🧠 Masterclass Intelligence Thriller', '👨‍gsub71‍👧 Family Protection Drive'],
    afterCreditsEmotion: 'Speechless',
    emotionalLines: ['A father will do anything.'],
    bestScenes: ['August 2nd & 3rd bus ticket & hotel bill repetition alibi montage'],
    moodTags: ['😱 Thriller', '🤯 Mind-Blowing'],
    genres: ['Crime Mystery', 'Family Thriller'],
    musicVibe: 'Slow suspense piano, deep cinematic bass',
    coverImage: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/drishyam-malayalam-et00019031-10-09-2020-05-19-24.jpg',
    images: ['https://image.tmdb.org/t/p/original/vCaMZYVf9ylB7I2fx8c0kbuSC2A.jpg',
      "https://image.tmdb.org/t/p/original/57OD8YRmkLl2xp8bXG1yEpguigX.jpg",
      "https://image.tmdb.org/t/p/original/gJ1adxVBD6nsIDXGxftd68KppPa.jpg",
      "https://image.tmdb.org/t/p/original/7sTExjC0M124D0yJuNvh1pNxyKJ.jpg"
    ],
    trailerYoutubeId: 'eMASubc1y_k',
    featured: true
  },
  {
    id: 'day-29-kadaisi-vivasayi',
    day: 29,
    type: 'movie',
    title: 'Kadaisi Vivasayi',
    year: 2021,
    duration: '144 min',
    language: 'Tamil',
    tagline: 'A DYING WORLD. A LIVING SOUL.',
    hook: 'This movie feels like pure peace.',
    imdbRating: 8.7,
    cast: ['Nallandi', 'Vijay Sethupathi', 'Yogi Babu', 'Raachel Rebecca'],
    director: 'M. Manikandan',
    availableOn: {
      name: 'Sony LIV',
      url: 'https://www.sonyliv.com'
    },
    storySummary: 'In a remote Tamil Nadu village where all other farmers have sold out to commercial property buyers, 85-year-old Mayandi quietly continues farming his small plot of land to grow rice for his village temple ritual.',
    whyWatch: 'In a world moving too fast... this movie reminds you to slow down. M. Manikandan\'s National Award-winning masterpiece is pure, meditative cinematic poetry.',
    shouldYouWatch: 'YES. A sublime, peaceful, and deeply moving tribute to traditional farming and human dignity.',
    bestFor: ['🌾 Pure Agricultural Poetry', '🧘 Peaceful & Meditative', '☕ Cozy Afternoon Watch', '🏆 National Award Winner'],
    afterCreditsEmotion: 'Inspired',
    emotionalLines: [
      'The beauty of simplicity.',
      'A disappearing world.',
      'Quiet. Honest. Powerful.',
      'This movie slows time.',
      'Pure cinematic poetry.'
    ],
    bestScenes: [
      'Nallandi tending to green paddy fields under morning fog and golden light',
      'Santhosh Narayanan\'s soothing acoustic agricultural score',
      'Peaceful village temple crop offering ceremony'
    ],
    moodTags: ['😊 Feel Good', '❤️ Meaningful'],
    genres: ['Rural Drama', 'Slice of Life', 'Tamil Masterpiece'],
    musicVibe: 'Soft flute, ambient nature sounds, emotional piano, slow cinematic strings',
    coverImage: 'https://i.pinimg.com/736x/e0/55/31/e055318a198fce1eb67439feddece7a2.jpg',
    images: ['https://image.tmdb.org/t/p/original/nTFleA0vJNfphRaurvDoItnzTkr.jpg',
      "https://image.tmdb.org/t/p/original/fpmRRiMcatplfCgbjzmWjGAWLrH.jpg",
      "https://image.tmdb.org/t/p/original/uuQW9Yl2NCrwRH0tX2EeDIOGQIg.jpg",
      "https://image.tmdb.org/t/p/original/aiXZ1GLeigSwsmEpQptEGz98I2d.jpg"
    ],
    featured: true,
    trailerYoutubeId: 'cGorkMwcjd4'
  },
  {
    id: 'day-30-court',
    day: 30,
    type: 'movie',
    title: 'Court',
    year: 2014,
    duration: '116 min',
    language: 'Marathi',
    tagline: 'WHEN SILENCE BECOMES THE VERDICT',
    hook: 'The courtroom movie that feels too real.',
    imdbRating: 7.7,
    cast: ['Vira Sathidar', 'Vivek Gomber', 'Geetanjali Kulkarni', 'Pradeep Joshi'],
    director: 'Chaitanya Tamhane',
    availableOn: {
      name: 'Netflix',
      url: 'https://www.netflix.com'
    },
    storySummary: 'Narayan Kamble, an aging folk singer and activist in Mumbai, is arrested on absurd charges of inciting a sewage worker to commit suicide through his revolutionary songs. As the trial drags endlessly through a crowded sessions court, the film quietly examines the lives of the defense lawyer, prosecutor, and judge.',
    whyWatch: 'Winner of the National Film Award for Best Feature Film & Venice Film Festival Venice Horizons Award. Chaitanya Tamhane\'s masterpiece dispenses with cinematic courtroom dramatics in favor of razor-sharp social observation and hyper-realism.',
    shouldYouWatch: 'YES. Mandatory for lovers of realistic cinema, Thithi, Masaan, Kaaka Muttai, or The Disciple.',
    bestFor: ['🏆 National Award Best Feature & Venice Winner', '⚖️ Hyper-Realistic Courtroom Drama', '📽️ Chaitanya Tamhane Masterpiece', '🍿 Uncompromising Social Observation'],
    afterCreditsEmotion: 'Inspired',
    emotionalLines: [
      'Justice isn\'t always simple.',
      'Reality needs no drama.',
      'Silence speaks loudly.',
      'Powerful in its simplicity.',
      'A modern masterpiece.'
    ],
    bestScenes: [
      'Narayan Kamble\'s street performance song opening',
      'Courtroom sessions with banal routine procedures',
      'Prosecutor Nuttal & Judge Kulkarni\'s domestic life vignettes'
    ],
    moodTags: ['❤️ Meaningful', '🤯 Mind-Blowing', '😢 Emotional'],
    genres: ['Hyper-Realistic Courtroom Drama', 'Social Realism', 'Marathi Masterpiece'],
    musicVibe: 'Minimal piano, ambient courtroom atmosphere, soft cello, slow cinematic strings',
    coverImage: 'https://m.media-amazon.com/images/M/MV5BOTAyNjc4MjA2Ml5BMl5BanBnXkFtZTgwMzY3MzIwNjE@._V1_.jpg',
    images: [
      'https://image.tmdb.org/t/p/original/lK9R56dfj182Uz4THzEZ5vrUEn.jpg',
      "https://www.rogerebert.com/wp-content/uploads/2024/03/Court.jpg",
      "https://sc0.blr1.digitaloceanspaces.com/large/800982-article-rivmvantha-1450933384.jpeg",
      "https://image.tmdb.org/t/p/original/ic6rAro6ASlmUgk0wOtWxgAHxFq.jpg"
    ],
    featured: true,
    trailerYoutubeId: 'UWvOAHjQysw'
  },
  {
    id: 'day-31-nayakan',
    day: 31,
    type: 'movie',
    title: 'Nayakan',
    year: 1987,
    duration: '175 min',
    language: 'Tamil',
    tagline: 'A LEGEND WAS BORN',
    hook: 'One of the greatest Indian films ever made.',
    imdbRating: 8.6,
    cast: ['Kamal Haasan', 'Saranya Ponvannan', 'Janagaraj', 'Nassar'],
    director: 'Mani Ratnam',
    availableOn: {
      name: 'Prime Video',
      url: 'https://www.primevideo.com'
    },
    storySummary: 'A young boy loses everything and flees home to the slums of Mumbai. Decades later, he rises to become a revered underworld Don — feared by the police, idolized by his people, and torn by the price of his own legend.',
    whyWatch: 'Before modern gangster sagas, there was Nayakan. Mani Ratnam\'s epic masterpiece featuring Kamal Haasan\'s iconic, career-defining performance set the golden benchmark for Indian crime cinema.',
    shouldYouWatch: 'YES. Essential viewing for anyone who loves epic crime sagas, masterclass acting, and legendary film history.',
    bestFor: ['👑 Gangster Epic', '🏆 All-Time Classic', '🎭 Masterclass Acting', '📽️ Mani Ratnam Cinema'],
    afterCreditsEmotion: 'Inspired',
    emotionalLines: [
      'A legend is born.',
      'Power has a price.',
      'Every king falls someday.',
      'Timeless cinema.',
      'Pure greatness.'
    ],
    bestScenes: [
      'Kamal Haasan slow motion street walk sequence',
      'Rain-soaked Mumbai slum confrontation',
      'Ilaiyaraaja\'s haunting score during emotional family climax'
    ],
    moodTags: ['👑 Epic', '🤯 Mind-Blowing', '❤️ Meaningful'],
    genres: ['Crime Saga', 'Period Gangster Drama', 'Tamil Masterpiece'],
    musicVibe: 'Ilaiyaraaja epic orchestral strings, slow cinematic drums, vintage crime soundtrack',
    coverImage: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p13020937_p_v10_aa.jpg',
    images: [
      'https://image.tmdb.org/t/p/original/gLPFagMKJaraVUvuWqRtTObSejm.jpg',
      "https://image.tmdb.org/t/p/original/aXrUUYoRkaKKQEiN9KexrtPqjUy.jpg",
      "https://image.tmdb.org/t/p/original/z6Zcoj8jE5i3TW2B2nk4pIVYMGx.jpg",
      "https://image.tmdb.org/t/p/original/1SAFJkosiI78SlNiYpDDSJSocsj.jpg"
    ],
    featured: true,
    trailerYoutubeId: '1S6YkmYvgi8'
  },
  {
    id: 'day-32-ugramm',
    day: 32,
    type: 'movie',
    title: 'Ugramm',
    year: 2014,
    duration: '153 min',
    language: 'Kannada',
    tagline: 'BEFORE KGF, THERE WAS THIS',
    hook: 'The movie that created KGF\'s DNA.',
    imdbRating: 8.0,
    cast: ['Sriimurali', 'Hariprriya', 'Tilak Shekar', 'Avinash'],
    director: 'Prashanth Neel',
    availableOn: {
      name: 'Sun NXT',
      url: 'https://www.sunnxt.com'
    },
    storySummary: 'Before KGF made waves across India, Prashanth Neel created something darker. Agastya tries to leave his violent past behind and live a peaceful life. But as dangerous forces return, he is pulled back into a world he desperately wanted to escape.',
    whyWatch: 'Ugramm is one of the most influential Kannada action thrillers of the last decade. Directed by Prashanth Neel before KGF and Salaar, it showcases his signature style of dark industrial visuals, high-octane emotional action, and larger-than-life storytelling.',
    shouldYouWatch: 'YES. Must-watch for anyone who loves KGF, Salaar, Kaithi, or dark, intense action cinema.',
    bestFor: ['⚔️ Dark Action Thriller', '⛓️ KGF Origins', '🍿 High Intensity', '⚡ Prashanth Neel Cinema'],
    afterCreditsEmotion: 'Inspired',
    emotionalLines: [
      'Darkness has a face.',
      'Intensity from start to finish.',
      'Every frame feels dangerous.',
      'A forgotten masterpiece.',
      'Raw cinematic power.'
    ],
    bestScenes: [
      'Slow-motion hero entry in industrial wasteland',
      'Rain-soaked garage action sequence',
      'Shadow-heavy confrontation with soundtrack build-up'
    ],
    moodTags: ['😱 Thriller', '🤯 Mind-Blowing', '⚔️ High-Octane'],
    genres: ['Dark Action Thriller', 'Neo-Noir', 'Kannada Cinema'],
    musicVibe: 'Heavy cinematic bass, dark orchestral drums, industrial action score',
    coverImage: 'https://m.media-amazon.com/images/M/MV5BMTc2MDkwNzk3OF5BMl5BanBnXkFtZTgwMTQ3NTcyMTE@._V1_FMjpg_UX1000_.jpg',
    images: [
      'https://image.tmdb.org/t/p/original/2RHKfO5oDU9PXOj2amTeAuu1vdE.jpg',
      "https://cinemachaat.com/wp-content/uploads/2014/05/agastya-and-nitya.jpg",
      "https://images.news18.com/kannada/uploads/2024/02/Ugramm-1-2024-02-376bff503cc4f05270aebb4e3e304db1-3x2.jpg",
      "https://m.media-amazon.com/images/M/MV5BY2Y1NTg3MDMtOTQ5My00N2YwLTg3ODgtNmUxNjYwYzIzOGFjXkEyXkFqcGdeQXRodW1ibmFpbC1pbml0aWFsaXplcg@@._V1_.jpg"
    ],
    featured: true,
    trailerYoutubeId: 'f7XQSsZLjmo'
  },
  {
    id: 'day-33-kaithi',
    day: 33,
    type: 'movie',
    title: 'Kaithi',
    year: 2019,
    duration: '145 min',
    language: 'Tamil',
    tagline: 'ONE NIGHT. PURE CHAOS.',
    hook: 'One night. Zero breaks. Pure adrenaline.',
    imdbRating: 8.4,
    cast: ['Karthi', 'Narain', 'Arjun Das', 'Harish Uthaman'],
    director: 'Lokesh Kanagaraj',
    availableOn: {
      name: 'Sony LIV',
      url: 'https://www.sonyliv.com'
    },
    storySummary: 'No songs. No romance. No filler. Just one night. Recently released prisoner Dilli is desperate to meet his daughter for the first time, but gets caught in a deadly race against time to drive a truck full of poisoned police officers to safety.',
    whyWatch: 'Kaithi is a masterclass in relentless action storytelling. Lokesh Kanagaraj delivers 145 minutes of pure non-stop tension while keeping a deeply emotional father-daughter heart at its core.',
    shouldYouWatch: 'YES. One of the greatest night-long action thrillers ever made in India. Mandatory for action & LCU universe lovers.',
    bestFor: ['🚛 Relentless Night Thriller', '⚡ Non-Stop Adrenaline', '🍿 LCU Universe', '🚗 Truck Action Masterclass'],
    afterCreditsEmotion: 'Speechless',
    emotionalLines: [
      'The night never ends.',
      'Pure tension.',
      'A father on a mission.',
      'Every second matters.',
      'Action with a heart.'
    ],
    bestScenes: [
      'Night highway truck driving chase sequence',
      'Biryani feast & intense police station siege',
      'Gatling gun climax defense'
    ],
    moodTags: ['😱 Thriller', '🤯 Mind-Blowing', '⚔️ High-Octane'],
    genres: ['Action Thriller', 'Neo-Noir', 'LCU Universe'],
    musicVibe: 'Sam C.S. dark cinematic bass, intense trailer percussion, high-tension action score',
    coverImage: 'https://m.media-amazon.com/images/S/pv-target-images/b139be81ca00b0259849a5771a12f9f6f104587f06a32153e816336a374ee884.jpg',
    images: [
      'https://image.tmdb.org/t/p/original/k5iCKAV2VVyXGQbuYRLPmSXiBwm.jpg',
      "https://image.tmdb.org/t/p/original/clRFhXEpNRNOmbSrbKIcuZ9GsyM.jpg",
      "https://image.tmdb.org/t/p/original/3g6aPYy8Io6yoS91sB14XMd4vEj.jpg",
      "https://image.tmdb.org/t/p/original/5bmoUIisfXEgTPlO9OTnBVA2XWG.jpg"
    ],
    featured: true,
    trailerYoutubeId: 'g79CvhHaj5I',
    hindiTrailerYoutubeId: 'AQSwPdQo614'
  },
  {
    id: 'day-34-ayyappanum-koshiyum',
    day: 34,
    type: 'movie',
    title: 'Ayyappanum Koshiyum',
    year: 2020,
    duration: '177 min',
    language: 'Malayalam',
    tagline: 'EGO IS THE REAL ENEMY',
    hook: 'The most intense rivalry you\'ll ever watch.',
    imdbRating: 8.0,
    cast: ['Prithviraj Sukumaran', 'Biju Menon', 'Gowri Nandha', 'Ranjith'],
    director: 'Sachy',
    availableOn: {
      name: 'Prime Video',
      url: 'https://www.primevideo.com'
    },
    storySummary: 'Sometimes the biggest wars start with the smallest mistakes. Koshi, an ex-army officer with powerful connections, collides with Ayyappan, a fearless local police officer. What starts as a routine traffic check explodes into an uncontrollable battle of ego, pride, and power where neither man will back down.',
    whyWatch: 'Ayyappanum Koshiyum turns human ego into high-stakes thriller cinema. Director Sachy created one of the smartest, best-written rivalry dramas in Indian film history — no comic book villains, just pure pride against pride.',
    shouldYouWatch: 'YES. Essential viewing for anyone who loves intense character rivalries, brilliant Malayalam writing, and high-tension drama.',
    bestFor: ['🥊 Masterclass Ego Rivalry', '🌲 Attappadi Forest Setting', '🍿 Explosive Tension', '🎭 Malayalam Cinema Excellence'],
    afterCreditsEmotion: 'Inspired',
    emotionalLines: [
      'Pride changes everything.',
      'Neither side backs down.',
      'Power meets power.',
      'Pure tension.',
      'A battle of egos.'
    ],
    bestScenes: [
      'Night forest checkpoint confrontation',
      'Police station interrogation stare-down',
      'Town square climax fight sequence'
    ],
    moodTags: ['😱 Thriller', '🤯 Mind-Blowing', '❤️ Meaningful'],
    genres: ['Character Rivalry Drama', 'Psychological Thriller', 'Malayalam Masterpiece'],
    musicVibe: 'Jakes Bejoy slow tribal percussion, dark cinematic drums, tense folk-orchestral build-up',
    coverImage: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: true,
    trailerYoutubeId: '8Wx3dAQ8pr4'
  },
  {
    id: 'day-35-charlie',
    day: 35,
    type: 'movie',
    title: 'Charlie',
    year: 2015,
    duration: '129 min',
    language: 'Malayalam',
    tagline: 'SOME PEOPLE FEEL LIKE FREEDOM',
    hook: 'This movie feels like an adventure in human form.',
    imdbRating: 8.0,
    cast: ['Dulquer Salmaan', 'Parvathy Thiruvothu', 'Aparna Gopinath', 'Nedumudi Venu'],
    director: 'Martin Prakkat',
    availableOn: {
      name: 'Sun NXT',
      url: 'https://www.sunnxt.com'
    },
    storySummary: 'What if the most interesting person you\'ve ever met was someone you\'ve never actually met? Tessa, a free-spirited young woman, discovers sketches and clues left behind by a mysterious vagabond named Charlie. Her journey to find him takes her through coastal villages, unusual souls, and unforgettable human stories.',
    whyWatch: 'Charlie is a rare, magical masterpiece that feels part adventure, part mystery, and completely free-spirited. Dulquer Salmaan delivers one of the most charismatic performances of his career paired with Gopi Sundar\'s iconic, soulful soundtrack.',
    shouldYouWatch: 'YES. Perfect for anyone who wants a movie that makes life feel bigger, hopeful, and full of wonder.',
    bestFor: ['😊 Pure Feel-Good', '🎒 Wanderlust Adventure', '🎨 Magical Realism', '🎵 Soulful Soundtrack'],
    afterCreditsEmotion: 'Inspired',
    emotionalLines: [
      'Life is meant to be explored.',
      'Some souls can\'t be contained.',
      'Beautiful chaos.',
      'A movie full of wonder.',
      'Pure cinematic magic.'
    ],
    bestScenes: [
      'Dulquer walking through colorful coastal streets',
      'Sunset coastal cliff visuals & floating lantern night sequence',
      'Gopi Sundar\'s soulful acoustic guitar score'
    ],
    moodTags: ['😊 Feel Good', '❤️ Meaningful', '🎒 Adventure'],
    genres: ['Slice of Life', 'Adventure Romance', 'Magical Realism', 'Malayalam Cinema'],
    musicVibe: 'Gopi Sundar indie folk instrumental, warm acoustic guitar, travel soundtrack, nostalgic piano',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: true,
    trailerYoutubeId: 'oYxtLNJJ54Y'
  },
  {
    id: 'day-36-joji',
    day: 36,
    type: 'movie',
    title: 'Joji',
    year: 2021,
    duration: '113 min',
    language: 'Malayalam',
    tagline: 'GREED CREATES MONSTERS',
    hook: 'The most dangerous villain looks completely normal.',
    imdbRating: 8.0,
    cast: ['Fahadh Faasil', 'Baburaj', 'Unnimaya Prasad', 'Basil Joseph'],
    director: 'Dileesh Pothan',
    availableOn: {
      name: 'Prime Video',
      url: 'https://www.primevideo.com'
    },
    storySummary: 'Some people dream of success; Joji dreams of freedom. Living under the shadow of his tyrannical father on a rubber estate, Joji is ignored and underestimated. When an unexpected opportunity arises, his quiet frustration turns into a dangerous, Macbeth-inspired psychological downfall.',
    whyWatch: 'Joji is one of modern Indian cinema\'s finest psychological character studies. Dileesh Pothan builds terrifying tension through silence, rubber plantation atmosphere, and Justin Varghese\'s eerie orchestral score, anchored by Fahadh Faasil\'s masterclass performance.',
    shouldYouWatch: 'YES. Perfect for fans of Ugly, Macbeth, Raman Raghav 2.0, or slow-burn psychological thrillers.',
    bestFor: ['🧠 Shakespearean Psychological Thriller', '🎭 Fahadh Faasil Masterclass', '🌧️ Estate Atmosphere', '🍿 Slow Burn Perfection'],
    afterCreditsEmotion: 'Speechless',
    emotionalLines: [
      'Greed changes people.',
      'Silence can be terrifying.',
      'Power has a price.',
      'Every choice matters.',
      'A slow burn you\'ll never forget.'
    ],
    bestScenes: [
      'Fahadh Faasil\'s eerie mask & pond sequence',
      'Estate house quiet dinner confrontation',
      'Justin Varghese\'s haunting violin score climax'
    ],
    moodTags: ['😱 Thriller', '🤯 Mind-Blowing', '🌧️ Rainy Evening'],
    genres: ['Psychological Thriller', 'Dark Crime Drama', 'Malayalam Masterpiece'],
    musicVibe: 'Justin Varghese dark ambient piano, deep cinematic drone, slow haunting orchestral strings',
    coverImage: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: true,
    trailerYoutubeId: '9yULZ8y1J-s'
  },
  {
    id: 'day-37-kammatti-paadam',
    day: 37,
    type: 'movie',
    title: 'Kammatti Paadam',
    year: 2016,
    duration: '177 min',
    language: 'Malayalam',
    tagline: 'YOU CAN\'T GO BACK HOME',
    hook: 'This movie is about everything we leave behind.',
    imdbRating: 8.0,
    cast: ['Dulquer Salmaan', 'Vinayakan', 'Manikandan R. Achari', 'Shaun Romy'],
    director: 'Rajeev Ravi',
    availableOn: {
      name: 'Disney+ Hotstar',
      url: 'https://www.hotstar.com'
    },
    storySummary: 'What if your biggest enemy was time? Krishnan receives a mysterious phone call from an old friend and returns to his childhood neighborhood in Kochi. As he walks through the changing city, memories of brotherhood, violence, love, and betrayal resurface, revealing how urban progress comes at the cost of marginalized lives.',
    whyWatch: 'Kammatti Paadam is a raw, heartbreaking crime saga about friendship, class struggle, and urban displacement. Rajeev Ravi\'s gritty realism paired with Vinayakan & Manikandan\'s National Award-winning performances make it a true Malayalam masterpiece.',
    shouldYouWatch: 'YES. Essential for anyone who appreciates grounded, realistic crime sagas with a powerful emotional soul.',
    bestFor: ['🌆 Urban Displacement Drama', '🩸 Raw Crime Realism', '🎭 Masterclass Acting', '🏆 National Award Winner'],
    afterCreditsEmotion: 'Heartbroken',
    emotionalLines: [
      'A city changed forever.',
      'Friendship never dies.',
      'Some places only exist in memories.',
      'Raw. Honest. Powerful.',
      'This movie feels alive.'
    ],
    bestScenes: [
      'Old Kochi slum flashback sequences',
      'Vinayakan\'s electrifying emotional monologues',
      'Rain-soaked night street confrontation'
    ],
    moodTags: ['😢 Emotional', '🤯 Mind-Blowing', '❤️ Meaningful'],
    genres: ['Gritty Crime Drama', 'Period Realism', 'Malayalam Masterpiece'],
    musicVibe: 'K\'s melancholic violin, slow piano notes, ambient city rain sounds, emotional orchestral strings',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: true,
    trailerYoutubeId: 'B-m13AJMxW4'
  },
  {
    id: 'day-38-eeb-allay-ooo',
    day: 38,
    type: 'movie',
    title: 'Eeb Allay Ooo!',
    year: 2019,
    duration: '97 min',
    language: 'Hindi',
    tagline: 'THE WEIRDEST JOB. THE DEEPEST STORY.',
    hook: 'The strangest job... and one of the smartest movies.',
    imdbRating: 7.8,
    cast: ['Shardul Bharadwaj', 'Mahender Nath', 'Nutan Sinha', 'Shashi Bhushan'],
    director: 'Prateek Vats',
    availableOn: {
      name: 'MUBI',
      url: 'https://mubi.com'
    },
    storySummary: 'Imagine getting a job where your only responsibility is chasing monkeys away from government buildings in Delhi. Anjani, a young migrant worker, takes the absurd job. But as days pass, it becomes a sharp reflection of survival, dignity, class struggle, and invisible workers trapped in a bureaucratic system.',
    whyWatch: 'Eeb Allay Ooo! blends dark satire, absurd comedy, and heartbreaking realism. Prateek Vats\'s Berlin Film Festival favorite is one of the most original and overlooked Indian independent masterpieces of recent years.',
    shouldYouWatch: 'YES. Perfect for lovers of indie art-house cinema, sharp social satire, and deeply human storytelling.',
    bestFor: ['🐒 Sharp Social Satire', '🏛️ Delhi City Realism', '🏆 Berlin & MAMI Award Winner', '🍿 Indie Masterpiece'],
    afterCreditsEmotion: 'Inspired',
    emotionalLines: [
      'Funny. Then heartbreaking.',
      'Ordinary people. Extraordinary story.',
      'Reality disguised as comedy.',
      'You\'ll never forget this.',
      'Simple. Honest. Brilliant.'
    ],
    bestScenes: [
      'Rooftop monkey chasing vocal training sequence',
      'Delhi Lutyens zone sunset metro commute',
      'Impressively raw real-location Delhi street cinematography'
    ],
    moodTags: ['😊 Feel Good', '🤯 Mind-Blowing', '❤️ Meaningful'],
    genres: ['Dark Social Satire', 'Indie Drama', 'Art-House Realism'],
    musicVibe: 'Minimal lo-fi piano, ambient Delhi city sounds, soft indie acoustic instrumental',
    coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: true,
    trailerYoutubeId: 'e7HDLJMtwww'
  },
  {
    id: 'day-39-visaranai',
    day: 39,
    type: 'movie',
    title: 'Visaranai',
    year: 2015,
    duration: '106 min',
    language: 'Tamil',
    tagline: 'REALITY IS THE SCARIEST THRILLER',
    hook: 'The scariest Indian movie isn\'t a horror film.',
    imdbRating: 8.4,
    cast: ['Dinesh Ravi', 'Samuthirakani', 'Kishore', 'Murugadoss'],
    director: 'Vetrimaaran',
    availableOn: {
      name: 'Prime Video',
      url: 'https://www.primevideo.com'
    },
    storySummary: 'Four young migrant workers in Andhra Pradesh are picked up by the police without warning for a high-profile robbery they didn\'t commit. Trapped in a corrupt legal system where truth doesn\'t matter, they find themselves in an uncompromising fight for survival.',
    whyWatch: 'Visaranai is one of Vetrimaaran\'s boldest and most hard-hitting masterpieces. Premiered at the Venice Film Festival and selected as India\'s official entry for the Academy Awards, it delivers documentary-like realism and suffocating tension.',
    shouldYouWatch: 'YES. Mandatory for lovers of uncompromising, hard-hitting, true-story crime thrillers.',
    bestFor: ['⚖️ Hard-Hitting Realism', '🏆 Venice & Oscar Entry', '🍿 Uncompromising Tension', '📽️ Vetrimaaran Masterpiece'],
    afterCreditsEmotion: 'Speechless',
    emotionalLines: [
      'Reality is terrifying.',
      'Power has no mercy.',
      'Hope disappears slowly.',
      'You\'ll feel every moment.',
      'A masterpiece that hurts.'
    ],
    bestScenes: [
      'Dim police station interrogation room sequence',
      'Rain-soaked night lockup escape attempt',
      'Uncompromising, suffocating climax'
    ],
    moodTags: ['😱 Thriller', '🤯 Mind-Blowing', '🌧️ Dark & Atmospheric'],
    genres: ['Hard-Hitting Crime Thriller', 'True Events Drama', 'Tamil Masterpiece'],
    musicVibe: 'G. V. Prakash Kumar dark ambient drone, slow cinematic piano, deep tension strings',
    coverImage: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: true,
    trailerYoutubeId: '4mnzK2KIz9U'
  },
  {
    id: 'day-40-gangs-of-wasseypur-part-1',
    day: 40,
    type: 'movie',
    title: 'Gangs of Wasseypur – Part 1',
    year: 2012,
    duration: '160 min',
    language: 'Hindi',
    tagline: 'REVENGE BUILT AN EMPIRE',
    hook: 'India\'s greatest gangster saga?',
    imdbRating: 8.2,
    cast: ['Manoj Bajpayee', 'Nawazuddin Siddiqui', 'Richa Chadha', 'Tigmanshu Dhulia', 'Piyush Mishra'],
    director: 'Anurag Kashyap',
    availableOn: {
      name: 'Prime Video',
      url: 'https://www.primevideo.com'
    },
    storySummary: 'Power. Revenge. Family. For decades, three generations fight to control Wasseypur, where loyalty changes overnight and every decision has consequences. Sardar Khan is driven by one obsession: revenge against Ramadhir Singh for his father\'s murder.',
    whyWatch: 'Gangs of Wasseypur – Part 1 redefined Indian crime cinema. Anurag Kashyap blends coal-town politics, generation-spanning feuds, dark humor, and Sneha Khanwalkar\'s legendary soundtrack into a masterpiece.',
    shouldYouWatch: 'YES. Essential viewing for anyone who loves epic gangster sagas, iconic dialogues, and raw Indian cinema.',
    bestFor: ['👑 Epic Gangster Saga', '🩸 Generational Revenge', '🎭 Masterclass Performances', '📽️ Anurag Kashyap Masterpiece'],
    afterCreditsEmotion: 'Inspired',
    emotionalLines: [
      'Revenge never ends.',
      'Power changes everyone.',
      'Every character is unforgettable.',
      'Raw. Violent. Brilliant.',
      'A modern classic.'
    ],
    bestScenes: [
      'Sardar Khan\'s grand entry & oath sequence',
      'Coal town street shootout & petrol pump robbery',
      'Ramadhir Singh\'s famous dialogue monologues'
    ],
    moodTags: ['😱 Thriller', '🤯 Mind-Blowing', '⚔️ High-Octane'],
    genres: ['Epic Crime Saga', 'Gangster Drama', 'Neo-Noir'],
    musicVibe: 'Sneha Khanwalkar dark Indian folk fusion, heavy cinematic percussion, gritty bass-driven soundtrack',
    coverImage: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: true,
    trailerYoutubeId: '9ZpPQdrHfl8'
  },
  {
    id: 'day-41-kshanam',
    day: 41,
    type: 'movie',
    title: 'Kshanam',
    year: 2016,
    duration: '118 min',
    language: 'Telugu',
    tagline: 'WHAT IF EVERYONE WAS LYING?',
    hook: 'Everyone says she\'s lying... but is she?',
    imdbRating: 8.2,
    cast: ['Adivi Sesh', 'Adah Sharma', 'Anasuya Bharadwaj', 'Satyam Rajesh'],
    director: 'Ravikanth Perepu',
    availableOn: {
      name: 'Sun NXT',
      url: 'https://www.sunnxt.com'
    },
    storySummary: 'What if everyone told you the child you\'re searching for never existed? Rishi returns from San Francisco when his ex-girlfriend desperately calls claiming her young daughter was kidnapped. But everyone around her — police, neighbors, family — insists she never had a daughter.',
    whyWatch: 'Kshanam is a masterclass in tight, budget-defying mystery writing. Adivi Sesh\'s breakout thriller keeps you guessing with brilliant twists while maintaining a deeply personal emotional core.',
    shouldYouWatch: 'YES. Perfect for fans of Drishyam, Talvar, Iratta, or Ratsasan.',
    bestFor: ['🕵️ Missing Person Mystery', '🧠 Brain-Teaser Twists', '🍿 Edge of Seat Thriller', '📽️ Telugu Cinema Innovation'],
    afterCreditsEmotion: 'Speechless',
    emotionalLines: [
      'Trust no one.',
      'Every clue matters.',
      'Nothing is what it seems.',
      'A thriller done right.',
      'You\'ll question everything.'
    ],
    bestScenes: [
      'Empty apartment searching for hidden clues',
      'Police station interrogation with conflicting statements',
      'Heart-stopping final reveal sequence'
    ],
    moodTags: ['😱 Thriller', '🤯 Mind-Blowing', '🌧️ Dark & Atmospheric'],
    genres: ['Mystery Thriller', 'Psychological Suspense', 'Telugu Masterpiece'],
    musicVibe: 'Sricharan Pakala dark ambient piano, mystery synth, slow cinematic bass, suspenseful orchestral build-up',
    coverImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1000&auto=format&fit=crop'
    ],
    trailerYoutubeId: 'OroFSmQQm1U',
    featured: true
  },
  {
    id: 'day-42-ratsasan',
    day: 42,
    type: 'movie',
    title: 'Ratsasan',
    year: 2018,
    duration: '170 min',
    language: 'Tamil',
    tagline: 'DON\'T TRUST THE NEXT CLUE',
    hook: 'This movie will make you hold your breath.',
    imdbRating: 8.3,
    cast: ['Vishnu Vishal', 'Amala Paul', 'Saravanan', 'Kaali Venkat'],
    director: 'Ram Kumar',
    availableOn: {
      name: 'Sun NXT',
      url: 'https://www.sunnxt.com'
    },
    storySummary: 'What if the killer you\'re hunting is always one step ahead? Arun, an aspiring filmmaker turned sub-inspector, is tasked with catching a terrifying serial killer targeting young schoolgirls in Chennai. Leaving almost zero clues, the killer turns the investigation into a psychological race against time.',
    whyWatch: 'Ratsasan is widely considered one of Indian cinema\'s greatest, most chilling psychological serial killer thrillers. Ghibran\'s terrifying background score and Saravanan\'s unforgettable performance as the villain make 170 minutes feel like pure adrenaline.',
    shouldYouWatch: 'YES. Essential viewing for anyone who loves Se7en, Zodiac, Drishyam, or high-stakes serial killer thrillers.',
    bestFor: ['🕵️ Serial Killer Investigation', '😱 170 Min Pure Anxiety', '🎵 Ghibran Terrifying Score', '🏆 All-Time Classic Thriller'],
    afterCreditsEmotion: 'Speechless',
    emotionalLines: [
      'Every second counts.',
      'Trust no one.',
      'The tension never stops.',
      'One of India\'s best thrillers.',
      'You\'ll forget to blink.'
    ],
    bestScenes: [
      'Investigation room clue board & psycho-analysis mapping',
      'School corridor & gift box delivery sequence',
      'Heart-stopping auto-rickshaw chase climax'
    ],
    moodTags: ['😱 Thriller', '🤯 Mind-Blowing', '🌧️ Dark & Atmospheric'],
    genres: ['Psychological Serial Killer Thriller', 'Neo-Noir', 'Tamil Masterpiece'],
    musicVibe: 'Ghibran dark cinematic piano, suspenseful ambient drone, deep bass pulses, slow orchestral thriller build-up',
    coverImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1000&auto=format&fit=crop'
    ],
    trailerYoutubeId: 'GsrN7rNch9Y',
    featured: true
  },
  {
    id: 'day-43-maanagaram',
    day: 43,
    type: 'movie',
    title: 'Maanagaram',
    year: 2017,
    duration: '137 min',
    language: 'Tamil',
    tagline: 'EVERY STORY CONNECTS',
    hook: 'Before LCU... there was this masterpiece.',
    imdbRating: 8.1,
    cast: ['Sundeep Kishan', 'Sri', 'Regina Cassandra', 'Charlie', 'Ramdoss'],
    director: 'Lokesh Kanagaraj',
    availableOn: {
      name: 'Prime Video',
      url: 'https://www.primevideo.com'
    },
    storySummary: 'One city. One night. Four strangers. A job interview, a lost phone, an accidental kidnapping, and a ruthless gangster. Four separate lives collide in Chennai in ways no one expects, showing how tiny choices create uncontrollable butterfly effects.',
    whyWatch: 'Before Kaithi, Vikram, and Leo, Maanagaram was Lokesh Kanagaraj\'s directorial debut masterpiece. Its non-linear hyperlink storytelling, razor-sharp writing, and realistic urban tension proved that great writing beats a big budget.',
    shouldYouWatch: 'YES. A must-watch for fans of Lokesh Kanagaraj, hyper-linked crime thrillers, and tight urban storytelling.',
    bestFor: ['🌃 Hyperlink Urban Thriller', '⚡ Lokesh Kanagaraj Debut', '🍿 Interconnected Lives', '🚗 Chennai Night Noir'],
    afterCreditsEmotion: 'Inspired',
    emotionalLines: [
      'Everything is connected.',
      'One city. Endless stories.',
      'Every decision matters.',
      'Simple story. Brilliant execution.',
      'Lokesh\'s first masterpiece.'
    ],
    bestScenes: [
      'Flyover confrontation under rain & neon lights',
      'Accidental mistaken identity kidnapping standoff',
      'Interlocking climax resolution sequence'
    ],
    moodTags: ['😱 Thriller', '🤯 Mind-Blowing', '🌧️ Dark & Atmospheric'],
    genres: ['Hyperlink Crime Thriller', 'Neo-Noir', 'Tamil Masterpiece'],
    musicVibe: 'Javed Riaz dark synthwave, moody electronic ambience, cinematic tension score, deep bass',
    coverImage: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1000&auto=format&fit=crop'
    ],
    trailerYoutubeId: 'R7MR12XOMGQ',
    featured: true
  },
  {
    id: 'day-44-aaranya-kaandam',
    day: 44,
    type: 'movie',
    title: 'Aaranya Kaandam',
    year: 2011,
    duration: '126 min',
    language: 'Tamil',
    tagline: 'EVERY GANGSTER HAS ONE BAD DAY',
    hook: 'India\'s most underrated gangster masterpiece.',
    imdbRating: 8.5,
    cast: ['Jackie Shroff', 'Ravi Krishna', 'Sampath Raj', 'Yasmin Ponnappa', 'Guru Somasundaram'],
    director: 'Thiagarajan Kumararaja',
    availableOn: {
      name: 'Sony LIV',
      url: 'https://www.sonyliv.com'
    },
    storySummary: 'One bad day. In the dark corners of Chennai\'s underworld, aging mob boss Singaperumal, ambitious henchmen, small-time crooks, and ordinary people collide over a single cocaine shipment. Everyone has a plan, but nobody knows how the day will end.',
    whyWatch: 'Widely hailed as India\'s first true neo-noir gangster masterpiece. Thiagarajan Kumararaja won two National Film Awards for his stylish, non-linear screenplay, Yuvan Shankar Raja\'s noir score, and Jackie Shroff\'s terrifying performance.',
    shouldYouWatch: 'YES. A cult-classic masterpiece for lovers of Pulp Fiction, Gangs of Wasseypur, Maqbool, or neo-noir crime cinema.',
    bestFor: ['🌆 India\'s First Neo-Noir', '🏆 2x National Award Winner', '🍿 Quentin Tarantino Vibe', '🎭 Cult Classic Masterpiece'],
    afterCreditsEmotion: 'Inspired',
    emotionalLines: [
      'Chaos has no rules.',
      'Power changes everyone.',
      'Every frame feels iconic.',
      'Stylish. Brutal. Brilliant.',
      'Neo-noir done right.'
    ],
    bestScenes: [
      'Jackie Shroff\'s quiet mob monologue sequence',
      'Rooftop chase & bag swap climax',
      'Yuvan Shankar Raja\'s dark jazz noir background score'
    ],
    moodTags: ['😱 Thriller', '🤯 Mind-Blowing', '⚔️ High-Octane'],
    genres: ['Neo-Noir Gangster', 'Dark Crime Satire', 'Tamil Cult Masterpiece'],
    musicVibe: 'Yuvan Shankar Raja dark jazz noir, moody bassline, cinematic electronic ambience, slow tension-building score',
    coverImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1000&auto=format&fit=crop'
    ],
    trailerYoutubeId: 'haI-Rq8PX3g',
    featured: true
  },
  {
    id: 'day-45-lucia',
    day: 45,
    type: 'movie',
    title: 'Lucia',
    year: 2013,
    duration: '136 min',
    language: 'Kannada',
    tagline: 'WHICH LIFE IS REAL?',
    hook: 'You\'ll question reality after this movie.',
    imdbRating: 8.3,
    cast: ['Sathish Ninasam', 'Sruthi Hariharan', 'Achyuth Kumar', 'Sanjay'],
    director: 'Pawan Kumar',
    availableOn: {
      name: 'Sun NXT',
      url: 'https://www.sunnxt.com'
    },
    storySummary: 'What if your dreams felt more real than your actual life? Nikki, an insomniac theater usher in Bangalore, takes a mysterious pill called Lucia. Soon he lives two parallel realities — one a monochrome struggle, the other a color-soaked dream of movie stardom. But as boundaries blur, he can no longer tell which life is real.',
    whyWatch: 'Lucia revolutionized crowd-funded Indian independent cinema. Pawan Kumar\'s mind-bending non-linear screenplay, Poornachandra Tejaswi\'s hypnotic score, and dual monochrome/color visual storytelling make it a groundbreaking psychological masterpiece.',
    shouldYouWatch: 'YES. Must-watch for fans of Inception, Shutter Island, Joji, No Smoking, or mind-bending psychological thrillers.',
    bestFor: ['🧠 Mind-Bending Non-Linear Thriller', '🏆 Crowd-Funded Legend', '🍿 Dual Reality Storytelling', '📽️ Kannada Indie Milestone'],
    afterCreditsEmotion: 'Speechless',
    emotionalLines: [
      'Dreams feel dangerous.',
      'Reality isn\'t what it seems.',
      'Every frame hides a clue.',
      'Mind-bending cinema.',
      'You\'ll think about it for days.'
    ],
    bestScenes: [
      'Monochrome theater usher vs vibrant movie star transition sequence',
      'Neeveati song dream sequence',
      'Mind-shattering hospital reveal climax'
    ],
    moodTags: ['🤯 Mind-Blowing', '😱 Thriller', '❤️ Meaningful'],
    genres: ['Psychological Mystery Thriller', 'Surreal Non-Linear Drama', 'Kannada Indie Masterpiece'],
    musicVibe: 'Poornachandra Tejaswi ambient synth, slow cinematic piano, dreamlike electronic music, dark atmospheric score',
    coverImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1000&auto=format&fit=crop'
    ],
    trailerYoutubeId: 'pgIL2H-OdcA',
    featured: true
  },
  {
    id: 'day-46-anjaam-pathiraa',
    day: 46,
    type: 'movie',
    title: 'Anjaam Pathiraa',
    year: 2020,
    duration: '144 min',
    language: 'Malayalam',
    tagline: 'THE HUNTER BECOMES THE HUNTED',
    hook: 'The killer is always one step ahead.',
    imdbRating: 7.9,
    cast: ['Kunchacko Boban', 'Sharaf U Dheen', 'Unnimaya Prasad', 'Jinnu Joseph'],
    director: 'Midhun Manuel Thomas',
    availableOn: {
      name: 'Sun NXT',
      url: 'https://www.sunnxt.com'
    },
    storySummary: 'A police officer is found murdered in Kochi. Then another. And another. A methodical serial killer begins targeting high-ranking police officers with terrifying precision. Criminologist and consulting psychologist Anwar Hussain is brought in to map the killer\'s mind, only to discover every clue is a calculated trap.',
    whyWatch: 'Anjaam Pathiraa is one of the slickest, most atmospheric serial killer investigation thrillers in modern Malayalam cinema. Sushin Shyam\'s haunting electronic score and Midhun Manuel Thomas\'s razor-sharp pacing keep you holding your breath.',
    shouldYouWatch: 'YES. Mandatory for fans of Ratsasan, Kshanam, Drishyam, or Mindhunter.',
    bestFor: ['🕵️ Serial Killer Investigation', '🧠 Criminology Profiling', '🎵 Sushin Shyam Master Score', '🍿 High Suspense Thriller'],
    afterCreditsEmotion: 'Speechless',
    emotionalLines: [
      'Every clue is a trap.',
      'Fear has a new face.',
      'Nothing is random.',
      'Pure psychological suspense.',
      'You\'ll never predict it.'
    ],
    bestScenes: [
      'Police control room murder broadcast mapping',
      'Night churchyard crime scene investigation',
      'Sushin Shyam\'s chilling organ-synth theme climax reveal'
    ],
    moodTags: ['😱 Thriller', '🤯 Mind-Blowing', '🌧️ Dark & Atmospheric'],
    genres: ['Serial Killer Mystery', 'Psychological Crime Thriller', 'Malayalam Cinema'],
    musicVibe: 'Sushin Shyam dark orchestral strings, suspenseful synth ambience, slow cinematic bass, investigative thriller score',
    coverImage: 'https://images.unsplash.com/photo-1520038410233-7141be7e6f97?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1000&auto=format&fit=crop'
    ],
    trailerYoutubeId: 'dn5KZD1E67Y',
    featured: true
  },
  {
    id: 'day-47-mukkabaaz',
    day: 47,
    type: 'movie',
    title: 'Mukkabaaz',
    year: 2018,
    duration: '155 min',
    language: 'Hindi',
    tagline: 'SOME FIGHTS AREN\'T IN THE RING',
    hook: 'More than boxing... it\'s a fight for life.',
    imdbRating: 8.0,
    cast: ['Vineet Kumar Singh', 'Zoya Hussain', 'Jimmy Sheirgill', 'Ravi Kishan'],
    director: 'Anurag Kashyap',
    availableOn: {
      name: 'ZEE5',
      url: 'https://www.zee5.com'
    },
    storySummary: 'Shravan Singh, a lower-caste boxer in Bareilly, dreams of becoming a national champion. But when he falls in love with the mute niece of a ruthless local federation head Bhagwan Das Mishra, his fight extends far beyond the ring into caste politics, corruption, and survival.',
    whyWatch: 'Vineet Kumar Singh spent 3 years physically training as a real professional boxer and co-wrote this intense masterpiece. Anurag Kashyap blends gritty sports realism, visceral ring action, and a beautiful silent love story with Rachita Arora\'s electric soundtrack.',
    shouldYouWatch: 'YES. Perfect for lovers of Rocky, Udaan, Sarpatta Parambarai, or realistic sports dramas.',
    bestFor: ['🥊 Visceral Boxing Realism', '🏆 Vineet Kumar Singh Tour-de-Force', '🍿 Underdog Grit', '📽️ Anurag Kashyap Direction'],
    afterCreditsEmotion: 'Inspired',
    emotionalLines: [
      'Fight for your dreams.',
      'Talent isn\'t enough.',
      'Every punch has a purpose.',
      'An underdog masterpiece.',
      'Powerful from start to finish.'
    ],
    bestScenes: [
      'Shravan\'s intense 3-year boxing training montage',
      'Silent love conversation between Shravan and Sunaina',
      'National championship ring bout climax'
    ],
    moodTags: ['😊 Feel Good', '🤯 Mind-Blowing', '⚔️ High-Octane'],
    genres: ['Gritty Sports Drama', 'Social Romance', 'Hindi Cinema'],
    musicVibe: 'Rachita Arora motivational brass, slow cinematic drums, emotional piano build-up, raw Indian rock',
    coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1000&auto=format&fit=crop'
    ],
    trailerYoutubeId: 'fl3gun0J8XM',
    featured: true
  },
  {
    id: 'day-48-sarpatta-parambarai',
    day: 48,
    type: 'movie',
    title: 'Sarpatta Parambarai',
    year: 2021,
    duration: '173 min',
    language: 'Tamil',
    tagline: 'LEGENDS ARE MADE IN THE RING',
    hook: 'The greatest boxing movie India has ever made.',
    imdbRating: 8.5,
    cast: ['Arya', 'Pasupathy', 'Dushara Vijayan', 'John Kokken', 'Shabeer Kallarakkal'],
    director: 'Pa. Ranjith',
    availableOn: {
      name: 'Prime Video',
      url: 'https://www.primevideo.com'
    },
    storySummary: 'Set in 1970s North Chennai, Kabilan, a young harbor worker with an innate passion for boxing, gets his chance to fight for the pride of his Sarpatta clan. But family trauma, political turmoil, addiction, and rivals threaten to knock him down before he can claim ultimate redemption.',
    whyWatch: 'Sarpatta Parambarai is widely regarded as one of Indian cinema\'s ultimate sports masterpieces. Pa. Ranjith delivers flawless 1970s period detail, electrifying fight choreography, and Arya\'s jaw-dropping physical transformation with Santhosh Narayanan\'s epic soundtrack.',
    shouldYouWatch: 'YES. Must-watch for anyone who loves sports dramas, redemption arcs, period epics, or masterpiece Tamil cinema.',
    bestFor: ['🥊 Epic Boxing Period Saga', '⚡ High-Octane Goosebumps', '🏆 Pa. Ranjith Masterpiece', '🍿 1970s North Chennai Realism'],
    afterCreditsEmotion: 'Inspired',
    emotionalLines: [
      'Champions are built.',
      'Fight with pride.',
      'Never stay down.',
      'Every comeback matters.',
      'Pure cinematic adrenaline.'
    ],
    bestScenes: [
      'Kabilan\'s seaside sand dunes comeback training montage',
      'Sarpatta vs Idiyappa clan boxing match at the packed stadium',
      'Dancing Rose duel & Santhosh Narayanan\'s goosebumps theme'
    ],
    moodTags: ['😊 Feel Good', '🤯 Mind-Blowing', '⚔️ High-Octane'],
    genres: ['Period Sports Epic', 'Historical Drama', 'Tamil Masterpiece'],
    musicVibe: 'Santhosh Narayanan epic brass & percussion, motivational drums, cinematic choir, powerful sports anthem',
    coverImage: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1000&auto=format&fit=crop'
    ],
    trailerYoutubeId: 'XTTAHt4VlUA',
    featured: true
  },
  {
    id: 'day-49-agent-sai-srinivasa-athreya',
    day: 49,
    type: 'movie',
    title: 'Agent Sai Srinivasa Athreya',
    year: 2019,
    duration: '147 min',
    language: 'Telugu',
    tagline: 'EVERY CLUE HIDES A SECRET',
    hook: 'India\'s smartest detective movie?',
    imdbRating: 8.3,
    cast: ['Naveen Polishetty', 'Shruti Sharma', 'Shredha Rajagopalan', 'Suhas'],
    director: 'Swaroop RSJ',
    availableOn: {
      name: 'Prime Video',
      url: 'https://www.primevideo.com'
    },
    storySummary: 'Sai Srinivasa Athreya runs FBI (Fatigue Bureau of Investigation) in Nellore, waiting for a big case. When an unidentified body is found near a railway track, Athreya digs in, only to get framed for murder and stumble into a sinister nationwide crime syndicate.',
    whyWatch: 'Agent Sai Srinivasa Athreya is one of the smartest, most entertaining detective thrillers in modern Indian cinema. Naveen Polishetty co-wrote the script and delivers a magnetic, witty performance alongside Mark K. Robin\'s suspenseful score.',
    shouldYouWatch: 'YES. Perfect for anyone who loves Knives Out, Sherlock Holmes, Kshanam, or Ratsasan.',
    bestFor: ['🕵️ Smart Detective Mystery', '🧠 Clever Clue-Tracking', '😄 Witty Humor Meets Suspense', '🍿 Modern Cult Hit'],
    afterCreditsEmotion: 'Inspired',
    emotionalLines: [
      'Every clue matters.',
      'Nothing is accidental.',
      'Funny. Smart. Thrilling.',
      'You\'ll love every twist.',
      'Detective cinema done right.'
    ],
    bestScenes: [
      'FBI Nellore office hilarious client pitch sequence',
      'Railway track crime scene investigation mapping',
      'Mind-boggling multi-layer mystery unraveling climax'
    ],
    moodTags: ['😱 Thriller', '🤯 Mind-Blowing', '😊 Feel Good'],
    genres: ['Detective Comedy Thriller', 'Murder Mystery', 'Telugu Masterpiece'],
    musicVibe: 'Mark K. Robin detective noir jazz, suspenseful piano, ambient mystery synth, investigative thriller score',
    coverImage: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1000&auto=format&fit=crop'
    ],
    trailerYoutubeId: 'iPfVbR5oAWE',
    hindiTrailerYoutubeId: '7UWFn0MR0Og',
    featured: true
  },
  {
    id: 'day-50-ulidavaru-kandanthe',
    day: 50,
    type: 'movie',
    title: 'Ulidavaru Kandanthe',
    year: 2014,
    duration: '154 min',
    language: 'Kannada',
    tagline: 'EVERY STORY HAS A DIFFERENT TRUTH',
    hook: 'How many versions can one truth have?',
    imdbRating: 8.4,
    cast: ['Rakshit Shetty', 'Kishore', 'Tara', 'Achyuth Kumar', 'Sheetal Shetty'],
    director: 'Rakshit Shetty',
    availableOn: {
      name: 'Sun NXT',
      url: 'https://www.sunnxt.com'
    },
    storySummary: 'One incident. Five different stories. Five different truths. Set in the coastal town of Malpe (Mangalore), a journalist interviews various witnesses of a mysterious murder involving local gangster Richa. As each chapter unfolds, the Rashomon-style narrative forces you to question reality.',
    whyWatch: 'Ulidavaru Kandanthe is a landmark cult classic that reshaped modern Kannada cinema. Directed by and starring Rakshit Shetty, it blends coastal Malpe culture, Tiger Dance (Pili Vesha), Quentin Tarantino homage, B. Ajaneesh Loknath\'s haunting score, and 5-chapter Rashomon storytelling.',
    shouldYouWatch: 'YES. Essential for anyone who loves non-linear crime thrillers, Rashomon, Pulp Fiction, or Kantara coastal culture.',
    bestFor: ['🌊 Rashomon Multi-Perspective Thriller', '🎭 Coastal Malpe Culture & Pili Vesha', '🏆 Rakshit Shetty Cult Classic', '🍿 Tarantino Homage'],
    afterCreditsEmotion: 'Inspired',
    emotionalLines: [
      'Every story has two sides.',
      'Truth depends on who\'s telling it.',
      'Every frame is beautiful.',
      'Cinema at its finest.',
      'A hidden masterpiece.'
    ],
    bestScenes: [
      'Richi\'s iconic entry with B. Ajaneesh Loknath\'s theme score',
      'Malpe harbor rain standoff sequence',
      'Pili Vesha (Tiger Dance) climax ritual duel'
    ],
    moodTags: ['🤯 Mind-Blowing', '😱 Thriller', '🌧️ Dark & Atmospheric'],
    genres: ['Rashomon Neo-Noir', 'Coastal Crime Drama', 'Kannada Cult Masterpiece'],
    musicVibe: 'B. Ajaneesh Loknath atmospheric coastal guitar, slow indie acoustic, cinematic violin, coastal trumpet score',
    coverImage: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop'
    ],
    trailerYoutubeId: 'POJ_6EtGeMw',
    featured: true
  },
  {
    id: 'day-51-jigarthanda',
    day: 51,
    type: 'movie',
    title: 'Jigarthanda',
    year: 2014,
    duration: '171 min',
    language: 'Tamil',
    tagline: 'HE FOLLOWED THE WRONG MAN',
    hook: 'This gangster movie becomes something you never expect.',
    imdbRating: 8.2,
    cast: ['Siddharth', 'Bobby Simha', 'Lakshmi Menon', 'Karunakaran', 'Guru Somasundaram'],
    director: 'Karthik Subbaraj',
    availableOn: {
      name: 'Sun NXT',
      url: 'https://www.sunnxt.com'
    },
    storySummary: 'What happens when an aspiring director decides to secretly stalk a real ruthless gangster to write a realistic crime movie? Karthik goes to Madurai to spy on Assault Sethu, a terrifying mob boss. But when Sethu catches him, he forces Karthik to cast him as the hero of a movie, leading to an unpredictable meta-comedy transformation.',
    whyWatch: 'Jigarthanda won two National Film Awards (Best Supporting Actor for Bobby Simha as Assault Sethu & Best Editing). Karthik Subbaraj\'s meta-cinema masterpiece effortlessly transitions from gritty mob thriller into a hilarious, heart-filled genre subversion paired with Santhosh Narayanan\'s iconic score.',
    shouldYouWatch: 'YES. A mandatory watch for fans of meta-cinema, Super Deluxe, Aaranya Kaandam, or Gangs of Wasseypur.',
    bestFor: ['🏆 National Award Winner (Bobby Simha)', '🎥 Meta-Cinema Gangster Comedy', '🌶️ Madurai Underworld Realism', '🍿 Genius Genre Subversion'],
    afterCreditsEmotion: 'Happy',
    emotionalLines: [
      'Fear meets filmmaking.',
      'Every twist lands perfectly.',
      'Dark. Funny. Brilliant.',
      'One unforgettable performance.',
      'A cult classic.'
    ],
    bestScenes: [
      'Assault Sethu\'s terrifying rain introduction scene',
      'Karthik & Oorni secretly filming Sethu\'s gang from a balcony',
      'Kannan Varuvaan acting class & meta-climax premiere'
    ],
    moodTags: ['😊 Feel Good', '🤯 Mind-Blowing', '⚔️ High-Octane'],
    genres: ['Meta Gangster Comedy', 'Crime Satire', 'Tamil Cult Classic'],
    musicVibe: 'Santhosh Narayanan dark jazz, retro gangster brass, cinematic bass, suspenseful trumpet score',
    coverImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1000&auto=format&fit=crop'
    ],
    trailerYoutubeId: '_T8n-EHr4ZE',
    featured: true
  },
  {
    id: 'day-52-kaaka-muttai',
    day: 52,
    type: 'movie',
    title: 'Kaaka Muttai',
    year: 2014,
    duration: '109 min',
    language: 'Tamil',
    tagline: 'SOMETIMES THE SMALLEST DREAMS MATTER MOST',
    hook: 'A pizza was all they wanted.',
    imdbRating: 8.4,
    cast: ['Ramesh Thilaganathan', 'Vignesh', 'Aishwarya Rajesh', 'Ramesh', 'Babu Antony'],
    director: 'M. Manikandan',
    availableOn: {
      name: 'Sun NXT',
      url: 'https://www.sunnxt.com'
    },
    storySummary: 'Two young brothers living in a Chennai slum become fascinated by a newly opened pizza shop. Determined to earn money to buy a single slice, they collect coal and run odd errands, leading to an innocent journey that exposes media exploitation, class divides, and childhood resilience.',
    whyWatch: 'Kaaka Muttai won two National Film Awards (Best Children\'s Film & Best Child Artists). M. Manikandan\'s directorial debut, co-produced by Dhanush and Vetrimaaran with G. V. Prakash Kumar\'s heartwarming music, is one of modern Indian cinema\'s purest gems.',
    shouldYouWatch: 'YES. Mandatory for lovers of The Lunchbox, Slumdog Millionaire, Charlie, or heartwarming coming-of-age cinema.',
    bestFor: ['🍕 Heartwarming Innocent Humor', '🏆 2x National Award Winner', '🍿 Pure Emotional Storytelling', '❤️ Masterpiece Coming-of-Age'],
    afterCreditsEmotion: 'Inspired',
    emotionalLines: [
      'Childhood is priceless.',
      'Simple dream. Powerful story.',
      'You\'ll smile and cry.',
      'Beautifully human.',
      'A hidden masterpiece.'
    ],
    bestScenes: [
      'Boys picking coal along railway tracks to save pennies',
      'Buying new clothes attempt outside high-end Mall',
      'Heartwarming pizza tasting climax scene'
    ],
    moodTags: ['😊 Feel Good', '❤️ Meaningful', '😢 Emotional'],
    genres: ['Heartwarming Drama', 'Coming-of-Age', 'Social Realism', 'Tamil Masterpiece'],
    musicVibe: 'G. V. Prakash Kumar soft acoustic guitar, gentle piano, hopeful orchestral strings, warm indie instrumental',
    coverImage: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop'
    ],
    trailerYoutubeId: 'bm6RCZgptkU',
    featured: true
  },
  {
    id: 'day-53-the-disciple',
    day: 53,
    type: 'movie',
    title: 'The Disciple',
    year: 2020,
    duration: '127 min',
    language: 'Marathi',
    tagline: 'HOW FAR WOULD YOU GO FOR YOUR DREAM?',
    hook: 'What if your biggest dream never comes true?',
    imdbRating: 7.2,
    cast: ['Aditya Modak', 'Arun Dravid', 'Sumitra Bhave', 'Deepika Bhide Bhagwat'],
    director: 'Chaitanya Tamhane',
    availableOn: {
      name: 'Netflix',
      url: 'https://www.netflix.com'
    },
    storySummary: 'Sharad Devdhar has devoted his entire youth to mastering Khayal (Hindustani classical vocal music) in Mumbai, guided by his strict Guru and the mystical audio tapes of an legendary late master, Maai. But as years pass, Sharad confronts the painful realization that devotion and sacrifice do not automatically grant genius.',
    whyWatch: 'Executive produced by Oscar-winner Alfonso Cuarón and directed by Chaitanya Tamhane (Court). Won Best Screenplay at the Venice International Film Festival and FIPRESCI International Critics Prize. Real-life classical vocalist Aditya Modak gives an extraordinary performance.',
    shouldYouWatch: 'YES. Must-watch for anyone who has ever pursued a passion, faced self-doubt, or loved Whiplash, Court, Masaan, or A Death in the Gunj.',
    bestFor: ['🏆 Venice Film Festival Best Screenplay Winner', '🎼 Hindustani Classical Music Exploration', '🎬 Alfonso Cuarón Executive Produced', '🍿 Honest Tale of Ambition & Reality'],
    afterCreditsEmotion: 'Inspired',
    emotionalLines: [
      'Perfection has a price.',
      'Dreams demand everything.',
      'Silence speaks louder.',
      'Success isn\'t guaranteed.',
      'A masterpiece about ambition.'
    ],
    bestScenes: [
      'Sharad riding his motorcycle through midnight Mumbai listening to Maai\'s secret lectures',
      'Intense Riayaz (vocal practice) session under Guruji\'s strict gaze',
      'Venice award-winning philosophical climax concert performance'
    ],
    moodTags: ['❤️ Meaningful', '😢 Emotional', '🤯 Mind-Blowing'],
    genres: ['Classical Musical Drama', 'Psychological Character Study', 'Marathi Masterpiece'],
    musicVibe: 'Aneesh Pradhan Hindustani classical vocal raga, tanpura drone, soft classical tabla, ambient Mumbai night score',
    coverImage: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop'
    ],
    trailerYoutubeId: 'uIqAOGM_zZ0',
    featured: true
  },
  {
    id: 'day-54-harishchandrachi-factory',
    day: 54,
    type: 'movie',
    title: 'Harishchandrachi Factory',
    year: 2009,
    duration: '96 min',
    language: 'Marathi',
    tagline: 'WHERE INDIAN CINEMA BEGAN',
    hook: 'The movie that tells how Indian cinema began.',
    imdbRating: 8.3,
    cast: ['Nandu Madhav', 'Vibhawari Deshpande', 'Mohit Gokhale', 'Atharva Karve'],
    director: 'Paresh Mokashi',
    availableOn: {
      name: 'Prime Video',
      url: 'https://www.primevideo.com'
    },
    storySummary: 'Before Bollywood and Indian cinema existed, one visionary man believed the impossible was possible. This joyous biographical comedy follows Dadasaheb Phalke as he sells his household possessions, travels to London in 1912 to learn filmmaking, and gathers his eccentric family and neighbors to create Raja Harishchandra — India\'s very first feature film.',
    whyWatch: 'India\'s official entry for the 82nd Academy Awards and winner of National Film Award for Best Feature Film in Marathi. Paresh Mokashi crafts an endlessly witty, joyful, and inspiring tribute to the birth of Indian cinema.',
    shouldYouWatch: 'YES. Mandatory for every cinema lover, history enthusiast, and fan of uplifting true stories.',
    bestFor: ['🏆 Oscar Entry & National Award Winner', '🎥 Birth of Indian Cinema', '😊 Wholesome & Hilarious True Story', '🍿 Dadasaheb Phalke Tribute'],
    afterCreditsEmotion: 'Happy',
    emotionalLines: [
      'Every dream starts small.',
      'Believe before the world does.',
      'The birth of Indian cinema.',
      'Inspiring and unforgettable.',
      'A hidden gem.'
    ],
    bestScenes: [
      'Phalke discovering silent motion pictures in a Bombay tent cinema',
      'Family kitchen chemical processing & film development experiment',
      'Premiere screening of India\'s first movie Raja Harishchandra'
    ],
    moodTags: ['😊 Feel Good', '❤️ Meaningful', '🤯 Mind-Blowing'],
    genres: ['Biographical Comedy', 'Period History', 'Marathi Masterpiece'],
    musicVibe: 'Anand Modak vintage 1910s brass band, soft piano, strings, joyful orchestral soundtrack',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop'
    ],
    trailerYoutubeId: 'LPvvMbXLfpA',
    featured: true
  },
  {
    id: 'day-55-sairat',
    day: 55,
    type: 'movie',
    title: 'Sairat',
    year: 2016,
    duration: '174 min',
    language: 'Marathi',
    tagline: 'LOVE WAS NEVER THE PROBLEM',
    hook: 'This isn\'t the love story you expect.',
    imdbRating: 8.3,
    cast: ['Rinku Rajguru', 'Akash Thosar', 'Tanaji Galgunde', 'Arbaz Shaikh'],
    director: 'Nagraj Manjule',
    availableOn: {
      name: 'ZEE5',
      url: 'https://www.zee5.com'
    },
    storySummary: 'Prashant (Parshya), a lower-caste cricket player, and Archana (Archie), the bold daughter of a wealthy upper-caste politician, fall deeply in love in a rural Maharashtra village. Forced to flee to Hyderabad after their romance is discovered, their dream of freedom collides with urban poverty, forgiveness, and a haunting, silent climax.',
    whyWatch: 'Sairat is the highest-grossing Marathi film of all time and premiered at the Berlin International Film Festival. Rinku Rajguru won a National Film Special Jury Award at age 15. Featuring Ajay-Atul\'s iconic symphonic score recorded at Hollywood\'s Sony Scoring Stage ("Zingaat", "Yad Lagla").',
    shouldYouWatch: 'YES. Mandatory, life-altering viewing for anyone who loves epic romances, social realism, and unforgettable cinema.',
    bestFor: ['🏆 National Award & Berlin Film Festival Phenomenon', '🎵 Ajay-Atul Master Symphonic Score', '❤️ Legendary Romance & Realism', '🍿 Highest Grossing Marathi Epic'],
    afterCreditsEmotion: 'Heartbroken',
    emotionalLines: [
      'Love meets reality.',
      'Beautiful. Brutal. Unforgettable.',
      'Some endings stay forever.',
      'Cinema at its finest.',
      'A modern classic.'
    ],
    bestScenes: [
      'Archie driving the tractor through sugarcane fields & "Yad Lagla" song',
      'High-energy "Zingaat" village celebration dance sequence',
      'Complete silence in the final 5 minutes leading to the legendary climax'
    ],
    moodTags: ['😢 Emotional', '❤️ Meaningful', '😊 Feel Good'],
    genres: ['Epic Romantic Tragedy', 'Social Realism', 'Marathi Masterpiece'],
    musicVibe: 'Ajay-Atul Hollywood symphonic orchestra, "Zingaat" energetic brass drums, "Yad Lagla" sweeping strings, acoustic guitar',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop'
    ],
    trailerYoutubeId: 'iShPI_JF524',
    featured: true
  },
  {
    id: 'day-56-c-o-kancharapalem',
    day: 56,
    type: 'movie',
    title: 'C/o Kancharapalem',
    year: 2018,
    duration: '152 min',
    language: 'Telugu',
    tagline: 'LOVE HAS NO AGE',
    hook: 'The love story everyone should experience once.',
    imdbRating: 8.8,
    cast: ['Subba Rao', 'Radha Bessy', 'Mohan Bhagat', 'Praveena Paruchuri', 'Karthik Rathnam'],
    director: 'Venkatesh Maha',
    availableOn: {
      name: 'Netflix',
      url: 'https://www.netflix.com'
    },
    storySummary: 'Set in the suburb of Kancharapalem in Visakhapatnam, four non-linear romance stories unfold across four different age groups: a schoolboy and his classmate, a young wine-store worker and a prostitute, a middle-aged gym instructor and a Brahmin widow, and an unmarried 49-year-old attendant and a 47-year-old officer from Odisha.',
    whyWatch: 'With an astonishing 8.8/10 rating on IMDb, C/o Kancharapalem is the highest-rated Telugu indie film. Venkatesh Maha cast 80 local residents with zero prior acting experience, creating a groundbreaking masterpiece screened at the New York Indian Film Festival.',
    shouldYouWatch: 'YES. Essential, heart-melting viewing for lovers of The Lunchbox, Kaaka Muttai, Masaan, or Stories of Life.',
    bestFor: ['🌟 8.8/10 IMDb Masterpiece', '❤️ 4 Generational Love Stories', '🏆 NYIFF Screened Indie Legend', '🍿 Pure Heartwarming Realism'],
    afterCreditsEmotion: 'Inspired',
    emotionalLines: [
      'Love has no age.',
      'Simple stories, unforgettable emotions.',
      'Humanity over everything.',
      'Real people. Real feelings.',
      'A masterpiece hidden in plain sight.'
    ],
    bestScenes: [
      'Raju & Radha\'s evening tea and quiet office conversations',
      'Sundaram saving his school crush\'s pink ribbon',
      'Heartwarming four-story convergence climax reveal'
    ],
    moodTags: ['😊 Feel Good', '❤️ Meaningful', '😢 Emotional'],
    genres: ['Hyperlink Romance', 'Slice-of-Life Drama', 'Telugu Indie Masterpiece'],
    musicVibe: 'Sweekar Agasthi soft acoustic guitar, gentle piano, ambient indie instrumental, warm Telugu folk strings',
    coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop'
    ],
    trailerYoutubeId: '-YeQZwlNeaY',
    featured: true
  },
  {
    id: 'day-57-killa',
    day: 57,
    type: 'movie',
    title: 'Killa',
    year: 2014,
    duration: '122 min',
    language: 'Marathi',
    tagline: 'CHILDHOOD NEVER REALLY LEAVES',
    hook: 'This movie feels like childhood.',
    imdbRating: 8.0,
    cast: ['Archit Deodhar', 'Parth Bhalerao', 'Amruta Subhash', 'Uttara Baokar'],
    director: 'Avinash Arun',
    availableOn: {
      name: 'Prime Video',
      url: 'https://www.primevideo.com'
    },
    storySummary: 'After his father\'s death, 11-year-old Chinmay (Chinu) moves with his government clerk mother to a small coastal Konkan town in Maharashtra. Struggling with loneliness, grief, and adapting to a new school, Chinu finds solace, laughter, and courage through a group of quirky local village boys and Konkan monsoon adventures.',
    whyWatch: 'Winner of the Crystal Bear at the 64th Berlin International Film Festival and National Film Award for Best Feature Film in Marathi. Director & cinematographer Avinash Arun delivers breathtaking rain-soaked Konkan visuals, paired with Naren Chandavarkar\'s nostalgic score and Parth Bhalerao\'s hilarious performance.',
    shouldYouWatch: 'YES. Must-watch for anyone who loves coming-of-age cinema, monsoon nostalgia, Kaaka Muttai, October, or Pather Panchali.',
    bestFor: ['🏆 Berlin Crystal Bear & National Award Winner', '🌧️ Konkan Monsoon Nostalgia', '😊 Heartwarming Sibling/Friendship Humor', '🍿 Coming-of-Age Masterpiece'],
    afterCreditsEmotion: 'Inspired',
    emotionalLines: [
      'Some memories never leave.',
      'Home is a feeling.',
      'Childhood deserves to be remembered.',
      'Simple. Honest. Beautiful.',
      'A hidden masterpiece.'
    ],
    bestScenes: [
      'Bicycle race through Konkan coconut groves in monsoon rain',
      'Fort exploration hide-and-seek sequence at the ocean shore',
      'Quiet mother-son night conversation about moving forward'
    ],
    moodTags: ['😊 Feel Good', '❤️ Meaningful', '🌧️ Rainy Evening'],
    genres: ['Coming-of-Age Drama', 'Family Nostalgia', 'Marathi Masterpiece'],
    musicVibe: 'Naren Chandavarkar soft piano, gentle acoustic guitar, rain ambience with strings, nostalgic indie instrumental',
    coverImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop'
    ],
    trailerYoutubeId: 't3B_WzebSHM',
    featured: true
  },
  {
    id: 'day-58-village-rockstars',
    day: 58,
    type: 'movie',
    title: 'Village Rockstars',
    year: 2017,
    duration: '87 min',
    language: 'Assamese',
    tagline: 'BIG DREAMS CAN START ANYWHERE',
    hook: 'The little girl who dreamed of becoming a rockstar.',
    imdbRating: 7.4,
    cast: ['Bhanita Das', 'Basanti Das', 'Manabendra Das', 'Boloram Das'],
    director: 'Rima Das',
    availableOn: {
      name: 'Netflix',
      url: 'https://www.netflix.com'
    },
    storySummary: 'In a small flood-prone village in Assam, 10-year-old free-spirited Dhunu dreams of owning a real electric guitar and starting her own rock band with local village boys. Living with her widowed mother who works in paddy fields, Dhunu\'s spirit and cardboard guitar refuse to let poverty, gender norms, or floods shatter her dream.',
    whyWatch: 'India\'s official entry for the 91st Academy Awards and winner of 4 National Film Awards, including Best Feature Film. One-woman army Rima Das single-handedly wrote, directed, shot, edited, and produced this masterpiece in her home village using natural light and non-actor villagers.',
    shouldYouWatch: 'YES. Must-watch for lovers of indie cinema, Killa, Kaaka Muttai, The Lunchbox, or inspiring stories of childhood resilience.',
    bestFor: ['🏆 Oscar Entry & 4x National Award Winner', '🎸 Inspiring Childhood Spirit', '🌾 One-Woman Indie Legend (Rima Das)', '🍿 Pure Assamese Nature & Soul'],
    afterCreditsEmotion: 'Inspired',
    emotionalLines: [
      'Dreams don\'t need money.',
      'Hope grows everywhere.',
      'Childhood is fearless.',
      'Small village. Big dreams.',
      'A hidden masterpiece.'
    ],
    bestScenes: [
      'Dhunu and her band performing with handmade styrofoam/cardboard guitars',
      'Mother teaching Dhunu to climb trees & stand tall against village gossip',
      'Running through monsoon-flooded paddy fields with green dragonflies'
    ],
    moodTags: ['😊 Feel Good', '❤️ Meaningful', '🎒 Adventure'],
    genres: ['Coming-of-Age Indie', 'Assamese Masterpiece', 'Poetic Realism'],
    musicVibe: 'Soft acoustic guitar, gentle Assamese folk instrumental, ambient nature piano, hopeful strings',
    coverImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop'
    ],
    trailerYoutubeId: 'tTov2nVgXaU',
    featured: true
  },
  {
    id: 'day-59-fandry',
    day: 59,
    type: 'movie',
    title: 'Fandry',
    year: 2013,
    duration: '103 min',
    language: 'Marathi',
    tagline: 'SOME DREAMS ARE FORCED TO FIGHT HARDER',
    hook: 'One stone. One ending. A lifetime of impact.',
    imdbRating: 8.3,
    cast: ['Somnath Awghade', 'Rajeshwari Kharat', 'Kishor Kadam', 'Nagraj Manjule', 'Chhaya Kadam'],
    director: 'Nagraj Manjule',
    availableOn: {
      name: 'ZEE5',
      url: 'https://www.zee5.com'
    },
    storySummary: 'Jambuvant (Jabya), a 13-year-old Dalit boy in a rural Maharashtra village, falls in love with his upper-caste classmate Shalu. Desperate to change his fate and get money to buy clothes for Shalu\'s attention, he obsessively hunts a black sparrow believed to have magical love powers, while his impoverished family is forced by villagers to hunt wild pigs (fandry).',
    whyWatch: 'Winner of the Indira Gandhi Award for Best Debut Film of a Director at the National Film Awards and Grand Jury Prize at Mumbai Film Festival (MAMI). Nagraj Manjule\'s directorial debut culminates in one of the most unforgettable, iconic, rock-throwing final shots in cinema history.',
    shouldYouWatch: 'YES. Essential, mind-shattering viewing for fans of Sairat, Court, Killa, or Pather Panchali.',
    bestFor: ['🏆 National Award Debut Masterpiece', '🗿 Iconic Ending in Indian Cinema History', '🌾 Uncompromising Social Realism', '🍿 Predecessor to Sairat'],
    afterCreditsEmotion: 'Speechless',
    emotionalLines: [
      'Dreams deserve equality.',
      'Silence can be loud.',
      'You\'ll never forget the ending.',
      'A painful masterpiece.',
      'Cinema that changes perspectives.'
    ],
    bestScenes: [
      'Jabya chasing the black sparrow through golden sunlit fields',
      'Pig hunting humiliation in front of the entire village school',
      'The chilling, legendary final rock-throwing frame at the camera'
    ],
    moodTags: ['😢 Emotional', '❤️ Meaningful', '🤯 Mind-Blowing'],
    genres: ['Social Realism Drama', 'Coming-of-Age Tragedy', 'Marathi Masterpiece'],
    musicVibe: 'Alokananda Dasgupta soft violin, emotional piano, ambient folk instrumental, slow cinematic strings',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop'
    ],
    trailerYoutubeId: 'BjHsL-_KG30',
    featured: true
  },
  {
    id: 'day-60-photograph',
    day: 60,
    type: 'movie',
    title: 'Photograph',
    year: 2019,
    duration: '110 min',
    language: 'Hindi',
    tagline: 'SOME STORIES BEGIN WITH A SINGLE PHOTO',
    hook: 'The quiet love story nobody talks about.',
    imdbRating: 6.8,
    cast: ['Nawazuddin Siddiqui', 'Sanya Malhotra', 'Farrukh Jaffar', 'Vijay Raaz'],
    director: 'Ritesh Batra',
    availableOn: {
      name: 'Prime Video',
      url: 'https://www.primevideo.com'
    },
    storySummary: 'Rafi, a struggling street photographer at Gateway of India in Mumbai, is pressured by his grandmother to marry. He shows her a photo of Miloni, a shy, introverted middle-class Gujarati student he photographed. When his grandmother insists on meeting her, Miloni unexpectedly agrees to play the role of his fiancee.',
    whyWatch: 'Directed by Ritesh Batra (The Lunchbox), Photograph premiered at Sundance & Berlin Film Festivals. A delicate, melancholic Mumbai romance featuring Nawazuddin Siddiqui and Sanya Malhotra\'s subtle performances and Peter Raeburn\'s nostalgic score.',
    shouldYouWatch: 'YES. Perfect for lovers of The Lunchbox, Masaan, October, or C/o Kancharapalem.',
    bestFor: ['🌆 Delicate Mumbai Romance', '📸 Street Photography Nostalgia', '📽️ Ritesh Batra Direction (The Lunchbox)', '🍿 Quiet & Subtle Human Connection'],
    afterCreditsEmotion: 'Inspired',
    emotionalLines: [
      'Some connections need no words.',
      'Love can arrive quietly.',
      'Mumbai never looked this beautiful.',
      'Simple. Gentle. Unforgettable.',
      'A hidden masterpiece.'
    ],
    bestScenes: [
      'Gateway of India photo-taking opening sequence',
      'Kulfi shop date conversation about nostalgia and old soda flavors',
      'Taxi ride through rainy Mumbai night streets'
    ],
    moodTags: ['😊 Feel Good', '❤️ Meaningful', '🌧️ Rainy Evening'],
    genres: ['Gentle Romance', 'Slice-of-Life Drama', 'Hindi Indie Cinema'],
    musicVibe: 'Peter Raeburn soft piano, lo-fi acoustic guitar, ambient Mumbai city sounds, gentle strings',
    coverImage: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop'
    ],
    trailerYoutubeId: 'hUL2z8Ps_Ik',
    featured: true
  },
  {
    id: 'day-61-titli',
    day: 61,
    type: 'movie',
    title: 'Titli',
    year: 2014,
    duration: '116 min',
    language: 'Hindi',
    tagline: 'HOME SHOULDN\'T FEEL LIKE A PRISON',
    hook: 'His biggest enemy was his own family.',
    imdbRating: 7.5,
    cast: ['Shashank Arora', 'Ranvir Shorey', 'Shivani Raghuvanshi', 'Amit Sial', 'Lalit Behl'],
    director: 'Kanu Behl',
    availableOn: {
      name: 'Prime Video',
      url: 'https://www.primevideo.com'
    },
    storySummary: 'Titli, the youngest member of a violent car-jacking brotherhood operating on the gritty outskirts of Delhi, desperately wants to escape his abusive family and buy a parking spot ticket booth. Forced into an arranged marriage by his brothers, he forms an unexpected pact with his new wife Neelu, who is harboring secrets of her own, to secure their mutual freedom.',
    whyWatch: 'Premiered in the prestigious Un Certain Regard section at the Cannes Film Festival and produced by Yash Raj Films & Dibakar Banerjee. Kanu Behl\'s unflinching directorial debut features electrifying performances by Shashank Arora, Ranvir Shorey, and Shivani Raghuvanshi, with Karan Gour\'s dark ambient score.',
    shouldYouWatch: 'YES. Must-watch for fans of Ugly, Gangs of Wasseypur, Visaranai, NH10, or dark, realistic family crime dramas.',
    bestFor: ['🏆 Cannes Un Certain Regard Nominee', '🩸 Gritty Delhi Crime Realism', '🎭 Ranvir Shorey & Shashank Arora Tour-de-Force', '🍿 Toxic Family Escape Drama'],
    afterCreditsEmotion: 'Speechless',
    emotionalLines: [
      'Freedom has a price.',
      'Every family has secrets.',
      'Dark. Honest. Powerful.',
      'Escape isn\'t easy.',
      'An underrated masterpiece.'
    ],
    bestScenes: [
      'Tense family dinner sequence exposing brotherly tyranny',
      'Titli & Neelu signing secret pact agreement in the car',
      'High-stakes car-jacking confrontation on Delhi outskirts'
    ],
    moodTags: ['😱 Thriller', '🤯 Mind-Blowing', '🌧️ Dark & Atmospheric'],
    genres: ['Dark Crime Drama', 'Family Tragedy', 'Hindi Indie Masterpiece'],
    musicVibe: 'Karan Gour dark ambient piano, slow cinematic strings, moody electronic ambience, minimal suspense instrumental',
    coverImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1000&auto=format&fit=crop'
    ],
    trailerYoutubeId: 'OOqiQiMkXDA',
    featured: true
  },
  {
    id: 'day-62-kothanodi',
    day: 62,
    type: 'movie',
    title: 'Kothanodi',
    year: 2015,
    duration: '115 min',
    language: 'Assamese',
    tagline: 'EVERY FOLK TALE HIDES A NIGHTMARE',
    hook: 'The darkest Indian folklore movie you\'ve never seen.',
    imdbRating: 7.0,
    cast: ['Seema Biswas', 'Adil Hussain', 'Zerifa Wahid', 'Urmila Mahanta', 'Kopil Bora'],
    director: 'Bhaskar Hazarika',
    availableOn: {
      name: 'MUBI',
      url: 'https://mubi.com'
    },
    storySummary: 'Based on classic Assamese Burhi Aair Xadhu (Grandmother\'s Tales), four dark folklore fables intertwine: a mother obsessed with sacrificing her newborns to a river entity, a stepmother plotting her stepdaughter\'s cruel fate, a woman giving birth to an out-of-control elephant apple (Ou Tenga) that rolls after her, and a father protecting his daughter from an uncle\'s sinister wedding ritual.',
    whyWatch: 'Winner of the National Film Award for Best Feature Film in Assamese. Premiered at the Busan International Film Festival and BFI London Film Festival. Bhaskar Hazarika (Aamis) crafts a dark, eerie folk-horror atmospheric masterpiece preceding Tumbbad.',
    shouldYouWatch: 'YES. Must-watch for lovers of Tumbbad, Kantara, Aamis, The Witch, or atmospheric folk horror.',
    bestFor: ['🏆 National Award Winner', '🌿 Assamese Dark Folk Horror', '😱 Tumbbad Prequel Vibe', '🍿 Bhaskar Hazarika Cult Classic'],
    afterCreditsEmotion: 'Speechless',
    emotionalLines: [
      'Every legend hides a truth.',
      'Fear wears a human face.',
      'Beautifully unsettling.',
      'Folklore has never felt this real.',
      'A forgotten masterpiece.'
    ],
    bestScenes: [
      'The Ou Tenga (elephant apple) hauntingly rolling after Senehi through bamboo groves',
      'Tejimola\'s stepmother burying her beneath the mortar in secret',
      'Lantern-lit night forest ritual confrontation'
    ],
    moodTags: ['😱 Thriller', '🤯 Mind-Blowing', '🌧️ Dark & Atmospheric'],
    genres: ['Dark Folk Horror', 'Psychological Fantasy', 'Assamese Masterpiece'],
    musicVibe: 'Amrit Pritam & Anurag Saikia haunting bamboo flute, dark ambient drone, minimal piano, atmospheric folk strings',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1000&auto=format&fit=crop'
    ],
    trailerYoutubeId: 'k-jlVdIBBak',
    featured: true
  },
  {
    id: 'day-69-tabbar',
    day: 69,
    type: 'series',
    title: 'Tabbar',
    year: 2021,
    episodes: 8,
    language: 'Hindi',
    tagline: 'HOW FAR WOULD YOU GO FOR YOUR FAMILY?',
    hook: 'The family thriller everyone missed.',
    imdbRating: 8.2,
    cast: ['Pawan Malhotra', 'Supriya Pathak', 'Gagan Arora', 'Paramvir Singh Cheema'],
    director: 'Ajitpal Singh',
    availableOn: {
      name: 'Sony LIV',
      url: 'https://www.sonyliv.com'
    },
    storySummary: 'Omkar Singh is an ordinary retired police constable living a quiet life with his wife and two sons in Punjab. When a single unexpected night changes everything, the entire family is forced into a dangerous game of survival where every decision has consequences.',
    whyWatch: 'Tabbar is one of the finest Indian crime dramas in recent years. Instead of relying on large-scale action, it builds suffocating suspense through believable characters, moral dilemmas, and emotional family dynamics. Pawan Malhotra delivers a career-defining performance.',
    shouldYouWatch: 'YES. Perfect for fans of grounded thrillers like Drishyam and Paatal Lok.',
    bestFor: ['👨‍👩‍👧‍👦 Family Crime Dilemma', '🔥 Relentless Suspense', '🎭 Pawan Malhotra Performance', '🌧️ Dark Punjab Setting'],
    afterCreditsEmotion: 'Speechless',
    emotionalLines: [
      'Family comes first.',
      'One mistake changes everything.',
      'Every episode gets darker.',
      'Ordinary people. Extraordinary choices.',
      'A hidden masterpiece.'
    ],
    bestScenes: [
      'Family dinner quiet tension scene',
      'Night-time body disposal & evidence cleanup sequence',
      'Omkar Singh\'s desperate police investigation stare-down'
    ],
    moodTags: ['😱 Thriller', '🤯 Mind-Blowing', '🌧️ Dark & Atmospheric'],
    genres: ['Crime Thriller', 'Family Drama', 'Noir Suspense'],
    musicVibe: 'Slow suspense strings, dark ambient synth, deep cinematic bass',
    coverImage: 'https://image.tmdb.org/t/p/original/otlPrZEtwTlNfyZWisUgZgAiLUR.jpg',
    images: ['https://planetbollywood.com/wp/wp-content/uploads/2021/10/Tabbar1.jpg',
      "https://sc0.blr1.cdn.digitaloceanspaces.com/article/165070-rcqpmpqucp-1634059054.jpeg",
      "https://sc0.blr1.cdn.digitaloceanspaces.com/inline/qoziqujxoe-1634059118.jpg",
      "https://sc0.blr1.cdn.digitaloceanspaces.com/inline/kkrhmybnut-1634058901.png"
    ],
    trailerYoutubeId: "wcQCQc9beXw?si",
    featured: true
  },
  {
    id: 'day-70-kohrra',
    day: 70,
    type: 'series',
    title: 'Kohrra',
    year: 2023,
    episodes: 6,
    language: 'Hindi',
    tagline: 'EVERY SECRET LEAVES A TRACE',
    hook: 'One murder. Endless secrets.',
    imdbRating: 8.3,
    cast: ['Suvinder Vicky', 'Barun Sobti', 'Harleen Sethi', 'Varun Badola'],
    director: 'Randeep Jha',
    availableOn: {
      name: 'Netflix',
      url: 'https://www.netflix.com'
    },
    storySummary: 'When an NRI groom is found murdered in a mustard field days before his wedding in rural Punjab, two police officers take the case. As the investigation deepens, it uncovers hidden secrets, broken relationships, and emotional scars buried deep inside a quiet town.',
    whyWatch: 'Kohrra is more than a murder mystery. It explores grief, family, identity, and human relationships with remarkable depth while maintaining suffocating suspense throughout its six episodes. Suvinder Vicky delivers a powerhouse performance.',
    shouldYouWatch: 'YES. Essential viewing for fans of Paatal Lok, Delhi Crime, and Broadchurch.',
    bestFor: ['🌫️ Foggy Punjab Noir', '🧠 Deep Character Mystery', '🚔 Masterclass Police Drama', '🍿 Binge in One Sitting'],
    afterCreditsEmotion: 'Speechless',
    emotionalLines: [
      'Every family hides something.',
      'Truth changes everything.',
      'Slow burn. Big payoff.',
      'Emotion meets mystery.',
      'A modern masterpiece.'
    ],
    bestScenes: [
      'Punjab countryside fog-covered crime scene opening',
      'Suvinder Vicky\'s emotional daughter confrontation',
      'Atmospheric night-time highway investigation'
    ],
    moodTags: ['😱 Thriller', '🌧️ Dark & Atmospheric', '❤️ Meaningful'],
    genres: ['Police Procedural', 'Crime Mystery', 'Nordic-Style Noir'],
    musicVibe: 'Dark ambient piano, slow suspense strings, moody electronic score',
    coverImage: 'https://i.pinimg.com/736x/d4/6c/fb/d46cfbcbe6dd7fc57a2f25e52121c77e.jpg',
    images: ['https://image.tmdb.org/t/p/original/7QxPshSsUFh91Q7OoTjtBFGXrAn.jpg',
      "https://image.tmdb.org/t/p/original/zWgPHnCleKiKRRRCfuS7fZYf1DD.jpg",
      "https://image.tmdb.org/t/p/original/iporKoqhaNNOBAISEULSLL7Kd2T.jpg",
      "https://image.tmdb.org/t/p/original/9hHM8E4fh4OcvVWkkiWXJ3VKsnn.jpg"
    ],
    trailerYoutubeId: "sAx4aq6396E?si",
    featured: true
  },
  {
    id: 'day-71-gullak',
    day: 71,
    type: 'series',
    title: 'Gullak',
    year: 2019,
    episodes: 20,
    language: 'Hindi',
    tagline: 'HOME ISN\'T A PLACE. IT\'S THESE MOMENTS.',
    hook: 'This isn\'t a series... it\'s every Indian family\'s story.',
    imdbRating: 9.1,
    cast: ['Jameel Khan', 'Geetanjali Kulkarni', 'Vaibhav Raj Gupta', 'Harsh Mayar'],
    director: 'Shreyansh Pandey',
    availableOn: {
      name: 'Sony LIV',
      url: 'https://www.sonyliv.com'
    },
    storySummary: 'Set in a quiet North Indian town, Gullak collects charming, hilarious, and deeply relatable anecdotes from the everyday life of the middle-class Mishra family — Santosh, Shanti, Annu, and Aman.',
    whyWatch: 'Gullak proves that extraordinary storytelling can come from ordinary lives. Instead of relying on suspense or action, it celebrates everyday middle-class experiences with humor, warmth, nostalgia, and absolute authenticity.',
    shouldYouWatch: 'YES. Pure comfort television that will make you laugh, smile, and call your parents.',
    bestFor: ['🏠 Pure Middle-Class Comfort', '😊 Heartwarming Humor', '👨‍👩‍👧‍👦 Relatable Family Bonds', '🏆 9.1 IMDb Masterpiece'],
    afterCreditsEmotion: 'Happy',
    emotionalLines: [
      'Home isn\'t a place.',
      'Middle-class memories last forever.',
      'Simple stories hit the hardest.',
      'You\'ll call your parents after watching this.',
      'Pure comfort television.'
    ],
    bestScenes: [
      'Shanti Mishra\'s hilarious morning kitchen banter',
      'Annu & Aman\'s iconic sibling arguments',
      'Santosh Mishra\'s rooftop tea life advice'
    ],
    moodTags: ['😊 Feel Good', '❤️ Meaningful'],
    genres: ['Family Comedy-Drama', 'Slice of Life', 'Comfort TV'],
    musicVibe: 'Soft acoustic guitar, gentle piano, warm lo-fi instrumental',
    coverImage: 'https://m.media-amazon.com/images/M/MV5BZDI2NDVhNmQtZmI0Ny00N2FiLWFkYjEtZTQ3MzE3MjM4NWVmXkEyXkFqcGc@._V1_.jpg',
    images: ['https://image.tmdb.org/t/p/original/oq8QSku6Ahd3pO6Evpk3xVBvFcA.jpg',
      "https://image.tmdb.org/t/p/original/hKcLeoDVRxu6kvQscrk5M9shdtL.jpg",
      "https://image.tmdb.org/t/p/original/eZBMBfhZxsD23EiC6sS47cWwCKF.jpg",
      "https://image.tmdb.org/t/p/original/bH7iebF6l7iN6AOvmVj8YuM4QDF.jpg"
    ],
    trailerYoutubeId: "cs4rnylG7Fc?si",
    featured: true
  },
  {
    id: 'day-72-yeh-meri-family',
    day: 72,
    type: 'series',
    title: 'Yeh Meri Family',
    year: 2018,
    episodes: 19,
    language: 'Hindi',
    tagline: 'WHEN LIFE WAS BEAUTIFULLY SIMPLE.',
    hook: 'Every \'90s kid needs to watch this.',
    imdbRating: 9.0,
    cast: ['Mona Singh', 'Akarsh Khurana', 'Vishesh Bansal', 'Ruhi Khan'],
    director: 'Sameer Saxena',
    availableOn: {
      name: 'Amazon MX Player',
      url: 'https://www.mxplayer.in'
    },
    storySummary: 'Set in the summer of 1998, 12-year-old Harshu navigates summer vacations, cricket matches, school exams, sibling fights, and family dinners in Jaipur during a simpler era before smartphones and social media.',
    whyWatch: 'Yeh Meri Family is a magical time machine back to 1990s India. With relatable family dynamics, heartfelt performances, and authentic nostalgia, it brings back the innocence of childhood.',
    shouldYouWatch: 'YES. Perfect for anyone who grew up in 90s India or loves Panchayat and Gullak.',
    bestFor: ['📻 90s Nostalgia', '☀️ Summer Vacation Vibes', '🎮 Pre-Smartphone Memories', '❤️ Heartwarming Family'],
    afterCreditsEmotion: 'Inspired',
    emotionalLines: [
      'Childhood was different.',
      'Life was beautifully simple.',
      'Memories never fade.',
      'Pure nostalgia.',
      'A comfort series you\'ll never forget.'
    ],
    bestScenes: [
      'Harshu\'s 90s summer cricket & Phantom comic book routine',
      'Mona Singh\'s strict but loving mother dialogues',
      'Family gathering around the CRT television set'
    ],
    moodTags: ['😊 Feel Good', '❤️ Meaningful'],
    genres: ['Nostalgic Family Drama', 'Coming of Age', '90s Period Comedy'],
    musicVibe: 'Nostalgic piano, soft acoustic guitar, 90s-style instrumental',
    coverImage: 'https://image.tmdb.org/t/p/original/2nXFBkT7smUCTjbVmFhnZ8j6YAZ.jpg',
    images: ['https://image.tmdb.org/t/p/original/iKIfIOPdD0pZsR2KbvTpv4kgsnT.jpg',
      "https://m.media-amazon.com/images/M/MV5BMDljMGQ4NDctNjRmMC00YmY1LTk1MzMtMTdhM2U4NjQwZTljXkEyXkFqcGc@._V1_.jpg",
      "https://m.media-amazon.com/images/M/MV5BMjA1MzdmYzMtMzYxOC00MjQ2LTgxMzYtNzU0NTdjMTFkNjI5XkEyXkFqcGc@._V1_QL75_UX515_.jpg",
      "https://images.mubicdn.net/images/film/363677/cache-835203-1745500712/image-w1280.jpg?size=800x"
    ],
    trailerYoutubeId: "-8RHxGQy7H8?si",
    featured: true
  },
  {
    id: 'day-73-paatal-lok',
    day: 73,
    type: 'series',
    title: 'Paatal Lok',
    year: 2020,
    episodes: 17,
    language: 'Hindi',
    tagline: 'EVERY TRUTH HAS A DARK SIDE.',
    hook: 'India\'s greatest crime thriller?',
    imdbRating: 8.7,
    cast: ['Jaideep Ahlawat', 'Neeraj Kabi', 'Abhishek Banerjee', 'Gul Panag'],
    director: 'Sudip Sharma',
    availableOn: {
      name: 'Prime Video',
      url: 'https://www.primevideo.com'
    },
    storySummary: 'Down-and-out Delhi police inspector Hathiram Chaudhary is assigned a high-profile assassination attempt case. As he digs deeper, he gets dragged into the dark underworld of crime, political corruption, and human brutality.',
    whyWatch: 'Paatal Lok is widely considered one of the finest Indian crime thrillers ever created. Jaideep Ahlawat delivers a career-defining performance in a brilliantly written, layered, and uncompromising exploration of society.',
    shouldYouWatch: 'YES. Mandatory viewing for lovers of Mindhunter, Sacred Games, Delhi Crime, and Kohrra.',
    bestFor: ['🚔 Masterclass Police Investigation', '🕶️ Dark & Gritty Crime', '🎭 Jaideep Ahlawat Masterclass', '🍿 Non-Stop Binge Thriller'],
    afterCreditsEmotion: 'Speechless',
    emotionalLines: [
      'Truth is never simple.',
      'Every character matters.',
      'Dark. Real. Addictive.',
      'One case changes everything.',
      'A modern masterpiece.'
    ],
    bestScenes: [
      'Hathiram\'s police station interrogation sequences',
      'Tyagi\'s harrowing backstory & dog sanctuary climax',
      'Rainy Delhi night highway chase'
    ],
    moodTags: ['😱 Thriller', '🤯 Mind-Blowing', '🌧️ Dark & Atmospheric'],
    genres: ['Neo-Noir Crime Thriller', 'Investigative Drama', 'Indian Series Masterpiece'],
    musicVibe: 'Dark ambient synth, slow orchestral strings, suspenseful cinematic bass',
    coverImage: 'https://image.tmdb.org/t/p/original/qL8f1E0W42CFHG8NtpyJFMPeKnw.jpg',
    images: ['https://image.tmdb.org/t/p/original/lgbMRcbGAbLr6LxF4wi514TpFpj.jpg',
      "https://image.tmdb.org/t/p/original/oJ5o8ZX5Le8HXNiFHLRJfckucVZ.jpg",
      "https://image.tmdb.org/t/p/original/1PHyqpKetwd35Mgv3G6dF4AMal4.jpg",
      "https://image.tmdb.org/t/p/original/gAjmPKpKSdXA9FCKALIIKoCzLLV.jpg"
    ],
    trailerYoutubeId: 'cNwWMW4mxO8?si',
    featured: true
  },
  {
    id: 'day-74-delhi-crime',
    day: 74,
    type: 'series',
    title: 'Delhi Crime',
    year: 2019,
    episodes: 12,
    language: 'Hindi',
    tagline: 'WHEN EVERY SECOND MATTERS.',
    hook: 'The crime series that won an International Emmy.',
    imdbRating: 8.5,
    cast: ['Shefali Shah', 'Rasika Dugal', 'Rajesh Tailang', 'Adil Hussain'],
    director: 'Richie Mehta',
    availableOn: {
      name: 'Netflix',
      url: 'https://www.netflix.com'
    },
    storySummary: 'Following a horrific crime that shocked an entire nation, DCP Vartika Chaturvedi leads a dedicated team of Delhi police officers in a race against time to track down and arrest all perpetrators within five days.',
    whyWatch: 'The first Indian series to win an International Emmy for Best Drama. Richie Mehta delivers documentary-like realism and restrained, deeply respectful storytelling anchored by Shefali Shah\'s monumental performance.',
    shouldYouWatch: 'YES. World-class, uncompromising true crime investigation drama.',
    bestFor: ['🏆 International Emmy Winner', '⚖️ Authentic True Crime Realism', '🎭 Shefali Shah Performance', '⏱️ Race Against Time'],
    afterCreditsEmotion: 'Speechless',
    emotionalLines: [
      'Justice never sleeps.',
      'Every second matters.',
      'Real heroes wear uniforms.',
      'Powerful and unforgettable.',
      'A masterpiece inspired by reality.'
    ],
    bestScenes: [
      'DCP Vartika\'s war-room strategy midnight assembly',
      'Bus terminal CCTV tracking & suspect capture',
      'Team interrogation & court evidence preparation'
    ],
    moodTags: ['😱 Thriller', '❤️ Meaningful'],
    genres: ['True Crime Procedural', 'Police Drama', 'Emmy Winner'],
    musicVibe: 'Slow orchestral strings, dark ambient synth, emotional piano',
    coverImage: 'https://image.tmdb.org/t/p/original/xkpkTj6KGsjSaet0VQaq0aTn31D.jpg',
    images: ['https://image.tmdb.org/t/p/original/aDngBnD6tThTNVh19wMPz6WoRvb.jpg',
      "https://image.tmdb.org/t/p/original/lBJsWZw6Q5ejXCwGDTpVKQSt1O8.jpg",
      "https://image.tmdb.org/t/p/original/awN04lP2JGxxpWPnnLxA6q7VMaY.jpg",
      "https://image.tmdb.org/t/p/original/voGhzCXUWZ5CVQdhgBhFnDoicGP.jpg"
    ],
    trailerYoutubeId: 'jNuKwlKJx2E?si',
    featured: true
  },
  {
    id: 'day-75-aspirants',
    day: 75,
    type: 'series',
    title: 'Aspirants',
    year: 2021,
    episodes: 5,
    language: 'Hindi',
    tagline: 'ONE DREAM. FIVE FRIENDS.',
    hook: 'This series isn\'t about UPSC. It\'s about life.',
    imdbRating: 9.2,
    cast: ['Naveen Kasturia', 'Shivankit Singh Parihar', 'Abhilash Sharma', 'Namita Dubey', 'Sunny Hinduja'],
    director: 'Apoorv Singh Karki',
    availableOn: {
      name: 'Amazon MX Player',
      url: 'https://www.mxplayer.in'
    },
    storySummary: 'Set in Delhi\'s Old Rajinder Nagar, three close friends navigate the intense pressure, failure, sacrifices, and personal compromises of preparing for the UPSC civil services examination.',
    whyWatch: 'Aspirants works because it goes far beyond competitive exams. It captures the friendships, sacrifices, and emotional toll of chasing a goal. Sunny Hinduja\'s portrayal of Sandeep Bhaiya became a cultural phenomenon.',
    shouldYouWatch: 'YES. Must-watch for anyone who has ever chased a dream or loved Kota Factory and Gullak.',
    bestFor: ['🎓 Sandeep Bhaiya Lessons', '📚 Ambition & Sacrifice', '🤝 Life-Long Friendship', '🏆 9.2 IMDb Fan Favorite'],
    afterCreditsEmotion: 'Inspired',
    emotionalLines: [
      'Dreams change people.',
      'Success has a price.',
      'Friendship survives everything... almost.',
      'Failure isn\'t the end.',
      'Some journeys matter more than the destination.'
    ],
    bestScenes: [
      'Sandeep Bhaiya\'s iconic chai tapri advice monologues',
      'Old Rajinder Nagar late-night library study sequence',
      'Abhilash & Guri emotional reunion climax'
    ],
    moodTags: ['😢 Emotional', '❤️ Meaningful', '😊 Feel Good'],
    genres: ['Coming of Age', 'Friendship Drama', 'Student Life'],
    musicVibe: 'Emotional piano, soft acoustic guitar, nostalgic instrumental, slow motivational build',
    coverImage: 'https://image.tmdb.org/t/p/original/lG8wK40jH4EX6dbVFI1fzw2E96N.jpg',
    images: ['https://image.tmdb.org/t/p/original/1g3856hsrYrSp6gWQMUpwqDw8Nb.jpg',
      "https://image.tmdb.org/t/p/original/wfadKLXcmVMX50GnogPmg6wYOC5.jpg",
      "https://vakaao.com//news_/image/914_500_thumbnail_1620988937.Screenshot%20(157).png",
      "https://www.bollywoodhungama.com/wp-content/uploads/2023/11/Naveen-Feature.jpg"
    ],
    trailerYoutubeId: 'ViOutJ0kuJY?si',
    featured: true
  }
];

export const MOODS = [
  { id: 'feel-good', label: '😊 Feel Good', description: 'Uplifting stories to brighten your day' },
  { id: 'emotional', label: '😢 Emotional', description: 'Deep human stories that reach your heart' },
  { id: 'mind-blowing', label: '🤯 Mind-Blowing', description: 'Twists and concepts you will think about for days' },
  { id: 'thriller', label: '😱 Edge of My Seat', description: 'High-stakes suspense that won\'t let you look away' },
  { id: 'meaningful', label: '❤️ Meaningful', description: 'Quiet masterpieces about life, love, and growth' },
  { id: 'rainy-evening', label: '🌧 Rainy Evening', description: 'Cozy, atmospheric, dark slow-burn stories' }
];

export const DURATION_OPTIONS = [
  { id: 'short', label: '⚡ Under 90 Min', value: 90 },
  { id: 'standard', label: '🎬 Standard Feature (90 - 120 Min)', value: 120 },
  { id: 'epic', label: '🍿 Epic Film (2+ Hours)', value: 180 },
  { id: 'binge', label: '📺 Web Series Binge', value: 999 }
];

export const LANGUAGE_OPTIONS = [
  { id: 'all', label: '🌐 All Languages' },
  { id: 'hindi', label: '🇮🇳 Hindi' },
  { id: 'assamese', label: '🌲 Assamese' },
  { id: 'punjabi', label: '🌾 Punjabi' },
  { id: 'malayalam', label: '🌴 Malayalam' },
  { id: 'tamil', label: '🎭 Tamil' }
];

export const AFTER_CREDITS_EMOTIONS = [
  { id: 'speechless', label: '😶 Speechless & Stunned' },
  { id: 'inspired', label: '✨ Inspired & Hopeful' },
  { id: 'heartbroken', label: '💧 Deeply Moved / Emotional' },
  { id: 'happy', label: '😊 Smiling & Refreshed' },
  { id: 'confused', label: '🧠 Questioning Everything' }
];

export const COLLECTIONS = [
  {
    id: 'rainy-night-stories',
    title: '🌧 Rainy Night Stories',
    description: 'Cozy, atmospheric slow-burns best experienced when the rain is falling outside.',
    count: 24,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'hidden-indian-gems',
    title: '🇮🇳 Hidden Indian Gems',
    description: 'Under-appreciated indie & regional masterpieces that deserved far more spotlight.',
    count: 29,
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'mind-bending-thrillers',
    title: '🤯 Edge-of-Seat Thrillers',
    description: 'Intense, unpredictable psychological thrillers & crime mysteries that keep you guessing.',
    count: 46,
    image: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'epic-sagas-rivalries',
    title: '🏆 Masterclass Sagas & Rivalries',
    description: 'High-stakes character clashes, generational feuds, and unforgettable cinematic sagas.',
    count: 26,
    image: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'inspiring-life-journeys',
    title: '✨ Inspiring Coming-of-Age Journeys',
    description: 'Uplifting, hopeful, and deeply moving stories about freedom, dreams, and self-discovery.',
    count: 26,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'philosophical-meditative',
    title: '🧘 Meditative & Philosophical Masterpieces',
    description: 'Deep, thought-provoking cinema that quietly shifts how you see the world.',
    count: 13,
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'series-better-than-movies',
    title: '📺 Web Series Worth Binging',
    description: 'High-rated, gripping multi-episode crime and family sagas you can finish in a weekend.',
    count: 7,
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1000&auto=format&fit=crop'
  }
];

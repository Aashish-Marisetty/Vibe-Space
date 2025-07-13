export interface RecommendationInput {
  mood: { label: string; emoji: string; id: string } | null;
  weather: { main: string; description: string } | null;
}

export interface RecommendationResult {
  music: { title: string; artist: string; playlistUrl: string };
  movies: { title: string; posterUrl: string; infoUrl: string }[];
  summary: string;
}

// Comprehensive mood-specific recommendations
const moodRecommendations = {
  happy: {
    music: {
      title: 'Sunny Day Pop',
      artist: 'Various Artists',
      playlistUrl: 'https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC',
    },
    movies: [
      {
      title: 'La La Land',
      posterUrl: 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
        infoUrl: 'https://www.primevideo.com/detail/La-La-Land/0GQK5UKAMEDC0TSWTLFVZI1Z3Z',
      },
      {
        title: 'The Pursuit of Happyness',
        posterUrl: 'https://media.licdn.com/dms/image/v2/C5112AQFD8LgjHQ7y4g/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1546804678262?e=2147483647&v=beta&t=vOf0C-J7xj-IyaBzp9xCmUxcHkt28v7Sh9Y3yIXfTnk',
        infoUrl: 'https://www.primevideo.com/detail/The-Pursuit-Of-Happyness/0MAS1JGUIGVIGN45LHIEP8B6BS',
      },
      {
        title: 'Happy Days',
        posterUrl: 'https://enhttps://m.media-amazon.com/images/M/MV5BNzUzMmM1YWQtZGEyNi00M2RjLTg2MzYtYTBlNjM2NzYwNzBmXkEyXkFqcGc@._V1_.jpg',
        infoUrl: 'https://www.primevideo.com/dp/amzn1.dv.gti.36b5eeea-2cb9-e047-3bdc-6c5cbdb5b3ba?autoplay=0&ref_=atv_cf_strg_wb',
      },
      {
        title: 'Seethamma Vakitlo Sirimalle Chettu',
        posterUrl: 'https://i.scdn.co/image/ab67616d0000b273e32653e779b5835374ae4a7a',
        infoUrl: 'https://www.primevideo.com/dp/amzn1.dv.gti.a2b62373-fe71-0394-e3aa-1be6c0e287df?autoplay=0&ref_=atv_cf_strg_wb',
      },
      {
        title: 'Zindagi Na Milegi Dobara',
        posterUrl: 'https://play-lh.googleusercontent.com/eRADLEcSq_AWAeq44TbU_EOe6AvsEKWxeTaW6yGaubJ1rXAhSHlBL-5xVRXnvdN8qzc',
        infoUrl: 'https://www.primevideo.com/dp/amzn1.dv.gti.afe5f678-f964-4cdf-8811-cb0b11e73353?autoplay=0&ref_=atv_cf_strg_wb',
      },
      {
        title: 'Kuch Kuch Hota Hai',
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BMmQ0ZjliZTgtMjQ3NC00N2NiLTkxNjktY2VkOTQ2N2QyODNkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
        infoUrl: 'https://www.primevideo.com/dp/amzn1.dv.gti.dcabea31-af61-3949-90da-73c4230a88c2?autoplay=0&ref_=atv_cf_strg_wb',
      },
    ],
    summary: "Perfect for your happy mood! Upbeat music and feel-good movies to keep the positive vibes flowing.",
  },
  sad: {
    music: {
      title: 'Melancholy Melodies',
      artist: 'Various Artists',
      playlistUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX3YSRoSdA634',
    },
    movies: [
      {
      title: 'The Perks of Being a Wallflower',
      posterUrl: 'https://i.scdn.co/image/ab67616d0000b27388997a22f2bc210ac6ad494e',
        infoUrl: 'https://www.primevideo.com/dp/amzn1.dv.gti.fd587933-7f20-4ecf-b3e3-0ddf57d4d968?autoplay=0&ref_=atv_cf_strg_wb',
      },
      {
        title: ' Lady Bird',
        posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePELRBxVM8k1LUOQHi9ZjoMEEVS-7utkWEw&s',
        infoUrl: 'https://www.hotstar.com/in/movies/lady-bird/1971000521?utm_source=gwa',
      },
      {
        title: ' Dear Comrade',
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BOGQ3MzA3ODItYjMyNy00YTMyLWI2OGYtMjE2M2JlNTdhOTEzXkEyXkFqcGc@._V1_.jpg',
        infoUrl: 'https://www.primevideo.com/dp/amzn1.dv.gti.79e9721e-c7a3-40b5-9eeb-5f8b84ef4ea1?autoplay=0&ref_=atv_cf_strg_wb',
      },
      {
        title: ' Hi Nanna',
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d7/Hi_Nanna_poster.jpg',
        infoUrl: 'https://www.netflix.com/in/title/81753407?source=35&fromWatch=true',
      },
      {
        title: ' Fanaa ',
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/4/49/Fanaa_2006_poster.jpg',
        infoUrl: 'https://www.primevideo.com/dp/amzn1.dv.gti.bcabf1f7-5275-5b2f-56b0-d8495cf93392?autoplay=0&ref_=atv_cf_strg_wb',
      },
      {
        title: ' Rockstar',
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BOTc3NzAxMjg4M15BMl5BanBnXkFtZTcwMDc2ODQwNw@@._V1_.jpg',
        infoUrl: 'https://www.zee5.com/movies/details/rockstar/0-0-105985',
      },

    ],
    summary: "Gentle, introspective content to help you process your feelings and find comfort.",
  },
  relaxed: {
    music: {
      title: 'Chill Vibes',
      artist: 'Various Artists',
      playlistUrl: 'https://open.spotify.com/playlist/37i9dQZF1DWXe9gFZP0gtP',
    },
    movies: [
      {
        title: ' Lost in Translation',
      posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHjHFH5ebRrk7sKY8Ao9jLBOMVK7DHU7k-zCfwab_0PrjO_pqZqnKCD9jYUd4TCPUOAidV',
        infoUrl: 'https://www.primevideo.com/detail/Lost-in-Translation/0KABCI41NIHS9E0M0B1AGLZ99M',
      },
      {
        title: ' manam ',
        posterUrl: 'https://cinemachaat.com/wp-content/uploads/2014/05/manam-poster.jpeg',
        infoUrl: 'https://www.sunnxt.com/telugu-movie-manam-2014/detail/7597',
      },
      {
        title: 'Sammohanam',
        posterUrl: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/sammohanam-et00071484-23-02-2018-02-18-29.jpg',
        infoUrl: 'http://primevideo.com/detail/Sammohanam/0M6LS380TETACOS2ON550UFJQ7',
      },
      {
        title: 'Dil Chahta Hai',
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/d/db/Dil_Chahta_Hai.jpg',
        infoUrl: 'https://tv.apple.com/in/movie/dil-chahta-hai/umc.cmc.5pgjrtlnp11lj48lvwdeoxhuf?action=play',
      },
      {
        title: 'Queen',
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/4/45/QueenMoviePoster7thMarch.jpg',
        infoUrl: 'https://tv.apple.com/in/movie/queen/umc.cmc.6llfe33ltrg6mczd2u7k5eakd?action=play',
      },
    ],
    summary: "Soothing, laid-back content to help you unwind and find your inner peace.",
  },
  excited: {
    music: {
      title: 'High Energy',
      artist: 'Various Artists',
      playlistUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP',
    },
    movies: [
      {
      title: 'Baby Driver',
      posterUrl: 'https://image.tmdb.org/t/p/w500/dN9LbVNNZFITwfaRjl4tmwGWkRg.jpg',
        infoUrl: 'https://www.google.com/search?q=baby+driver&sca_esv=e196826cd928195a&sxsrf=AE3TifNUP8HtVvTclRt1g_m6K7zDkys4Uw%3A1751756724510&ei=tK9paNj_HoLhseMPjcr24AU&gs_ssp=eJzj4tVP1zc0TDZJMjM3MzMyYPTiTkpMqlRIKcosSy0CAGkzCBM&oq=baby+driver&gs_lp=Egxnd3Mtd2l6LXNlcnAiC2JhYnkgZHJpdmVyKgIIADIIEC4YgAQYsQMyBRAAGIAEMggQLhiABBixAzIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyKRAuGIAEGLEDGJcFGNwEGN4EGOAEGPQDGPEDGPUDGPYDGPcDGPgD2AEBSIU0UP0LWJMhcAN4AZABAJgBhgKgAcgQqgEFMC44LjO4AQHIAQD4AQGYAg-gAo8kwgIKEAAYsAMY1gQYR8ICDRAAGIAEGLADGEMYigXCAg4QABiwAxjkAhjWBNgBAcICExAuGIAEGLADGEMYyAMYigXYAQHCAg0QIxiABBgnGMkCGIoFwgIKECMYgAQYJxiKBcICChAuGIAEGEMYigXCAg0QLhiABBhDGNQCGIoFwgILEAAYgAQYsQMYgwHCAgoQABiABBhDGIoFwgIEECMYJ8ICEBAuGIAEGLEDGBQY1AIYhwLCAg0QLhiABBixAxhDGIoFwgIQEC4YgAQYsQMYQxjUAhiKBcICCxAuGIAEGLEDGIoFwgIIEAAYgAQYsQPCAgUQLhiABMICKxAuGIAEGLEDGBQY1AIYhwIYlwUY3AQY3gQY4AQY9AMY8QMY9QMY9gMY9wPYAQHCAg0QLhiABBixAxgUGIcCwgIuEC4YgAQYsQMYQxiKBRiXBRjcBBjeBBjgBBj0AxjxAxj1Axj2Axj3Axj4A9gBAcICBBAAGAPCAikQLhiABBixAxiXBRjcBBjeBBjgBBj0AxjxAxj1Axj2Axj3Axj4A9gBAcICChAAGIAEGBQYhwKYAwCIBgGQBhO6BgYIARABGAmSBwczLjUuNi44LTGgB_qlArIHBTAuNS42uAeKEcIHBjItMTEuNMgHYg&sclient=gws-wiz-serp',
      },
      {
        title: 'Baahubali: The Beginning',
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BM2YxZThhZmEtYzM0Yi00OWYxLWI4NGYtM2Y2ZDNmOGE0ZWQzXkEyXkFqcGc@._V1_.jpg',
        infoUrl: 'https://www.hotstar.com/in/movies/baahubali-the-beginning/1000074338/watch',
      },
      {
        title: 'Pushpa',
        posterUrl: 'https://www.koimoi.com/wp-content/new-galleries/2022/01/pushpa-to-cross-250-crore-mark-today-001.jpg',
        infoUrl: 'https://www.mxplayer.in/movie/watch-pushpa-the-rise-hindi-movie-online-c2dc7967b20d067c12227043915c9f84?watch=true&utm_source=google_web&utm_medium=watchaction',
      },
      {
        title: 'Chak De! India',
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjYyOTdmYTYtYjQ4Ni00ZmFiLWJlZjYtZmJkNDI5MmNlNjMyXkEyXkFqcGc@._V1_.jpg',
        infoUrl: 'https://www.primevideo.com/detail/Chak-De-India/0ST8IWCMUO5NMQM3413WKVMWQS',
      },
      {
        title: 'Udaan',
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/7/71/Udaan_Movie_Poster.jpg',
        infoUrl: 'https://www.youtube.com/watch?v=cA-3VL7lSCQ',
      },
    ],
    summary: "High-octane entertainment to match your excitement and keep the energy flowing!",
  },
  anxious: {
    music: {
      title: 'Calm & Soothing',
      artist: 'Various Artists',
      playlistUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6',
    },
    movies: [
      {
        title: 'the secret life of walter mitty',
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BODYwNDYxNDk1Nl5BMl5BanBnXkFtZTgwOTAwMTk2MDE@._V1_.jpg',
        infoUrl: 'https://www.primevideo.com/detail/The-Secret-Life-of-Walter-Mitty/0HOJDZS6BE7QKBMLF6VHTJUBEO',
      },
      {
        title: 'About Time',
        posterUrl: 'https://resizing.flixster.com/dCcgpiA7K_qJkMjvY-Pmv7r4lhI=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p9564054_v_v13_ax.jpg ',
        infoUrl: 'https://www.primevideo.com/detail/About-Time/0KEKSSZG48Q1P3TH9AQ4LB6C6G ',
      },
      {
        title: 'Nenokkadine',
        posterUrl: ' https://preview.redd.it/is-1-nenokkadine-over-appreciated-v0-lo2wvxd2cf5e1.png?auto=webp&s=f881b961616c0fa2c79ac0a193a9622580404c26',
        infoUrl: ' https://www.primevideo.com/detail/1-Nenokkadine/0H7I9RAO536X7WU803CVRJ7BX8',
      },
      {
        title: ' Bhale Bhale Magadivoy',
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BMGIxYjgwODYtNjNlZi00ZTkwLWExY2UtZWE0MTEzMDkwYTNhXkEyXkFqcGc@._V1_.jpg ',
        infoUrl: ' https://www.hotstar.com/in/movies/bhale-bhale-magadivoy/1000082953',
      },
      {
        title: 'chhichhore',
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjFkYThiNDMtMmFhYS00ZjQ5LWJjZjMtZmQ3ODAxYmIwM2RlXkEyXkFqcGc@._V1_.jpg',
        infoUrl: 'https://www.hotstar.com/in/movies/chhichhore/1260012713',
      },
      {
        title: 'THREE IDIOTS',
        posterUrl: 'https://play-lh.googleusercontent.com/2plinRZ5j5LJ9fLBKbY8LRSmUjcHoJHQGnJtviRlhO9WF7T9eYfzMbPoGKydzKcnVZCI4Z8LXzxUV4Q10pQ',
        infoUrl: 'https://www.primevideo.com/dp/amzn1.dv.gti.3ab5ef58-05e2-9566-9c5a-e2d491536133?autoplay=0&ref_=atv_cf_strg_wb',
      },
    ],
    summary: "Gentle, calming content to help ease your anxiety and bring you back to center.",
  },
  focused: {
    music: {
      title: 'Deep Focus',
      artist: 'Various Artists',
      playlistUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX8NTLI2TtZa6',
    },
    movies: [
      {
      title: 'The Social Network',
        posterUrl: 'https://s3.amazonaws.com/nightjarprod/content/uploads/sites/192/2024/02/23130935/n0ybibhJtQ5icDqTp8eRytcIHJx-scaled.jpg',
        infoUrl: 'https://www.primevideo.com/detail/The-Social-Network/0QBPFNFDJ4S91K7C26NVMEKUNR',
      },
      {
        title: 'The Founder',
        posterUrl: 'https://play-lh.googleusercontent.com/RTiU48olXMDkpVZ7uOtuMuHOhQ1UMwAWWMmok7yynVBxzYjGb1CsggaG6VkXJDB75F9JUQ',
        infoUrl: 'https://www.primevideo.com/detail/The-Founder/0NPEH07CRQ0QWOG2UES6LB9TGE',
      },
      {
        title: 'Jersey',
        posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX0DAxwCt0-sHK8o1TBUZFwXYUxTANtecl1A&s',
        infoUrl: 'https://www.primevideo.com/detail/Jersey/0N52IQ49I9LW3J99KD817Y79AK',
      },
      {
        title: 'Chitralahari',
        posterUrl: 'https://timesofindia.indiatimes.com/photo/67525053.cms',
        infoUrl: 'https://www.primevideo.com/detail/Chitralahari/0N4PKX77456O7ZL9LSGFXWX37V',
      },
      {
        title: 'Chandu Champion',
        posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh0Gl0PSNDd32Dda9WbSDxGCksIpVRCwSRyQ&s',
        infoUrl: 'https://www.primevideo.com/detail/Chandu-Champion/0MARCAWG5VJK4GIDNLXR1CR0ON',
      },
      {
        title: 'Mary Kom',
        posterUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhpH4ReY6zb_xtSdCruy4DZgPobgRzrRiok0VZ7DvlO8o6piznl_rIzvXm-7afx0b7PVsv1Ey0I3U4qcz0CI78K5SYQRynRbMwF0rZXClewsAyn0TCWBxzuUfzeW_8fkxisIeF_UK8bZqBP/s1600/1st+Look+_mk.JPG',
        infoUrl: 'https://www.hotstar.com/in/movies/mary-kom/1971313981',
      },



    ],
    summary: "Sharp, engaging content to match your focused mindset and keep you motivated.",
  },
  nostalgic: {
    music: {
      title: 'Throwback Hits',
      artist: 'Various Artists',
      playlistUrl: 'https://open.spotify.com/playlist/37i9dQZF1DXb57FZoF2nKw',
    },
    movies: [
      {
        title: 'midnight in paris',
        posterUrl: 'https://m.media-amazon.com/images/I/A1apqaj2PhL._UF894,1000_QL80_.jpg',
        infoUrl: 'https://www.primevideo.com/detail/Midnight-In-Paris/0N90BOJU4XQ9BQLYCWMMPO48OD',
      },
      {
        title: 'American Graffiti',
        posterUrl: 'https://i.ebayimg.com/images/g/JQcAAOSw88BlPrID/s-l1200.jpg',
        infoUrl: 'https://www.primevideo.com/dp/amzn1.dv.gti.36a9f720-4a45-1a9c-942f-35e6a931fe59?autoplay=0&ref_=atv_cf_strg_wb',
      },
      {
        title: 'Oh! Baby',
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/6/66/Oh_Baby_2019_poster.jpg',
        infoUrl: 'https://www.primevideo.com/dp/amzn1.dv.gti.ccd4adf2-f6bd-47b0-9b12-4e81827bbaf7?autoplay=0&ref_=atv_cf_strg_wb',
      },
      {
        title: 'Naa Autograph',
        posterUrl: 'https://assetscdn1.paytm.com/images/cinema/Naa-Autograph-27a82770-1a9b-11f0-b2bf-d9c854ed10fa.jpg',
        infoUrl: 'https://www.primevideo.com/dp/amzn1.dv.gti.16bb32b3-29e5-ce94-2fbc-5aadffb75da8?autoplay=0&ref_=atv_cf_strg_wb',
      },
      {
        title: 'Hum Aapke Hain Koun..!',
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BNTUyNjA2OTY4NF5BMl5BanBnXkFtZTgwNDU5Njk0MDI@._V1_.jpg',
        infoUrl: 'https://www.primevideo.com/-/hi/detail/Hum-Aapke-Hain-Koun/0OWN05NLHHAXDIFOVR3DJNYX0J',
      },
      {
        title: 'Mughal-E-Azam',
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2f/Mughal-e-Azam_%28soundtrack%29.jpg',
        infoUrl: 'https://www.primevideo.com/detail/Mughal-E-Azam/0HX76ZJKPNJAMXRTQPGFHCBNSG',
      },
    ],

    summary: "Classic favorites and timeless stories to satisfy your nostalgic cravings.",
  },
  romantic: {
    music: {
      title: 'Love Songs',
      artist: 'Various Artists',
      playlistUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX50QitC6Oqtn',
    },
    movies: [
      {
        title: 'before sunrise (1995) ',
        posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzqXDX0s_d6LGvnqSrgxo1LOIWS_za6E05fQ&s',
        infoUrl: 'https://www.primevideo.com/dp/amzn1.dv.gti.92a9f74b-a7aa-845b-720b-1cfb3b8700c8?autoplay=0&ref_=atv_cf_strg_wb',
      },
      {
        title: '(500) Days of Summer',
        posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrDiX9icLddpzbGduRBasLu7uIJ1O6GcD8fA&s',
        infoUrl: 'http://primevideo.com/detail/500-Days-of-Summer/0LXZONNF6G8CSNOS2TVNJVGB4Z',
      },
      {
        title: '18 Pages',
        posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOfSXbbhxt-meTd4y9fqKzDmyxK6oqRD95Sw&s',
        infoUrl: 'https://www.netflix.com/in/title/81512222?source=35&fromWatch=true',
      },
      {
        title: 'Ye Maaya Chesave',
        posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs8N6i80nRRbWz0HMgUmMhJjaPApBo788wgQ&s',
        infoUrl: 'https://www.primevideo.com/detail/Ye-Maya-Chesave/0H7LB91N5FQX3HXILKIGZHX5X2',
      },
      {
        title: 'Raanjhanaa',
        posterUrl: 'https://m.media-amazon.com/images/S/pv-target-images/9220931fbe28a22e5aa48fcc7483a5d74a5896d4fea439d865f06c91022bc07e.jpg',
        infoUrl: 'https://www.primevideo.com/detail/Raanjhanaa/0FO7LSARHIPUR0O64HFCARZ6KG',
      },  
      {
        title: 'Sanam Teri Kasam',
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BYTJmYmI0YWQtYjI3MC00MWU4LWI2OTQtNDYyOGEyNThjZjg3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
        infoUrl: 'https://www.primevideo.com/-/hi/detail/Sanam-Teri-Kasam/0SP3EDCQPDEPO40CKD11Y1746Q',
      },


    ],
    summary: "Beautiful love stories and romantic melodies to enhance your romantic mood.",
  },
};

export function getRecommendations(input: RecommendationInput): RecommendationResult {
  // If no mood is selected, return default recommendations
  if (!input.mood) {
    return {
      music: {
        title: 'Chill Vibes',
        artist: 'Various Artists',
        playlistUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6',
      },
      movies: [
        {
        title: 'Amelie',
        posterUrl: 'https://image.tmdb.org/t/p/w500/wnUAcUrMRGPPZUDroLeZhSjLkuu.jpg',
        infoUrl: 'https://www.themoviedb.org/movie/194-amelie',
      },
      ],
      summary: 'Enjoy a relaxing playlist and a feel-good movie! Select a mood for personalized recommendations.',
    };
  }

  // Get mood-specific recommendations
  const moodRec = moodRecommendations[input.mood.id as keyof typeof moodRecommendations];
  
  if (moodRec) {
    return {
      music: moodRec.music,
      movies: moodRec.movies,
      summary: moodRec.summary,
    };
  }

  // Fallback for unknown moods
  return {
    music: {
      title: 'Mood Mix',
      artist: 'Various Artists',
      playlistUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6',
    },
    movies: [
      {
      title: 'The Grand Budapest Hotel',
      posterUrl: 'https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrO.jpg',
      infoUrl: 'https://www.themoviedb.org/movie/120467-the-grand-budapest-hotel',
    },
    ],
    summary: `Perfect content for your ${input.mood.label.toLowerCase()} mood!`,
  };
} 
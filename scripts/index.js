const bannerBox = document.querySelector('.banner-row');

const fetchParams = {
    method: 'GET',
    headers: {
      'X-API-KEY': '1be6749b-dbf1-4f49-814f-8b1bf84b0931',
      'Content-Type': 'application/json',
    },
};

const fetchFilmDetails = async (filmID) => {
    const response = await fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/' + filmID, fetchParams);
    const body = await response.json();
    return body.description;
};

const serverWorks = async () => {
    const response = await fetch(
        'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1',
        fetchParams
    );
    const body = await response.json();
    const films = body.films;

    console.log(films);

    for (const movie of films) {
        const description = await fetchFilmDetails(movie.filmId);
        bannerBox.append(addBanner(movie, description, movie.filmId));
    }
};

serverWorks();

const addBanner = (film, description, scr) => {
    const bannerElement = document.createElement('a');
    bannerElement.href = `https://www.kinopoisk.ru/film/${scr}/`;
    bannerElement.className = 'banner';
    bannerElement.append(addImg(film), addGenre(film), addMovieDetails(film, description));
    return bannerElement;
};

const addImg = (img) => {
    const imgElement = document.createElement('img');
    imgElement.src = img.posterUrlPreview;
    return imgElement;
};

const addGenre = (genre) => {
    const genreElement = document.createElement('div');
    genreElement.className = 'genre';
    genreElement.textContent = genre.genres.map(gen => `\n${gen.genre}`);
    return genreElement;
};

const addMovieDetails = (detail, description) => {
    const detailsElement = document.createElement('div');
    detailsElement.className = 'movie-details';
    detailsElement.append(addFilmYear(detail), addFilmName(detail), addFilmDescription(description));
    return detailsElement;
};

const addFilmName = (name) => {
    const nameElement = document.createElement('h3');
    nameElement.textContent = name.nameRu;
    return nameElement;
};

const addFilmYear = (year) => {
    const yearElement = document.createElement('p');
    yearElement.className = 'year';
    yearElement.textContent = year.year;
    return yearElement;
};

const addFilmDescription = (descrip) => {
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = descrip;
    return descriptionElement;
};

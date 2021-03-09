
export default function getRandomMovies(movies) {
    return movies.sort(() => Math.random() - 0.5).slice(0, 15)
}
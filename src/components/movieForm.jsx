import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

class MovieForm extends Form {
  state = {
    data: {},
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().min(1).max(50).required(),
    genreId: Joi.string().required(),
    otherTitle: Joi.string(),
    img: Joi.string().min(1).required(),
    releaseDate: Joi.string().min(5).max(50).required(),
    distributionArea: Joi.string().min(1).max(10).required(),
    director: Joi.string().required(),
    starring: Joi.string().required(),
    doubanLink: Joi.string().required(),
    plotSummary: Joi.string().required(),
    rate: Joi.number().min(0).max(10).required(),
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel({
    _id,
    title,
    genre,
    otherTitle,
    img,
    releaseDate,
    distributionArea,
    director,
    starring,
    doubanLink,
    plotSummary,
    rate,
  }) {
    return {
      _id,
      title,
      genreId: genre._id,
      otherTitle,
      img,
      releaseDate,
      distributionArea,
      director,
      starring,
      doubanLink,
      plotSummary,
      rate,
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);

    this.props.history.push("/moviesbackend");
  };

  render() {
    return (
      <div>
        <main className="container mt-5 pt-5">
          <h1>????????????</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("title", "??????")}
            {this.renderSelect("genreId", "??????", this.state.genres)}
            {this.renderInput("otherTitle", "??????")}
            {this.renderInput("img", "??????", "file", true)}
            {this.renderInput("releaseDate", "????????????")}
            {this.renderInput("distributionArea", "??????")}
            {this.renderInput("director", "??????")}
            {this.renderInput("starring", "??????")}
            {this.renderInput("doubanLink", "????????????")}
            {this.renderInput("plotSummary", "????????????")}
            {this.renderInput("rate", "??????")}
            {this.renderButton("??????")}
          </form>
        </main>
      </div>
    );
  }
}

export default MovieForm;

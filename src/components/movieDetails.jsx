import React, { Component } from "react";
import Joi from "joi-browser";
import { getMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

class MovieDetails extends Component {
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

  handleBack = () => {
    console.log(this.props.history);
    this.props.history.push("/movies");
  };

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
      genre: genre.name,
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
  render() {
    const { data: movie } = this.state;
    const {
      title,
      genre,
      director,
      otherTitle,
      img,
      releaseDate,
      distributionArea,
      starring,
      doubanLink,
      plotSummary,
      rate,
    } = movie;
    console.log(movie);
    return (
      <div>
        <main className="container mt-5 pt-5">
          <h1 className="text-center">{title}</h1>
          <div className="card text-center">
            <div className="card-header">
              导演: {director} 类型：{genre}
            </div>
            <div className="d-flex">
              <img src={img} alt="" />

              <div className="card-body">
                <h5 className="card-title text-secondary">
                  别名：{otherTitle}
                </h5>
                <p className="card-title text-secondary">
                  地区：{distributionArea}
                </p>
                <h5 className="card-title text-secondary">
                  领衔主演：{starring}
                </h5>
                <h5 className="card-text">剧情简介—— {plotSummary}</h5>
                <a
                  href={doubanLink}
                  target="_blank"
                  className="btn btn-success"
                >
                  豆瓣主页
                </a>
                <p>豆瓣评分：{rate}</p>
                <button className="btn btn-info" onClick={this.handleBack}>
                  返回
                </button>
              </div>
            </div>
            <div className="card-footer text-muted">
              {releaseDate && releaseDate.slice(0, 10)}
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default MovieDetails;

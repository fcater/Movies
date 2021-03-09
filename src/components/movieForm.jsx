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
          <h1>电影详情</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("title", "标题")}
            {this.renderSelect("genreId", "分类", this.state.genres)}
            {this.renderInput("otherTitle", "别名")}
            {this.renderInput("img", "海报", "file", true)}
            {this.renderInput("releaseDate", "上映日期")}
            {this.renderInput("distributionArea", "地区")}
            {this.renderInput("director", "导演")}
            {this.renderInput("starring", "主演")}
            {this.renderInput("doubanLink", "豆瓣连接")}
            {this.renderInput("plotSummary", "故事梗概")}
            {this.renderInput("rate", "评分")}
            {this.renderButton("保存")}
          </form>
        </main>
      </div>
    );
  }
}

export default MovieForm;

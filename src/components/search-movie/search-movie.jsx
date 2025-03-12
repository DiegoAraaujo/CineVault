import "./search-movie.css";
import TitleSection from "../title-section/title-section"
import Button from "../button/button";
import Avengers from "../../assets/vingadores-ultimato.jpg";

function searchMovie() {
  return (
    <section className="section-search-movie">
        <TitleSection title="Search for your movie"/>
        <div className="filmInfoForm">
          <div>
            <label htmlFor="film-name">Movie name: </label>
            <input type="text" id="Film-name" required placeholder="Enter the movie name"/>
          </div>
          <div>
            <label htmlFor="year-name">Release date: </label>
            <input type="number" name="" id="ear-name" required placeholder="Enter the release date"/>
          </div>
          <div>
            <Button nome="Search" />
            <Button nome="Add to List" />
          </div>
        </div>
        <div className="movie-info">
          <img src={Avengers} alt="" />
          <div className="movie-details">
            <h2>Poster name</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              consectetur odit consequatur ipsa minima, dolor ullam tempore
              maiores ad doloribus explicabo quas impedit qui enim! Suscipit
              aperiam rerum provident explicabo officiis nihil? Neque, mollitia.
              Blanditiis, ea, obcaecati voluptatum qui alias est possimus labore
              commodi dolore quo neque, quae ratione quidem.
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque
              eos cum magnam sapiente, id veniam nostrum illo. Officia, quibusdam
              nisi.
            </p>
          </div>
        </div>
  </section>
  );
}

export default searchMovie;

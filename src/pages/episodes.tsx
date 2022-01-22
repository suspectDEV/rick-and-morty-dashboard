import MainLayout from "../layout";
import styled from "styled-components";
import EpisodeList from "../components/episode/e_list";
import { Avatar, Fade, Subheader } from "../components/parallaxSubheader";

const EP = [
  {
    title: "Lawnmower Dog",
    img: "https://m.media-amazon.com/images/M/MV5BMTczOTI1ZTEtNmRjMC00NTYyLWE3NmQtZGVmY2VjM2U1ZDM3XkEyXkFqcGdeQXVyNzgxMzc3OTc@._V1_.jpg",
  },
  {
    title: "Anatomy Park",
    img: "https://m.media-amazon.com/images/M/MV5BM2I0Nzg0YTktYTc2Zi00NTk4LWI5ZDQtMmVhYjBjZmRmNGM0XkEyXkFqcGdeQXVyNjg4ODczODM@._V1_.jpg",
  },
  {
    title: "M. Night Shaym-Aliens!",
    img: "https://m.media-amazon.com/images/M/MV5BZWZmZDBjYTEtZTQyNy00NDc5LTgxMjEtZmQyNmU1N2Y1NThkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg",
  },
];

const EpisodesPage = () => (
  <MainLayout>
    <Subheader img={EP[1].img}>
      <h5>EPISODIO ALEATORIO</h5>
      <h1>{EP[1].title}</h1>
      <Avatar />
      <Fade />
    </Subheader>
    <ContentEpisodes>
      <EpisodeList />
    </ContentEpisodes>
  </MainLayout>
);

export interface HeaderProps {
  img: string;
}

const ContentEpisodes = styled.div`
  background-color: #101332;
  min-height: 70vh;
  padding: 20px;

  h2{
    color: white;
    font-size: 1.8rem;
  }
`;

export default EpisodesPage;

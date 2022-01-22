import MainLayout from "../layout";
import styled from "styled-components";
import EpisodeList from "../components/episodeList";

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
    <HeaderEpisodes img={EP[1].img}>
      <h5>EPISODIO ALEATORIO</h5>
      <h1>{EP[1].title}</h1>
      <Avatar />
      <Fade />
    </HeaderEpisodes>
    <ContentEpisodes>
      <EpisodeList />
    </ContentEpisodes>
  </MainLayout>
);

const Avatar = () => (
  <ContentAvatar>
    <img src={"https://avatars.githubusercontent.com/u/21148589?v=4"} />
    <aside>
      <small>
        <pre>Alexander Forero L.</pre>
      </small>
      <small>Ene 23, 2022</small>
    </aside>
  </ContentAvatar>
);

export interface HeaderProps {
  img: string;
}

const HeaderEpisodes = styled.div<HeaderProps>`
  ${(props) =>
    props.img &&
    `
    background: url(${props.img});
  `}
  background-size: cover;
  background-attachment: fixed;
  background-position: top;
  background-repeat: no-repeat;
  height: 55vh;
  padding-top: 18vh;
  padding-left: 20px;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background-color: #4d4d4d80;
    height: 55vh;
    width: 100%;
  }

  > * {
    color: white;
    z-index: 1;
    position: relative;
  }

  h1 {
    font-size: 7vmin;
    line-height: 7vmin;
    max-width: 60%;
  }

  h5 {
    margin: 0;
  }
`;

const Fade = styled.div`
  height: 100px;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  background: linear-gradient(transparent, #101332);
  z-index: 1;
`;

const ContentAvatar = styled.div`
  margin-top: 80px;

  img {
    max-width: 27px;
    max-height: 27px;
    border-radius: 100%;
    display: inline-block;
    margin-right: 9px;
    vertical-align: top;
  }
  aside {
    display: inline-block;
  }
  pre,
  small {
    line-height: 9px;
    padding: 0;
    margin: 0;
  }
`;

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

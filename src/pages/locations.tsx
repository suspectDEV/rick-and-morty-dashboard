import MainLayout from "../layout";
import styled from "styled-components";
import { Avatar, Subheader } from "../components/parallaxSubheader";
import LocationList from "../components/location/l_list";

const EP = [
  {
    title: "Citadel of Ricks",
    img: "https://heavy.com/wp-content/uploads/2017/09/screen-shot-2017-04-01-at-8-02-30-pm.png",
  },
];

const LocationPage = () => (
  <MainLayout>
    <Subheader img={EP[0].img}>
      <h5>LUGAR ALEATORIO</h5>
      <h1>{EP[0].title}</h1>
      <Avatar />
      <Fade />
    </Subheader>
    <ContentEpisodes>
      <LocationList />
    </ContentEpisodes>
  </MainLayout>
);

export interface HeaderProps {
  img: string;
}


const Fade = styled.div`
  height: 100px;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  background: linear-gradient(transparent, #101332);
  z-index: 1;
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

export default LocationPage;

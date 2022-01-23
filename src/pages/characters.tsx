import MainLayout from "../layout";
import styled from "styled-components";
import { Subheader, Fade, Avatar } from "../components/parallaxSubheader";
import CharacterList from "../components/character/c_list";
const BANNER = "/img/base/character.jpeg"

const CharactersPage = () => (
  <MainLayout>
    <Subheader img={BANNER}>
      <h5>PERSONAJES</h5>
      <h1>Rick and Morty</h1>
      <Avatar />
      <Fade />
    </Subheader>
    <Content>
      <CharacterList />
    </Content>
  </MainLayout>
);


const Content = styled.div`
  background-color: #101332;
  min-height: 70vh;
  padding: 20px;

  h2{
    color: white;
    font-size: 1.8rem;
  }
`;

export default CharactersPage;

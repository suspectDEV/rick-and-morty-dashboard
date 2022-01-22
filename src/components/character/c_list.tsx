import { useEffect, useState } from "react";
import styled from "styled-components";

interface Ichar {
  name: string;
  image: string;
  location: Ilocation;
}

interface Ilocation {
  name: string;
  url: string;
}

const CharacterList = () => {
  const [countCharacter, setCountCharacters] = useState<number>(0);
  const [character, setCharacters] = useState<Ichar[] | []>([]);

  useEffect(() => {
    getCharacterList().then((val) => {
      setCharacters(val.results);
      setCountCharacters(val.info.count)
    });
  }, []);

  return (
    <>
      <h2>Personajes ({countCharacter})</h2>
      <Grid>
        {character.map((character, i) => (
          <Character key={i}>
            <Image img={character.image} />
            <h4>{character.name}</h4>
            <h5>{character.location.name}</h5>
          </Character>
        ))}
      </Grid>
    </>
  );

  async function getCharacterList() {
    const response = await fetch("https://rickandmortyapi.com/api/character", {
      method: "GET",
    });
    return response.json();
  }
};

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Character = styled.div`
  margin: 15px;
  max-width: 120px;
  transition: 300ms;

  &:hover {
    transform: scale(1.2);
    cursor: pointer;
  }

  h4 {
    margin-top: 7px;
    margin-bottom: 0;
    color: white;
    max-width: 100%;
    overflow: ellipsis;
  }
  h5 {
    color: #ffffff99;
    margin: 0;
  }
`;

interface ImgProps {
  img: string;
}

const Image = styled.div<ImgProps>`
  width: 120px;
  height: 160px;
  overflow: hidden;
  ${(props) =>
    props.img &&
    `
    background-image: url(${props.img});
  `}
  background-size: cover;
  background-position: center;
  border-radius: 6px;

  img {
    width: 100%;
    min-height: 100%;
  }
`;

export default CharacterList;

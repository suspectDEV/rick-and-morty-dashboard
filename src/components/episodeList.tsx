import styled from "styled-components";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, Form, Input, DatePicker } from "antd";
import { useState } from "react";

interface epInterface {
  id?: string;
  name?: string;
  air_date?: string;
  episode?: string;
  characters?: [];
  url?: string;
  created?: string;
}

const DATA: epInterface[] = [
  {
    id: "1",
    name: "Pilot",
    air_date: "December 2, 2013",
    episode: "S01E01",
    characters: [],
    url: "https://rickandmortyapi.com/api/episode/1",
    created: "2017-11-10T12:56:33.798Z",
  },
  {
    id: "2",
    name: "Lawnmower Dog",
    air_date: "December 9, 2013",
    episode: "S01E02",
    characters: [],
    url: "https://rickandmortyapi.com/api/episode/1",
    created: "2017-11-10T12:56:33.798Z",
  },
  {
    id: "3",
    name: "Anatomy Park",
    air_date: "December 16, 2013",
    episode: "S01E03",
    characters: [],
    url: "https://rickandmortyapi.com/api/episode/1",
    created: "",
  },
  {
    id: "4",
    name: "M. Night Shaym-Aliens!",
    air_date: "January 13, 2014",
    episode: "S01E04",
    characters: [],
    url: "https://rickandmortyapi.com/api/episode/1",
    created: "",
  },
  {
    id: "5",
    name: "Meeseeks and Destroy",
    air_date: "January 20, 2014",
    episode: "S01E05",
    characters: [],
    url: "https://rickandmortyapi.com/api/episode/1",
    created: "",
  },
  {
    id: "6",
    name: "Rick Potion #9",
    air_date: "January 27, 2014",
    episode: "S01E06",
    characters: [],
    url: "https://rickandmortyapi.com/api/episode/1",
    created: "",
  },
  {
    id: "7",
    name: "Raising Gazorpazorp",
    air_date: "March 10, 2014",
    episode: "S01E07",
    characters: [],
    url: "https://rickandmortyapi.com/api/episode/1",
    created: "",
  },
  {
    id: "8",
    name: "Rixty Minutes",
    air_date: "March 17, 2014",
    episode: "S01E08",
    characters: [],
    url: "https://rickandmortyapi.com/api/episode/1",
    created: "",
  },
];

const EpisodeList = () => {
  const [editEpisode, setEditEpisode] = useState<boolean>(false);
  const [episode, setEpisode] = useState<epInterface>({});

  return (
    <>
      <h2>Episodios (20)</h2>
      <MyTable>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Episodio</th>
            <th>Lanzamiento</th>
            <th>URL</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {DATA.map((episode, index) => (
            <tr key={"episode-" + index}>
              <>
                <td>{episode.id}</td>
                <td>{episode.name}</td>
                <td>{episode.episode}</td>
                <td>{episode.air_date}</td>
                <td>{episode.url}</td>
              </>
              <td>
                <EditOutlined
                  className="edit"
                  onClick={() => {
                    setEpisode(DATA[index]);
                    setEditEpisode(!editEpisode);
                  }}
                />
                <DeleteOutlined
                  className="delete"
                  onClick={() => deleteEpisode(episode.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </MyTable>

      {/* Editar episodio */}
      <Modal
        title={`Editar episodio ${episode.id}`}
        visible={editEpisode}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Actualizar"
        cancelText="Cancelar"
      >
        <Form layout="vertical">
          <Form.Item label="Nombre del episodio" required>
            <Input placeholder="Anatomy park" value={episode.name} />
          </Form.Item>
          <Form.Item label="Episodio" required>
            <Input placeholder="S01E03" value={episode.episode} />
          </Form.Item>
          <Form.Item label="Fecha de lanzamiento" required>
            <DatePicker />
          </Form.Item>
          <Form.Item label="URL" required>
            <Input
              placeholder="https://rickandmortyapi.com/api/episode/#"
              value={episode.url}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );

  function handleOk() {}
  function handleCancel() {
    setEditEpisode(false);
  }
  function deleteEpisode(index: string | undefined) {
    Modal.error({
      title: `Episodio ${index}`,
      content: "¿Desea eliminar este episodio?",
      okText: "Eliminar",
    });
  }
};

const MyTable = styled.table`
  width: 100%;
  color: white;

  th {
    text-align: left;
    color: #ffffff66;
  }

  td,
  th {
    height: 40px;
  }

  td:first-child,
  th:first-child {
    padding-left: 10px;
  }

  tbody {
    tr {
      transition: 300ms;
      border-radius: 3px;

      &:not(:last-child) {
        border-bottom: 1px solid #e1e1e11a;
      }

      &:hover {
        background-color: white;
        color: #1890ff;
      }
      .anticon {
        cursor: pointer;
        &:last-child {
          margin-left: 10px;
        }
      }

      .edit:hover {
        color: green;
      }

      .delete:hover {
        color: red;
      }
    }
  }
  @media (max-width: 810px) {
    th:nth-child(5) {
      display: none;
    }
    td:nth-child(5) {
      display: none;
    }
  }
  @media (max-width: 575px) {
    th:nth-child(4) {
      display: none;
    }
    td:nth-child(4) {
      display: none;
    }
  }
`;

export default EpisodeList;

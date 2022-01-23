import styled from "styled-components";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, Form, Input, DatePicker, Pagination } from "antd";
import { useEffect, useState } from "react";
import { MyTable } from "../table.style";
import { API_ENDPOINT } from "../../services/contants";
import { useLocation, useNavigate } from "react-router-dom";

interface Iepisode {
  id?: string;
  name?: string;
  air_date?: string;
  episode?: string;
  characters?: [];
  url?: string;
  created?: string;
}

const EpisodeList = () => {
  let location = useLocation();
  let navigate = useNavigate();
  const [editEpisode, setEditEpisode] = useState<boolean>(false);
  const [episodeToEdit, setEpisodeToEdit] = useState<Iepisode>({});
  const [episodes, setEpisodes] = useState<Iepisode[] | []>([]);
  const [countEpisodes, setCountEpisodes] = useState(0);
  const [currentPage, setCurrentPage] = useState<string>(
    location.search !== "" ? location.search.split("=")[1] : "1"
  );

  useEffect(() => {
    getEpisodes()
      .then((val) => {
        setEpisodes(val.results);
        setCountEpisodes(val.info.count);
      })
  }, [currentPage]);

  return (
    <>
      <h2>Episodios ({countEpisodes})</h2>
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
          {episodes.map((episode, index) => (
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
                    setEpisodeToEdit(episodes[index]);
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

      <div style={{ textAlign: "center" }}>
        <Pagination
          current={parseInt(currentPage)}
          total={countEpisodes}
          pageSize={20}
          onChange={handlePageClick}
        />
      </div>

      {/* Editar episodio */}
      <Modal
        title={`Editar episodio ${episodeToEdit.id}`}
        visible={editEpisode}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Actualizar"
        cancelText="Cancelar"
      >
        <Form layout="vertical">
          <Form.Item label="Nombre del episodio" required>
            <Input placeholder="Anatomy park" value={episodeToEdit.name} />
          </Form.Item>
          <Form.Item label="Episodio" required>
            <Input placeholder="S01E03" value={episodeToEdit.episode} />
          </Form.Item>
          <Form.Item label="Fecha de lanzamiento" required>
            <DatePicker />
          </Form.Item>
          <Form.Item label="URL" required>
            <Input
              placeholder="https://rickandmortyapi.com/api/episode/#"
              value={episodeToEdit.url}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );

  async function getEpisodes() {
    var token: any = localStorage.getItem("token")!;
    const response = await fetch(
      `${API_ENDPOINT}/episode/?page=${currentPage}`,
      {
        method: "GET",
        headers: { "x-access-token": token },
      }
    );
    if(response.status == 401 || response.status == 403){navigate("/login")}
    return response.json();
  }

  function handlePageClick(pageNumber: number) {
    setCurrentPage(pageNumber + "");
    navigate("?page=" + pageNumber);
  }

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

export default EpisodeList;

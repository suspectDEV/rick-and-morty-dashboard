import { DeleteOutlined } from "@ant-design/icons";
import { Modal, Pagination } from "antd";
import { useEffect, useState } from "react";
import { ContainerPagination, MyTable } from "../table.style";
import { API_ENDPOINT } from "../../services/contants";
import { useLocation, useNavigate } from "react-router-dom";

// ..Components
import EditEpisode from "./e_edit";
import moment from "moment";

export interface Iepisode {
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
                <td>{moment(episode.air_date).format("MMM Do YY")}</td>
                <td>{episode.url}</td>
              </>
              <td>
                <EditEpisode t_episode={episodes[index]} />
                <DeleteOutlined
                  className="delete"
                  onClick={() => deleteEpisode(episode.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </MyTable>

      <ContainerPagination>
        <Pagination
          current={parseInt(currentPage)}
          total={countEpisodes}
          pageSize={20}
          onChange={handlePageClick}
        />
      </ContainerPagination>
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

  
  function deleteEpisode(index: string | undefined) {
    Modal.error({
      title: `Episodio ${index}`,
      content: "¿Desea eliminar este episodio?",
      okText: "Eliminar",
    });
  }
};

export default EpisodeList;

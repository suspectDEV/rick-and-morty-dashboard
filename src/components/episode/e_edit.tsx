import {
  ChangeEvent,
  forwardRef,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { EditOutlined } from "@ant-design/icons";
import { Modal, Form, Input, DatePicker } from "antd";
import { Iepisode } from "./e_list";
import moment from "antd/node_modules/moment";
import { API_ENDPOINT } from "../../services/contants";
import { useNavigate } from "react-router-dom";

interface IeditEpisode {
  t_episode?: Iepisode;
}

const EditEpisode = forwardRef<unknown, PropsWithChildren<IeditEpisode>>(
  ({ t_episode }, ref) => {
    const navigate = useNavigate();
    const [editEpisode, setEditEpisode] = useState<boolean>(false);
    const [episodeData, setEpisodeData] = useState<Iepisode>({});

    useEffect(() => {
      setEpisodeData({
        id: t_episode?.id,
        name: t_episode?.name,
        air_date: t_episode?.air_date,
        episode: t_episode?.episode,
        url: t_episode?.url,
      });
    }, []);

    return (
      <>
        <EditOutlined
          className="edit"
          onClick={() => {
            // setEpisodeData();
            setEditEpisode(!editEpisode);
          }}
        />
        <Modal
          title={`Editar episodio ${episodeData.id}`}
          visible={editEpisode}
          onOk={() =>
            handleRequest().then((v) => {
              if(v.code == "episodes/updated_ok"){
                navigate(0)
              }else{
                alert(v.message)
              }
            })
          }
          onCancel={handleCancel}
          okText="Actualizar"
          cancelText="Cancelar"
        >
          <Form layout="vertical">
            <Form.Item label="Nombre del episodio" required>
              <Input
                placeholder="Anatomy park"
                value={episodeData.name}
                onChange={editName}
              />
            </Form.Item>
            <Form.Item label="Episodio" required>
              <Input
                placeholder="S01E03"
                value={episodeData.episode}
                onChange={editEpisodeLbl}
              />
            </Form.Item>
            <Form.Item label="Fecha de lanzamiento" required>
              <DatePicker
                value={moment(episodeData.air_date)}
                onChange={editAirDate}
              />
            </Form.Item>
            <Form.Item label="URL" required>
              <Input
                placeholder="https://rickandmortyapi.com/api/episode/#"
                value={episodeData.url}
                onChange={editUrl}
              />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );

    async function handleRequest() {
      var token: any = localStorage.getItem("token")!;
      const response = await fetch(`${API_ENDPOINT}/episode/${episodeData.id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json', "x-access-token": token },
        body: JSON.stringify(episodeData),
      });
      return response.json();
    }
    function handleCancel() {
      setEditEpisode(false);
    }

    // ..Edit fields
    function editName(e: ChangeEvent<HTMLInputElement>) {
      setEpisodeData({ ...episodeData, name: e.target.value });
    }
    function editEpisodeLbl(e: ChangeEvent<HTMLInputElement>) {
      setEpisodeData({ ...episodeData, episode: e.target.value });
    }
    function editAirDate(e: any) {
      setEpisodeData({
        ...episodeData,
        air_date: moment(e).toISOString() ,
      });
    }
    function editUrl(e: ChangeEvent<HTMLInputElement>) {
      setEpisodeData({ ...episodeData, url: e.target.value });
    }
  }
);

export default EditEpisode;

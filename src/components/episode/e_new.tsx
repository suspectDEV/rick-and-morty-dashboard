import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Iepisode } from "./e_list";
import moment from "moment";
import { Button, DatePicker, Form, Input, Modal } from "antd";
import { VideoCameraAddOutlined } from "@ant-design/icons";
import { API_ENDPOINT } from "../../services/contants";

const NewEpisode = () => {

  const navigate = useNavigate()
  const [episodeData, setEpisodeData] = useState<Iepisode>({});
  const [modalVisible, changeModalVisible] = useState<boolean>(false);

  useEffect(()=>{
    initData()
  },[modalVisible])

  return (
    <>
      <Button type="primary" onClick={() => changeModalVisible(!modalVisible)}>
        <VideoCameraAddOutlined />
        Nuevo episodio
      </Button>
      <Modal
        title="Nuevo episodio"
        visible={modalVisible}
        onOk={() =>
          handleRequest().then((v) => {
            if(v.code == "episodes/created_ok"){
              navigate(0)
            }else{
              alert(v.message)
            }
          })
        }
        onCancel={handleCancel}
        okText="Crear"
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

  function editName(e: ChangeEvent<HTMLInputElement>) {
    setEpisodeData({ ...episodeData, name: e.target.value });
  }
  function editEpisodeLbl(e: ChangeEvent<HTMLInputElement>) {
    setEpisodeData({ ...episodeData, episode: e.target.value });
  }
  function editAirDate(e: any) {
    setEpisodeData({
      ...episodeData,
      air_date: e.format("YYYY-MM-DD"),
    });
  }
  function editUrl(e: ChangeEvent<HTMLInputElement>) {
    setEpisodeData({ ...episodeData, url: e.target.value });
  }

  function initData(){
    var date = new Date();
    setEpisodeData({ ...episodeData, created: moment(date).toISOString(), air_date: moment(date).toISOString()});
  }

  async function handleRequest() {
    var token: any = localStorage.getItem("token")!;
    const response = await fetch(`${API_ENDPOINT}/episode`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-access-token": token },
      body: JSON.stringify(episodeData),
    });
    return response.json();
  }
  function handleCancel() {
    changeModalVisible(false);
  }
};

export default NewEpisode;

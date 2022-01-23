import { DatePicker, Form, Input } from "antd";

const NewEpisode = () => (
  <Form
    layout="vertical"
  >
    <Form.Item label="Nombre del episodio" required>
      <Input placeholder="Anatomy park" />
    </Form.Item>
    <Form.Item label="Episodio" required>
      <Input placeholder="S01E03" />
    </Form.Item>
    <Form.Item label="Fecha de lanzamiento" required>
      <DatePicker />
    </Form.Item>
    <Form.Item label="URL" required>
      <Input placeholder="https://rickandmortyapi.com/api/episode/#" />
    </Form.Item>
  </Form>
);

export default NewEpisode;

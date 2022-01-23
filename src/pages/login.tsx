import { Button, Form } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Token quemado
const HARDC_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.c_C9oJ3QbnPDLuWgl4NMOniNlyvxrIUaTrKeMrDjdFU";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    var token = localStorage.getItem("token");
    if (token && token != "") {
      navigate("/");
    }
  });

  return (
    <Container>
      <h1>Bienvenido</h1>
      <Button
        type="primary"
        htmlType="submit"
        onClick={() => {
          localStorage.setItem("token", HARDC_TOKEN);
          navigate("/");
        }}
      >
        Generar token y acceder
      </Button>
    </Container>
  );
};

const Container = styled(Form)`
  margin: auto;
  text-align: center;
  padding-top: 35vh;
`;

export default Login;

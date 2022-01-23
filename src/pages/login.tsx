const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.c_C9oJ3QbnPDLuWgl4NMOniNlyvxrIUaTrKeMrDjdFU";

const Login = () => (
  <div>
    <h1>Hello</h1>
    <button onClick={() => localStorage.setItem("token", TOKEN)}>
      Guardar token
    </button>
    <br />
    <a href="/characters">Personajes</a>
    <br />
    <a href="/locations">Lugares</a>
    <br />
    <a href="/episodes">Ir a episodios</a>
  </div>
);

export default Login;

import styled from 'styled-components';

export const MyTable = styled.table`
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

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import { API_ENDPOINT } from "../../services/contants";
import { ContainerPagination, MyTable } from "../table.style";

interface Ilocation {
  id?: string;
  name?: string;
  type?: string;
  dimension?: string;
  url?: string;
  created?: string;
}

const LocationList = () => {
  let location = useLocation();
  let navigate = useNavigate();
  const [locations, setLocations] = useState<Ilocation[] | []>([]);
  const [countLocations, setCountLocations] = useState(0);
  const [currentPage, setCurrentPage] = useState<string>(
    location.search !== "" ? location.search.split("=")[1] : "1"
  );

  useEffect(() => {
    getLocations().then((val) => {
      setLocations(val.results);
      setCountLocations(val.info.count);
    });
  }, [currentPage]);

  return (
    <>
      <h2>Lugares ({countLocations})</h2>
      <MyTable>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Dimensión</th>
            <th>URL</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location, index) => (
            <tr key={"location-" + index}>
              <>
                <td>{location.id}</td>
                <td>{location.name}</td>
                <td>{location.type}</td>
                <td>{location.dimension}</td>
                <td>{location.url}</td>
              </>
              <td>...</td>
            </tr>
          ))}
        </tbody>
      </MyTable>
      <ContainerPagination>
        <Pagination
          current={parseInt(currentPage)}
          total={countLocations}
          pageSize={20}
          onChange={handlePageClick}
        />
      </ContainerPagination>
    </>
  );

  async function getLocations() {
    var token: any = localStorage.getItem("token")!;
    const response = await fetch(`${API_ENDPOINT}/location/?page=${currentPage}`, {
      method: "GET",
      headers: { "x-access-token": token },
    });
    if (response.status == 401 || response.status == 403) {
      navigate("/login");
    }
    return response.json();
  }

  function handlePageClick(pageNumber: number) {
    setCurrentPage(pageNumber + "");
    navigate("?page=" + pageNumber);
  }
};

export default LocationList;

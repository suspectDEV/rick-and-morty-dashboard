import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../services/contants";
import { MyTable } from "../table.style";

interface Ilocation {
  id?: string;
  name?: string;
  type?: string;
  dimension?: string;
  url?: string;
  created?: string;
}

const LocationList = () => {

  const [locations, setLocations] = useState<Ilocation[] | []>([])
  const [countLocations, setCountLocations] = useState(0)

  useEffect(()=>{
    getLocations().then((val)=>{
      setLocations(val.results)
      setCountLocations(val.info.count)
    })
  },[])

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
              <td>
                ...
              </td>
            </tr>
          ))}
        </tbody>
      </MyTable>
    </>
  );

  async function getLocations(){
    const response = await fetch(`${API_ENDPOINT}/location`,{method: "GET"})
    return response.json()
  }
};

export default LocationList;

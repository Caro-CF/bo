import { useEffect } from "react";
import { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";

export { Search };

function Search() {
  const [datas, setDatas] = useState([]);
  const [searchTerm, setSearchTerm] = useState([""]);
  useEffect(() => {
    fetch("http://linksforcitizens.local:3000/api/users/")
      .then((res) => res.json())
      .then((json) => setDatas(json));
  }, []);
  const handleSearchTerm = (e) => {
    
    let value = e.target.value;
    setSearchTerm(value);
  };
  return (
    <>
      <Form className="d-flex justify-content-end">
        <FormControl
          type="search"
          placeholder="Rechercher"
          className="me-2"
          aria-label="Search"
          onChange={handleSearchTerm}
        />
        <Button variant="outline-success">Rechercher</Button>
      </Form>
      {/* {datas.filter((val)=>{
        return val.firstname.toLowerCase().includes(searchTerm.toLowerCase());
      })
      .map((val) => {
        return (
          <div key={val.usr_id} className="searchresult">
            {val.firstname}
          </div>
        );
      })} */}
    </>
  );
}

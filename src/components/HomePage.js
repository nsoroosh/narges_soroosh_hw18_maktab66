import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link, useSearchParams, Outlet } from "react-router-dom";
import { Card } from "react-bootstrap";
function HomePage() {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    axios.get("https://restcountries.com/v2/all").then((response) => {
      setData(response.data);
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  console.log(data);

  return (
    <>
      <input
        value={searchParams.get("filter") || ""}
        onChange={(event) => {
          let filter = event.target.value;
          if (filter) {
            setSearchParams({ filter });
          } else {
            setSearchParams({});
          }
        }}
      />
      
      {data
        .filter((res) => {
          let filter = searchParams.get("filter");
          if (!filter) return true;
          let name = res.name.toLowerCase();
          return name.startsWith(filter.toLowerCase());
        })
        .map((res) => {return(
          <Card style={{ maxwidth: "50px" }}>
        <Card.Img variant="top" src={res.flag} />
        <Card.Body>
          <Card.Title>{<Link to={`/${res.name}`} key={res.name}>
              {res.name}
            </Link>}</Card.Title>
          <Card.Text>
            region:{res.region}<br></br>
            population:{res.population}<br></br>
            capital:{res.capital}
          </Card.Text>
        </Card.Body>
      </Card>
        )   
})}

      <Outlet />
    </>
  );
}

export default HomePage;





{/* <li key={res.name}>
            <Link to={`/${res.name}`} key={res.name}>
              {res.name}
            </Link>
            <img src={res.flag} alt={res.name} style={{ width: "100px" }} />
          </li> */}
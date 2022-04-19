import React, { useEffect, useState , useCallback } from "react";
import axios from "axios";
import {
    Link,
    useSearchParams,
    Outlet
  } from "react-router-dom";
function HomePage() {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    axios.get("https://restcountries.com/v2/all").then(response => {
      setData(response.data);
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }





 console.log(data)
  
  return(
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
      <ul>
          {data
          .filter((res) => {
            let filter = searchParams.get("filter");
            if (!filter) return true;
            let name = res.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((res)=>
          <li key={res.name}> 
          <Link to={`/${res.name}`} key={res.name}>
              {res.name}
          </Link>
          <img src={res.flag} alt={res.name} style={{width:"100px"}}/>
          </li>)}
      </ul>
      <Outlet/>
    </>
)
}


export default HomePage;

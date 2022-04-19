import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
function NextInformationPage() {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  let params = useParams();

  useEffect(() => {
    axios.get("https://restcountries.com/v2/all").then((response) => {
        const found = response.data.find(item=>item.alpha3Code==params.nextinformations)
      setData(found);
      setLoading(false);
    });
  }, []);
  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  
  
  console.log(data);
  return (
    <>  
    <div>
      <h1>border countries</h1>
      <ul>
        {data.borders.map((res) => (
          <li key={res}>
            <Link to={`/${res.name}`} key={res.name}>
              {res}
            </Link>
          </li>
        ))}
        
      </ul>
        <img src={data.flag} alt={data.name} style={{width:"100px"}}/>
    </div>
    </>
  );
}

export default NextInformationPage;

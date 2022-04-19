import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link , Outlet } from "react-router-dom";
function InformationPage() {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  let params = useParams();

  useEffect(() => {
    axios.get("https://restcountries.com/v2/all").then((response) => {
        const found = response.data.find(item=>item.name==params.informations)
      setData(found);
      setLoading(false);
    });
  }, []);
  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

//   function some (item){
//     const find=  data.find(res=>res.alpha3Code==item )
//       return find
//   }
  
  console.log(data);
  return (
     <> 
    <div>
      <h1>border countries</h1>
      <ul>
        {data.borders.map((res) => (
          <li key={res}>
            <Link to={`/${res}`} key={res}>
              {res}
            </Link>
          </li>
        ))}
        
      </ul>
        <img src={data.flag} alt={data.name} style={{width:"100px"}}/>
    </div>
       <Outlet/>
       </>
  );
}

export default InformationPage;

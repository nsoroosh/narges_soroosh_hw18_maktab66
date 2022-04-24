import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link , Outlet } from "react-router-dom";
function InformationPage() {
  const [data, setData] = useState({});
  const [info, setinfo] = useState({})
  const [isLoading, setLoading] = useState(true);
  let params = useParams();

  useEffect(() => {
    axios.get("https://restcountries.com/v2/all").then((response) => {
        const found = response.data.find(item=>item.name==params.informations)
        
        setinfo(response.data)
      setData(found);
      setLoading(false);
    });
  }, []);
  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

function fullname(input){
  let find=  info.find(sum=>sum.alpha3Code==input).name
  return find
}
  const arr=[]
  console.log()

  return (
     <> 
    <div>
        <img src={data.flag} alt={data.name} style={{}}/><br></br>
      border countries:
      <ul>
        {data.borders.map((res) => (
          <li key={res}>
            <Link to={`/${res}`} key={res}>
              {res}
            </Link>
          </li>
        ))}
        
      </ul>
      nativename:{data.nativeName}<br></br>
      population:{data.population}<br></br>
      region:{data.region}<br></br>
      subregion:{data.subregion}<br></br>
      capital:{data.capital}<br></br>
      Top Level Domain:{data.topLevelDomain}<br></br>
      Currencies:{data.currencies[0].name}<br></br>
      langueges:{data.languages.map(res=><li>{res}</li>)}
    </div>
       <Outlet/>
       </>
  );
}

export default InformationPage;

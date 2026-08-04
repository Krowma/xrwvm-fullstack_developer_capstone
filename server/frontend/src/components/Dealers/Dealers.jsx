import React, { useState, useEffect } from 'react';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';
import review_icon from "../assets/reviewicon.png"

const Dealers = () => {
  const [dealersList, setDealersList] = useState([]);
  // let [state, setState] = useState("")
  // let [states, setStates] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [originalDealers, setOriginalDealers] = useState([]);
  

  // let root_url = window.location.origin
  let dealer_url ="/djangoapp/get_dealers";
  let dealer_url_by_state = "/djangoapp/get_dealers/";

  const get_dealers = async ()=>{
    const res = await fetch(dealer_url, {
      method: "GET"
    });
    const retobj = await res.json();
    if(retobj.status === 200) {
      let all_dealers = Array.from(retobj.dealers)
      
      setDealersList(all_dealers);
      setOriginalDealers(all_dealers);
    }
  }
  useEffect(() => {
    get_dealers();
  },[]);  

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filtered = originalDealers.filter(dealer =>
        dealer.state.toLowerCase().includes(query.toLowerCase())
    );
    setDealersList(filtered);
  };

  const handleLostFocus = () => {
    if (!searchQuery) {
        setDealersList(originalDealers);
    }
  }

let isLoggedIn = sessionStorage.getItem("username") != null ? true : false;
return(
  <div className='page-body'>
      <Header/>

     <table className='table'>
      <tr>
      <th>ID</th>
      <th>Dealer Name</th>
      <th>City</th>
      <th>Address</th>
      <th>Zip</th>
      <th>
      <input type="text" placeholder="Search states..." onChange={handleInputChange} onBlur={handleLostFocus} value={searchQuery} />
      <option value="" selected disabled hidden>State</option>   
      </th>
      {isLoggedIn ? (
          <th>Review Dealer</th>
         ):<></>
      }
      </tr>
     {dealersList.map(dealer => (
        <tr>
          <td>{dealer['id']}</td>
          <td><a href={'/dealer/'+dealer['id']} class="dealer-link">{dealer['full_name']}</a></td>
          <td style={{fontWeight: 'bold'}}>{dealer['city']}</td>
          <td style={{fontWeight: 'bold'}}>{dealer['address']}</td>
          <td>{dealer['zip']}</td>
          <td>{dealer['state']}</td>
          {isLoggedIn ? (
            <td><a href={`/postreview/${dealer['id']}`}><img src={review_icon} className="review_icon" alt="Post Review"/></a></td>
           ):<></>
          }
        </tr>
      ))}
     </table>;
  </div>
)
}

export default Dealers

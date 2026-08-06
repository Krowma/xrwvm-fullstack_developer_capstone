import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';

const SearchCars = () => {
  const [cars, setCars] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [dealer, setDealer] = useState({"full_name":""});
  const [message, setMessage] = useState("Loading Cars....");
  const { id } = useParams();

  let inventory_url = `/djangoapp/get_inventory/${id}`;
  let search_url = `/djangoapp/get_inventory?id=${id}`;
  let dealer_url = `/djangoapp/dealer/${id}`;
  
  const fetchDealer = async ()=>{
    const res = await fetch(dealer_url, {
      method: "GET"
    });
    const retobj = await res.json();
    if(retobj.status === 200) {
      let dealer = retobj.dealer;
      setDealer({"full_name":dealer[0].full_name})
    }
  }

  const populateMakesAndModels = (cars)=>{
    let tmpmakes = [];
    let tmpmodels = [];
    cars.forEach((car)=>{
      tmpmakes.push(car.make);
      tmpmodels.push(car.model);
    })

    setMakes(Array.from(new Set(tmpmakes)));
    setModels(Array.from(new Set(tmpmodels)));
  }
    
  const fetchCars = async ()=>{
    const res = await fetch(inventory_url, {
      method: "GET"
    });
    const retobj = await res.json();
    
    if(retobj.status === 200) {
      let cars = Array.from(retobj.cars)
      setCars(cars);
      populateMakesAndModels(cars);
    }
  }

  let SearchCars = async ()=> {
    let make = document.getElementById("make").value;
    if (make !== "all") {
        search_url = search_url + "&make="+make;
    }

    let model = document.getElementById("model").value;
    if (model !== "all") {
        search_url = search_url + "&model="+model;
    }

    let year = document.getElementById("year").value;
    if (year !== "all") {
        search_url = search_url + "&year="+year;
    }

    let mileage = document.getElementById("mileage").value;
    if (mileage !== 'all') {
        search_url = search_url + "&mileage="+mileage;
    }
    
    let price = document.getElementById("price").value;
    if(price !== "all") {
        search_url = search_url + "&price="+price;
    }

    const res = await fetch(search_url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }})

      const retobj = await res.json();
      
      if(retobj.status === 200) {
        let cars = Array.from(retobj.cars)
        setCars(cars);
      }
  }

  const reset = ()=>{
    const selectElements = document.querySelectorAll('select');

    selectElements.forEach((select) => {
      select.selectedIndex = 0;
    });  
    fetchCars();
  }
  

  useEffect(() => {
    fetchCars();
    fetchDealer();
  },[]); 

  return (
    <div>
      <Header />
      <h1 style={{ marginBottom: '20px'}}>Cars at {dealer.full_name}</h1>
      <div>
      <span style={{ marginLeft: '10px', paddingLeft: '10px'}}>Make</span>
      <select style={{ marginLeft: '10px', marginRight: '10px' ,paddingLeft: '10px', borderRadius :'10px'}} name="make" id="make" onChange={SearchCars}>
        {makes.length === 0 ? (
          <option value=''>No data found</option>
        ):(
          <>
          <option disabled defaultValue value='all'> -- All -- </option>
          {makes.map((make, index) => (
            <option key={index} value={make}>
              {make}
            </option>
          ))}
        </>
        )        
        }
      </select>
      <span style={{ marginLeft: '10px', paddingLeft: '10px'}}>Model</span>
      <select style={{ marginLeft: '10px', marginRight: '10px' ,paddingLeft: '10px', borderRadius :'10px'}} name="model" id="model" onChange={SearchCars}>
      {models.length === 0 ? (
        <option value=''>No data found</option>
      ) : (
        <>
          <option disabled defaultValue value='all'> -- All -- </option>
          {models.map((model, index) => (
            <option key={index} value={model}>
              {model}
            </option>
          ))}
        </>
      )}      
      </select>
      <span style={{ marginLeft: '10px', paddingLeft: '10px'}}>Minimum Year</span>
      <select style={{ marginLeft: '10px', marginRight: '10px' ,paddingLeft: '10px', borderRadius :'10px'}} name="year" id="year" onChange={SearchCars}>
          <option selected value='all'> -- All -- </option>
          <option value='2024'>2024 or newer</option>
          <option value='2023'>2023 or newer</option>
          <option value='2022'>2022 or newer</option>
          <option value='2021'>2021 or newer</option>
          <option value='2020'>2020 or newer</option>
      </select>
      <span style={{ marginLeft: '10px', paddingLeft: '10px'}}>Maximum Mileage</span>
      <select style={{ marginLeft: '10px', marginRight: '10px' ,paddingLeft: '10px', borderRadius :'10px'}} name="mileage" id="mileage" onChange={SearchCars}>
        <option selected value='all'> -- All -- </option>
          <option value='50000'>50000</option>
          <option value='100000'>100000</option>
          <option value='150000'>150000</option>
          <option value='200000'>200000</option>
      </select>
      <span style={{ marginLeft: '10px', paddingLeft: '10px'}}>Maximum Price</span>
      <select style={{ marginLeft: '10px', marginRight: '10px' ,paddingLeft: '10px', borderRadius :'10px'}} name="price" id="price" onChange={SearchCars}>
          <option selected value='all'> -- All -- </option>
          <option value='20000'>20000</option>
          <option value='40000'>40000</option>
          <option value='60000'>60000</option>
          <option value='80000'>80000</option>
      </select>

      <button style={{marginLeft: '10px', paddingLeft: '10px'}} onClick={reset}>Reset</button>

      </div>


      <div style={{ marginLeft: '10px', marginRight: '10px' , marginTop: '20px'}} >
        {cars.length === 0 ? (
          <p style={{ marginLeft: '10px', marginRight: '10px', marginTop: '20px' }}>{message}</p>
        ) : (
          <div>
            <hr/>
            {cars.map((car) => (
              <div>
              <div key={car._id}>
                <h3>{car.make} {car.model}</h3>
                <p>Year: {car.year}</p>
                <p>Mileage: {car.mileage}</p>
                <p>Price: {car.price}</p>
              </div>
              <hr/>
              </div>
            )
        )}

          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCars;
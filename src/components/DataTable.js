import React, { useEffect, useState } from "react";
import useFetch from "./useFetch";

function DataTable() {
 
  const { products, isLoading, error } = useFetch();
  const [searched, setSearched] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      const filter = products.filter((product) =>
        product.name.toLowerCase().includes(searched.toLowerCase())
      );
      const sortedProduct = filter
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name));
      setFilteredList(sortedProduct);
    }, 250);

    return () => clearTimeout(debounce);
  }, [products, searched]);

  const totalVal = filteredList.reduce((acc, val) => {
    return (acc += val.revenue);
  }, 0);

  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(number);
  };

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      
      
      <div className="container"> 
        <div>
        <h1>Revenue Aggregator Application</h1>  
            </div>     
        <div className="search">
          <label htmlFor="search">Search Product Table:</label>
          <input
            type="text"
            id="search"
            placeholder="Search"
            value={searched}
            onChange={(e) => setSearched(e.target.value)}
          />
        </div>
        <div className="products">
            <div className="table">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Product Name</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((item, index) => (
                <tr key={index}>
                   <td>{index+1}</td> 
                  <td>{item.name}</td>
                  <td>{formatNumber(item.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <h3>Total Revenue:  <span className="totalrevenue">{formatNumber(totalVal)}</span></h3>
        </div>
      </div>
    </>
  );
}

export default DataTable;

import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [product, setProduct] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInput = (e) => {
    console.log(e.target.value);
    setProduct(e.target.value);
  };

  const fetchItems = async (product) => {
    const url = "https://fakestoreapi.com/products";
    const result = await fetch(url);
    const data = await result.json();
    console.log(data);

    const filteredProducts = data.filter((item) =>
      item.title.toLowerCase().includes(product.toLowerCase())
    );
    setSuggestions(filteredProducts);
  };

  useEffect(() => {
    if (product.length >= 2) {
      //make an api call
      fetchItems(product);
    } else {
      setSuggestions([]);
    }
  }, [product]);
  return (
    <div className="App">
      <h1>My Shopping List</h1>
      <div>
        <input className="input-item" value={product} onChange={handleInput} />
      </div>
      <div className="shopping-list"></div>
      <div className="shopping-list">
        {suggestions.map((item) => (
          <div key={item.id} className="suggestion-item">
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

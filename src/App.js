import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [product, setProduct] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [bucketList, setBucketList] = useState([]);

  useEffect(() => {
    if (product.length >= 2) {
      const timer = setTimeout(() => {
        fetchItems(product);
      }, 500); // Debouncing API call

      return () => clearTimeout(timer); // Cleanup previous timer
    } else {
      setSuggestions([]); // Clear suggestions if input is empty or less than 2 chars
    }
  }, [product]); // Runs whenever `product` changes

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

  const handleShoppingList = (e) => {
    const idx = e.target.getAttribute("data-id");
    if (idx) {
      const obj = {
        id: Date.now(),
        data: suggestions[idx],
        isDone: false,
      };
      const copyBucketList = [...bucketList];
      copyBucketList.push(obj);
      setBucketList(copyBucketList);
      console.log(copyBucketList);
    }
    setProduct("");
  };

  const handleRightClick = (id) => {
    const copyBucketList = [...bucketList];
    const newBucketList = copyBucketList.map((item) => {
      if (item.id === id) {
        item.isDone = !item.isDone;
      }
      return item;
    });
    setBucketList(newBucketList);
  };

  const handleDelete = (id) => {
    const copyBucketList = [...bucketList];
    const newBucketList = copyBucketList.filter((item) => item.id !== id);
    setBucketList(newBucketList);
  };

  return (
    <div className="App">
      <h1>My Shopping List</h1>
      <div>
        <input className="input-item" value={product} onChange={handleInput} />
        <div className="shopping-list" onClick={handleShoppingList}>
          {suggestions.map((item, index) => (
            <div key={item.id} data-id={index} className="suggestion-item">
              {item.title}
            </div>
          ))}
        </div>
      </div>
      <div className="bucketList">
        {bucketList.map((item) => {
          return (
            <div className="shoppingList">
              <button onClick={() => handleRightClick(item.id)}>✓</button>
              <div className={item.isDone ? "strik" : ""}>
                {item.data.title}
              </div>
              <button onClick={() => handleDelete(item.id)}>X</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

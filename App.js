import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";
import axios from 'axios';

function App(){
  const [items, setItems] = useState(
    [
        {"img": "1.jpg",
         "id": 1,
         "bname": "The Woman in Me",
         "author": "Britney Spears",
         "rated": "4.5 star",
         "btype": "Hardcover",
         "price": "23.25"
        },
        
        {"img": "2.jpg",
         "id": 2,
         "bname": "No Brainer (Diary of a Wimpy Kid Book 18)",
         "author": "Jeff Kinney",
         "rated": "4.5 star",
         "btype": "Hardcover",
         "price": "9.00"
        },
    ])

    useEffect ( () => {
      axios.get ("http://localhost:5555/book")
           .then( (res) => {

              console.log(res.data.result)
              setItems(res.data.result)

            })
    },[])

  return(
    <div className="App">
      <div className='myapp'>
        <h3>Best Sellers in Book</h3>

        {items.map( (item) => (
          <div className='box' key={item.id}>

            <div className='id'>
                <span className='id-text'>#{item.id}</span>
            </div>
            <div className='id-section'></div>

            <img src={"./images/"+item.img} className='img-book'/>

            <ul className='info-details'>
              <li><span>
                  <div className='title'>{item.bname}</div>
                </span></li>
              <li><p>{item.author}</p></li>
              <li><i class='icon-star'>
                <span class='icon-alt'>{item.rated}</span>
                </i></li>
              <li><p>
                <span class='type-style'>{item.btype}</span></p></li>
              <li><p>
                <span class='price-style'>${item.price}</span>
                </p></li>
            </ul>
            
          </div>
        )) }
      </div>
    </div>
  );
}


export default App;

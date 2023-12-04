import { useState, useEffect} from "react";
import Header from "./Components/Header.js";
import Sidebar from "./Components/Sidebar";
import MainContent from "./Components/MainContent.js";
import axios from "axios";
function App() {
  const [animeList, setAnimeList] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [search, SetSearch] = useState("");
  const GetTopAnime = async () => {
    try {
      const response = await axios.get('https://api.jikan.moe/v4/top/anime');
      const responseData = response.data.data;
      console.log('API response:', responseData);
  
      if (responseData && Array.isArray(responseData) && responseData.length > 0) {
        setTopAnime(responseData.slice(0, 5));
      } else {
        console.error('Unexpected API response format or empty array:', responseData);
      }
    } catch (error) {
      console.error('Error fetching top anime:', error.response || error);
    }
  };
  const HandleSearch = e => {
    e.preventDefault();
    fetchAnime(search);
  }
  const fetchAnime = async (query) => {
    const temp = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&order_by=title&sort=asc&limit=10`)
    .then(res => res.json());
    
    setAnimeList(temp.results);
  }
  
  useEffect(() => {
    GetTopAnime();
    console.log("Top Anime")
  }, []);
  console.log(topAnime)
  return (
    <div className='App'>
<Header />
<div className="content-wrap">
  <Sidebar 
  topAnime = {topAnime}/>
  <MainContent
  HandleSearch = {HandleSearch}
  search={search}
  SetSearch = {SetSearch}
  animeList={animeList}/>
</div>
    </div>
  )
}

export default App;

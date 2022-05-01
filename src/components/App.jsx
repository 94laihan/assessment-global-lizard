import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from './Main';
import Page404 from './Page404';
// import PostDetails from './PostDetails';


function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Main/>}/>

        {/* <Route path = "/post/:pId" element={<PostDetails/>}/> */}

        <Route path = "*" element = {<Page404/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

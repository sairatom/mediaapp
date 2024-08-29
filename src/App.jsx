import {Route,Routes} from 'react-router-dom'
import './App.css'
import Footer from './Components/Footer'
import Head from './Components/Head'
import Landingpages from './Pages/Landingpages'
import Home from './Pages/Home'
import Watchhistory from './Pages/Watchhistory'
function App() {
  

  return (
    <>
   <Head/>
      <Routes>
        <Route path='/' element={<Landingpages/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/watch-history' element={<Watchhistory/>} />
      </Routes>

      <Footer/>
    </>
  )
}

export default App

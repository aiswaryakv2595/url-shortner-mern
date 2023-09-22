
import UrlForm from './Components/UrlForm'
import { Routes ,Route } from 'react-router-dom';

function App() {
 

  return (
    <Routes>
    
        <Route exact path="/" element={<UrlForm/>} />
      
    </Routes>
  )
}

export default App

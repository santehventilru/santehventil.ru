
import { BrowserRouter} from 'react-router-dom'
import './normalize.css'
import './App.css'
import RouterApp from './routes/RouterApp'
import WidgetesWrapper from '@shared/widgets/WidgetesWrapper'
import HellperWrapper from '@shared/components/HellperWrapper';
import MainLayouts from './layouts/MainLayouts';

function App() {

 
  


  return (
    
      <BrowserRouter>
        <HellperWrapper/>
        <WidgetesWrapper/>

        <MainLayouts>
            <RouterApp/>
        </MainLayouts>
      </BrowserRouter>
   
  )
}

export default App





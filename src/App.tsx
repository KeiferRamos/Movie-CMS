import RoutesPage from './routes';
import './global/global.css';
import Context from './context/context';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.common[
  'Authorization'
] = `Bearer ${sessionStorage.getItem('access_token')}`;

function App() {
  console.log(process.env.REACT_APP_BASE_URL);
  return (
    <Context>
      <RoutesPage></RoutesPage>
    </Context>
  );
}

export default App;

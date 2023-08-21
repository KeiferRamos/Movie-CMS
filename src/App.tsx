import RoutesPage from './routes';
import './global/global.css';
import Context from './context/context';
import axios from 'axios';

axios.defaults.baseURL = 'https://movie-api-production-6f96.up.railway.app';
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

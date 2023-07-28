import RoutesPage from './routes';
import './global/global.css';
import Context from './context/context';

function App() {
  console.log(process.env.REACT_APP_BASE_URL);
  return (
    <Context>
      <RoutesPage></RoutesPage>
    </Context>
  );
}

export default App;

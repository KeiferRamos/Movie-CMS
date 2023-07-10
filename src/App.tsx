import RoutesPage from './routes';
import './global/global.css';
import Context from './context/context';

function App() {
  return (
    <Context>
      <RoutesPage></RoutesPage>
    </Context>
  );
}

export default App;

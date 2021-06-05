import './App.css';
import AddProduct from './page/AddProduct';
import Detail from './page/Detailproduct';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <AddProduct/>
        </Route>
        <Route path="/detail/:id">
          <Detail/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

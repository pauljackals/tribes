import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux'
import Home from "../components/Home";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home}/>
          </Switch>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
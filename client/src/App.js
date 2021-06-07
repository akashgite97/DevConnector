import { useEffect } from 'react';
import './App.css';
import Landing from './Components/layouts/Landing';
import Navbar from './Components/layouts/Navbar';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Register from './Components/auth/Register';
import Login from './Components/auth/Login';

//redux
import store from './store';
import { Provider } from 'react-redux';
import Alert from './Components/layouts/Alert';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import PrivateRoute from './routing/PrivateRoute';
import Dashboard from './Dashboard/Dashboard';
import CreateProfile from './Components/Profile/CreateProfile';
import EditProfile from './Components/Profile/EditProfile';
import AddExperience from './Components/Profile/AddExperience';
import AddEducation from './Components/Profile/AddEducation';
import Profiles from './Components/profiles/Profiles';
import ProfileDetails from './Components/Profile/ProfileDetails';
import Posts from './Components/posts/Posts';
import PostDetails from './Components/posts/PostDetails';

function App() {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />

        <section className='container'>
          <Alert />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/profiles' component={Profiles} />
            <Route exact path='/profile/:id' component={ProfileDetails} />
            <PrivateRoute
              exact
              path='/create-profile'
              component={CreateProfile}
            />

            <PrivateRoute exact path='/edit-profile' component={EditProfile} />
            <PrivateRoute
              exact
              path='/add-experience'
              component={AddExperience}
            />
            <PrivateRoute
              exact
              path='/add-education'
              component={AddEducation}
            />

            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <Route exact path='/posts/:id' component={PostDetails} />
            <PrivateRoute exact path='/posts' component={Posts} />
          </Switch>
        </section>
      </Router>
    </Provider>
  );
}

export default App;

import {combineReducers} from 'redux';
import Routing from './navigator';
import user from './user';
import challenge from './challenge';

export default combineReducers({
  // route: Routing,
  user,
  challenge,
});

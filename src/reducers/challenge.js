// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {USER_CHALLENGE} from '../actions/ActionTypes';

const initialState = Immutable({
  data: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_CHALLENGE.SUCCESS: {
      const {data} = action;

      return Immutable.merge(state, {
        data: data,
      });
    }

    default:
      return state;
  }
};

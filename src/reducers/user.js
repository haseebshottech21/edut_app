// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  USER_SIGNIN,
  GET_SOCKET_REF,
  SELECT_USER_TYPE,
  SELECT_SERVICE_TYPE,
  SELECT_DESTINATION,
  USER_SIGNOUT,
  COMPLETE_PROFILE,
  GET_POSTS,
  LIKE_POST,
} from '../actions/ActionTypes';

const initialState = Immutable({
  data: {},
  access_token: '',
  Posts: [],
  categories: [],
  socketRef: null
});

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNIN.SUCCESS: {
      const { payload, data } = action;

      return Immutable.merge(state, {
        data: data,
        access_token: action.access_token,
      });
    }
    case COMPLETE_PROFILE.SUCCESS: {
      const { data } = action;

      return Immutable.merge(state, {
        data: data,
        access_token: state.access_token,
      });
    }
    case GET_SOCKET_REF: {
      const { payload } = action;
      console.log(action, 'action.payload');
      return {
        ...state,
        socketRef: payload
      }
    }
    case GET_POSTS.SUCCESS: {
      const { data, payload } = action;
      console.log(payload, 'payload');
      if (payload.type == 'post') {
        return Immutable.merge(state, {
          Posts: data.posts,
          categories: data.categories,
        });
      } else {
        return Immutable.merge(state, {
          Posts: data,
        });
      }
    }
    case LIKE_POST.SUCCESS: {
      const { data, payload } = action;
      if (!_.isEmpty(state.Posts)) {
        let tempList = _.cloneDeep(state.Posts);
        console.log(tempList.posts, 'checkkkkkkk');
        const Index = _.findIndex(tempList, o => o.id === payload.post_id);
        console.log(Index, 'INdex');
        tempList[Index].is_like = data.status;
        tempList[Index].likes =
          data.status == 0
            ? tempList[Index].likes - 1
            : tempList[Index].likes + 1;
        return Immutable.merge(state, {
          Posts: tempList,
        });
      }
    }
    case USER_SIGNOUT.SUCCESS:
      return initialState;

    default:
      return state;
  }
};

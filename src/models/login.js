
import * as request from "../utils/api"
export default {

  namespace: 'login',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *login({ data }, { call, put }) {  // eslint-disable-line
      return yield call(request.login,data);
    },
    *getOrderInfo({data},{ call, put }){
      return yield call(request.getOrderInfo,data);

    },
    *logout({data},{ call, put }){
      return yield call(request.logout);
    },
    *me({data},{ call, put }){
      return yield call(request.me);
    },
    *sessionLogout({data},{ call, put }){
      return yield call(request.sessionLogout);
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};

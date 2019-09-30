
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
    *layout({data},{ call, put }){
      return yield call(request.layout);

    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};

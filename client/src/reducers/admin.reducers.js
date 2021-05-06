const ADMIN_INIT = "ADMIN_INIT";
const ADMIN_LOGIN = "ADMIN_LOGIN";
const ADMIN_LOGOFF = "ADMIN_LOGOFF";

export const initState = {
  adminID: "initial",
  name: "oguz2",
  password: "4321",
};

export const Login = (admin = initState) => {
  return {
    type: ADMIN_LOGIN,
    payload: admin,
  };
};

export const adminInit = (admin = initState) => {
  return {
    type: ADMIN_INIT,
    payload: admin,
  };
};

export const a = "@@redux/INIT7.r.8.j.e.g";
export const b = "@@redux/PROBE_UNKNOWN_ACTIONe.r.3.t.u.c";
export const c = "@@redux/INIT7.r.8.j.e.g";

export default function adminReducer(state = initState, action) {
  switch (action.type) {
    case ADMIN_LOGIN:
      return Object.assign({}, action.payload);
    case ADMIN_INIT:
      return Object.assign({}, action.payload);
    case ADMIN_LOGOFF:
      return action.payload;
    case (a, b, c):
      break;
    default:
      return state;
  }
}

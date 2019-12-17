const defaultState ={
  isLoggedIn: false,
  token: '',
  username: '',
  email: '',
  uid: '',
  client_id: '',
  expiry: '',
  spotifyStatus: false,
  outlookStatus: false
}

export default function session(state = defaultState, action) {
  switch (action.type) {
    case 'LOGIN':
      return ({
        ...state,
        isLoggedIn: true,
        token: action.token,
        username: action.username,
        email: action.email,
        uid: action.uid,
        client_id: action.client_id,
        expiry: action.expiry
      });
    case 'LOGOUT':
        return ({
          isLoggedIn: false,
          token: '',
          username: '',
          email: '',
          uid: '',
          client_id: '',
          expiry: '',
          spotifyStatus: false,
          outlookStatus: false
        });
    case 'SPOTIFY_LOGIN':
        return ({
          ...state,
          spotifyStatus: true
        });
    case 'OUTLOOK_LOGIN':
      return({
        ...state,
        outlookStatus: true
      })    
    default:
      return state;
  }
}

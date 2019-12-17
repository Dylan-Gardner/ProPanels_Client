export const login = (accessToken, username, email, uid, client_id, expiry) => {
  return {
    type: 'LOGIN',
    token: accessToken,
    username: username,
    email: email,
    uid: uid,
    client_id: client_id,
    expiry: expiry
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT'
  };
};

export const spotifyLogin = () => {
  return {
    type: 'SPOTIFY_LOGIN'
  };
};

export const outlookLogin = () => {
  return{
    type: 'OUTLOOK_LOGIN'
  };
};

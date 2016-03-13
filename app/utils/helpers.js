// import Firebase from 'firebase'
import Rebase from 're-base'


const base = Rebase.createClass('https://30day.firebaseio.com/');
// window.firebase = Firebase

function getEmptyUser( username ) {
    var d = new Date();
    let startDate = d.getMonth() + "-" + d.getDate() + "-" + d.getFullYear();
    let challengeDates = {};

    // create obj keys as dates for each day of challenge
    for (let i = 0; i < 30; i++) {
        challengeDates[d.getMonth() + "-" + d.getDate() + "-" + d.getFullYear()] = 0;
        d.setTime(d.getTime() + 86400000);
    }

    return {
        "startDate": startDate,
        "push-ups": challengeDates,
        "pull-ups": challengeDates
    }
}

// function checkValidUser( username ) {
//     return axios.get(`https://30day.firebaseio.com/${username}.json`);
// }

function createUser( username, password ) {
    const data = getEmptyUser( username );
    var firebaseRef = new Firebase('https://30day.firebaseio.com/')

    // Create
    base.createUser({
      email: username,
      password: password
    }, userHandler);
}

function emailAuthentication ( username, password ) {
    base.authWithPassword({
      email    : username ,
      password : password
    }, authHandler);
}

function authHandler(error, authData) {
  if (error) {
    return false;
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
}

function verifyUser( username ) {
    checkValidUser(username)
        .then( function( data ){
            console.log(data)
            if (data && data["push-ups"] && data["pull-ups"]) {
                return true
            }
            return false
        })
}

export { verifyUser, createUser, authHandler}


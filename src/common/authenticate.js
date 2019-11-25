// authentication 

const auth = {
    authenticate : function(user) {
        localStorage.setItem('isLogged', true);
        localStorage.setItem('userDetail', JSON.stringify(user));
    },
    logout : function() {
     localStorage.setItem('isLogged', false);
     localStorage.removeItem('userDetail');
    }
}

export default auth;
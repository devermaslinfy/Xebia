// authentication 

const auth = {
    authenticate : function(user) {
        localStorage.setItem('isLogged', true);
        localStorage.setItem('userDetail', JSON.stringify(user));
    },
    logout : function() {
     localStorage.clear();
    }
}

export default auth;
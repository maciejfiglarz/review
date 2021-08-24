export const initFacebookLogin = () => {
    const facebookAccess = document.querySelectorAll('.facebook-access-init');
    facebookAccess.forEach(btn => {
        btn.addEventListener('click', (event) => {
            loginWithFacebook();
        })
    })
};



const loginWithFacebook = () => {

    FB.login(function (response) {
        if (response.authResponse) {
            console.log('You are logged in &amp; cookie set!');
            getFbUserData()
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    });
    return false;
};

function getFbUserData(){
    FB.api('/me', {locale: 'pl_PL', fields: 'id,first_name,last_name,email,link,gender,locale,picture'},
        function (response) {
            console.log('response',response);
        });
}

// Logout from facebook
function fbLogout() {
    FB.logout(function() {
        document.getElementById('fbLink').setAttribute("onclick","fbLogin()");
        document.getElementById('fbLink').innerHTML = '<img src="fblogin.png"/>';
        document.getElementById('userData').innerHTML = '';
        document.getElementById('status').innerHTML = 'You have successfully logout from Facebook.';
    });
    FB.logout(function() {
    });

}



export const fbShare = () => {
    const init = document.querySelectorAll('.single-bar__share-facebook');
    const windowWidth = 520;
    const windowHeight = 350;
    const windowTop = (screen.height / 2) - (windowHeight / 2);
    const windowLeft = (screen.width / 2) - (windowWidth / 2);

    init.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            console.log('link', link);
            const postURL = event.currentTarget.dataset.url;
            const title = event.currentTarget.dataset.title;
            const description = event.currentTarget.dataset.description;
            const imageURL = event.currentTarget.dataset.image;

            const url = `http://www.facebook.com/sharer.php?s=100&p[title]=${title}&p[summary]=${description}&p[url]=${postURL}&p[images][0]=${imageURL},sharer, 
            top=${windowTop},
            left=${windowLeft},
            toolbar=0,status=0,
            width=${windowWidth},
            height=${windowHeight}`;
            console.log('url',url);
            // window.open(url);
        });
    });
};
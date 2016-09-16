window.Facebook = {
    init: function () {
        // load facebook sdk
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        // initiate facebook sdk
        window.fbAsyncInit = function () {
            FB.init({
                appId: '1280708791952860',
                xfbml: true,
                version: 'v2.7'
            });

            FB.getLoginStatus(function (response) {
                Facebook.status(response);
            });
        };
    },

    status: function (response) {
        if (response.status === 'connected') {
            console.log('Connected!');
            Facebook.fetchFriends();
        } else if (response.status === 'not_authorized') {
            console.log('Not logged in.');
        } else {
            console.log('Not logged in.');
        }
    },

    login: function () {
        FB.login(function (response) {
            Facebook.status(response);
        }, {scope: 'public_profile,user_friends'});
    },

    fetchFriends: function () {
        FB.api('/me/invitable_friends?fields=id,name,picture.width(200).height(200)', function (response) {
            if (response.data) {
                Facebook.renderFriends(response.data);
            }
        });
    },

    renderFriends: function (friends) {
        $('.main-content').html('<div class="tag-line">' +
            'Your Friends' +
            '</div>');
        $('.main-content').append('<div class="friend-list">');
        for(var i = 0; i < friends.length; i++) {
            $('.main-content > .friend-list').append('<div class="friend">' +
                '<img src="' + friends[i].picture.data.url + '">' +
                '<div class="name">' + friends[i].name + '</div>' +
                '</div>');
        }
        $('.main-content').append('</div>');
    }
};

Facebook.init();

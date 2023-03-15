// document.onreadystatechange = function () {
//     if (document.readyState === "complete") {
//         // setInterval(function () {
//             var myElement = document.getElementById("my-element");
//             myElement.style.visibility = "visible";
//         // }, 2000);
        
//     }
// }

let numberOfTraderMembers;
let numberOfVisitorMembers;
numberOfTraderMembers = getId('numberOfTraderMembers');
numberOfVisitorMembers = getId('numberOfVisitorMembers');


window.onload = function () {
    getNumberOfTraderMembers();
    getNumberOfVisitorMembers();
    getUsersLogoAndBanner();
};

function getNumberOfTraderMembers() {
    $.ajax({
        url: '/api/v2/get/number-of-trader-members',
        type: 'GET',
        success: function (data) {
            numberOfTraderMembers.innerHTML = 'Number of Trader Members: ' + data.length;
        },
    });
}

function getNumberOfVisitorMembers() {
    $.ajax({
        url: '/api/v2/get/number-of-visitor-members',
        type: 'GET',
        success: function (data) {
            numberOfVisitorMembers.innerHTML = 'Numbers of Visitor Members: ' + data.length;
        },
    });
}

function getUsersLogoAndBanner() {
    $.ajax({
        url: '/api/get/users-logo-and-banners',
        type: 'GET',
        success: function (data) {
            if (data.length > 0) {
                if (data[0].logo) {
                    userImageOutsideProfile.src = host + '/uploads/users_upload_files/' + data[0].logo;
                    isAvatarOutsideProfile.src = host + '/uploads/users_upload_files/' + data[0].logo;
                } else {
                    userImageOutsideProfile.src = host + '/uploads/placeholder/logo-placeholder.jpg';
                    isAvatarOutsideProfile.src = host + '/uploads/placeholder/logo-placeholder.jpg';
                }
            } else {
                userImageOutsideProfile.src = host + '/uploads/placeholder/logo-placeholder.jpg';
                isAvatarOutsideProfile.src = host + '/uploads/placeholder/logo-placeholder.jpg';
            }
        },
    });
}
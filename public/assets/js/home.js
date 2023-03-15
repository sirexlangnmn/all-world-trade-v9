let numberOfTraderMembers = getId('numberOfTraderMembers');
let numberOfVisitorMembers = getId('numberOfVisitorMembers');

const API_URL = {
    users_logo_and_banners: `/api/get/users-logo-and-banners`,
    number_of_visitor_members: `/api/v2/get/number-of-visitor-members`,
    number_of_trader_members: `/api/v2/get/number-of-trader-members`,
    logo_placeholder: `${host}/uploads/placeholder/logo-placeholder.jpg`,
};

export function square(x) {
    return x * x;
  }
  
  export function cube(x) {
    return x * x * x;
  }

const displayUsersLogoAndBanner = () => {
    return fetch(API_URL.users_logo_and_banners)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            const logoUrl =
                data.length > 0 && data[0].logo
                    ? `${host}/uploads/users_upload_files/${data[0].logo}`
                    : API_URL.logo_placeholder;

            userImageOutsideProfile.src = logoUrl;
            isAvatarOutsideProfile.src = logoUrl;
        })
        .catch((error) => {
            console.error('Error fetching user logo and banner:', error);
            userImageOutsideProfile.src = API_URL.logo_placeholder;
            isAvatarOutsideProfile.src = API_URL.logo_placeholder;
        });
};

const getNumberOfTraderMembers = () => {
    return fetch(API_URL.number_of_trader_members)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            numberOfTraderMembers.innerHTML = `Number of Trader Members: ${data.length}`;
        })
        .catch((error) => {
            console.error('Error fetching number of trader members:', error);
            numberOfTraderMembers.innerHTML = 'Error fetching number of trader members';
        });
};

const getNumberOfVisitorMembers = () => {
    return fetch(API_URL.number_of_visitor_members)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            numberOfVisitorMembers.innerHTML = `Number of Visitor Members: ${data.length}`;
        })
        .catch((error) => {
            console.error('Error fetching number of visitor members:', error);
            numberOfVisitorMembers.innerHTML = 'Error fetching number of visitor members';
        });
};

Promise.all([displayUsersLogoAndBanner(), getNumberOfVisitorMembers()]);

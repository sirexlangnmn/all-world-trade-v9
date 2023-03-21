let displayCompanyName = getId('displayCompanyName');
let displayCompanyTagline = getId('displayCompanyTagline');
let displayBusinessEmail = getId('displayBusinessEmail');
let displayBusinessContact = getId('displayBusinessContact');
let displayBusinessWebsite = getId('displayBusinessWebsite');
let displayBusinessSocialMediaContact = getId('displayBusinessSocialMediaContact');
let displayBusinessAddress = getId('displayBusinessAddress');
let displayBusinessRegionOfOperation = getId('displayBusinessRegionOfOperation');
let displayBusinessTradeCategory = getId('displayBusinessTradeCategory');
let displayBusinessSubCategory = getId('displayBusinessSubCategory');
let displayBusinessMinorCategory = getId('displayBusinessMinorCategory');
let displayBusinessScale = getId('displayBusinessScale');
let displayBusinessTags = getId('displayBusinessTags');

let displayReprestativeFullname = getId('displayReprestativeFullname');
let displayReprestativeEmailAddress = getId('displayReprestativeEmailAddress');
let displayReprestativeContactNumber = getId('displayReprestativeContactNumber');
let displayReprestativeAddress = getId('displayReprestativeAddress');

let divCompanyDetails = getId('divCompanyDetails');
let divUpdateCompanyDetails = getId('divUpdateCompanyDetails');
let btnCompanyDetailsEdit = getId('btnCompanyDetailsEdit');
let btnCompanyDetailsCancelEdit = getId('btnCompanyDetailsCancelEdit');

let companyBanner = getId('companyBanner');
let companyBannerPreview = getId('companyBannerPreview');
let companyBannerId = getId('companyBannerId');
let companyLogo = getId('companyLogo');
let companyLogoPreview = getId('companyLogoPreview');
let companyLogoId = getId('companyLogoId');
let userImage = getId('user-image');
let isAvatar = getId('is_avatar');

//edit
let companyName = getId('companyName');
let tagline = getId('tagline');
let businessEmailAddress = getId('businessEmailAddress');
let businessContactNumber = getId('businessContactNumber');
let website = getId('website');
let businessSocialMediaContactType = getId('businessSocialMediaContactType');
let businessSocialMediaContactNumber = getId('businessSocialMediaContactNumber');
let businessAddress = getId('businessAddress');
let editBusinessCountryLocation = getId('editBusinessCountryLocation');
let editBusinessStatesLocation = getId('editBusinessStatesLocation');
let editBusinessCityLocation = getId('editBusinessCityLocation');
let startOperatingHour = getId('startOperatingHour');
let endOperatingHour = getId('endOperatingHour');
let editTradeCategory = getId('editTradeCategory');
let subCategorySelect = getId('sub-category-select');
let subCategoryManual = getId('sub-category-manual');
let minorSubCategorySelect = getId('minor-sub-category-select')
let minorSubCategoryManual = getId('minor-sub-category-manual');
let editBusinessScale = getId('editBusinessScale');
let editLanguagesOfCommunication = getId('editLanguagesOfCommunication');
let tagInput = getId('tag-input');




const API_URL = {
    users_upload_files: `${host}/uploads/users_upload_files/`,
    banner_placeholder: `${host}/uploads/placeholder/banner-placeholder.png`,
    logo_placeholder: `${host}/uploads/placeholder/logo-placeholder.jpg`,
    get_users_logo_and_banner: `${host}/api/get/users-logo-and-banners`,
    get_company_details: `${host}/api/get/company-details`,
    get_user: `${host}/api/get/user`,
    get_users_account: `${host}/api/get/users-account`,
    get_users_address: `${host}/api/get/users-address`,
    update_company_banner: `${host}/api/post/update-trader-company-banner`,
    update_company_logo: `${host}/api/post/update-trader-company-logo`,
};

$(function () {
    // getUsersBusinessBrochures();
});

//============================
// COMPANY DETAILS - [START]
//============================
function getCompanyDetails() {
    fetch(API_URL.get_company_details, {
        method: 'POST',
    })
        .then((response) => response.json())
        .then((data) => {
            const {
                business_name,
                business_tagline,
                business_email,
                business_contact,
                business_website,
                business_social_media_contact_number,
                business_address,
                business_city,
                business_states,
                business_country,
                region_of_operation,
                city_of_operation,
                states_of_operation,
                country_of_operation,
                business_language_of_communication,
            } = data[0];

            // display
            displayCompanyName.innerHTML = business_name || 'N/A';
            displayCompanyTagline.innerHTML = business_tagline || 'N/A';
            displayBusinessEmail.innerHTML = business_email;
            displayBusinessContact.innerHTML = business_contact;
            displayBusinessWebsite.innerHTML = business_website || 'N/A';
            displayBusinessSocialMediaContact.innerHTML = business_social_media_contact_number;
            displayBusinessAddress.innerHTML = business_address ? `${business_address}, ` : ' ';
            getCityNameToBeDisplayUsingCode(business_city, 'displayBusinessAddressCity');
            getStatesNameToBeDisplayUsingCode(business_states, 'displayBusinessAddressStates');
            getCountryNameUsingCode(business_country, 'displayBusinessAddressCountry');
            getRegionNameUsingCode(region_of_operation, 'displayBusinessRegionOfOperation');
            getCityOfOperationNameUsingCode(city_of_operation, 'displayBusinessCityOfOperation');
            getStatesOfOperationNameUsingCode(states_of_operation, 'displayBusinessStatesOfOperation');
            getCountryOfOperationNameUsingCode(country_of_operation, 'displayBusinessCountryOfOperation');
            getLanguageName(business_language_of_communication, 'displayLanguageOfComm');
            if (!business_address && !business_city && !business_states && !business_country) {
                displayBusinessAddress.innerHTML = 'N/A';
            }

            // edit
            companyName.value = business_name || '';
            tagline.value = business_tagline || '';
            businessEmailAddress.value = business_email;
            businessContactNumber.value = business_contact;
            website.value = business_website || 'N/A';
            // businessSocialMediaContactType
            businessSocialMediaContactNumber.value = business_social_media_contact_number
            businessAddress = business_address || '';

        })
        .catch((error) => {
            console.error(error);
        });
}

function getCityNameToBeDisplayUsingCode(code, elementId) {
    let element_id = getId(elementId);

    if (!code) {
        element_id.innerHTML = ' ';
        return;
    }

    if (code === 'No Cities Found') {
        element_id.innerHTML = ' ';
        return;
    }

    fetch('assets/json/cities.json')
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            let filtered = data.filter((d) => d.id == code);
            if (filtered.length > 0) {
                element_id.innerHTML = filtered[0].name + ', ';
            } else {
                element_id.innerHTML = ' ';
            }
        });
}

function getStatesNameToBeDisplayUsingCode(code, elementId) {
    let element_id = getId(elementId);

    if (!code) {
        element_id.innerHTML = ' ';
        return;
    }

    if (code === 'No States Found') {
        element_id.innerHTML = ' ';
        return;
    }

    fetch('assets/json/states.json')
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            let filtered = data.filter((d) => d.id == code);
            if (filtered.length > 0) {
                element_id.innerHTML = filtered[0].name + ', ';
            } else {
                element_id.innerHTML = ' ';
            }
        });
}

function getCountryNameUsingCode(code, elementId) {
    let element_id = getId(elementId);

    if (!code) {
        element_id.innerHTML = ' ';
        return;
    }

    fetch('assets/json/countries.json')
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            let filtered = data.filter((d) => d.iso2 == code);
            if (filtered.length > 0) {
                element_id.innerHTML = filtered[0].name;
            } else {
                element_id.innerHTML = ' ';
            }
        });
}

function getLanguageName(string, elementId) {
    let element_id = getId(elementId);

    if (!string) {
        element_id.innerHTML = 'N/A';
        return;
    }

    let data = string.split(',');
    for (var i = 0; i < data.length; i++) {
        element_id.innerHTML =
            element_id.innerHTML +
            '<a href="#" class="bg-gray-200 py-1.5 px-4 rounded-full">' +
            getLanguageNameByCode(data[i]) +
            '</a>';
    }
}

function getLanguageNameByCode(code) {
    let value;
    $.ajax({
        url: host + '/api/get/language-name-by-code/' + code,
        async: false,
        success: function (data) {
            value = data[0].name;
        },
    });
    return value;
}

async function getUsersBusinessCharacteristics() {
    try {
        const response = await fetch('/api/get/user-business-characteristics', { method: 'POST' });
        const data = await response.json();
        if (!data || data.length === 0) {
            return;
        }
        const {
            business_major_category,
            business_sub_category,
            business_sub_category_str,
            business_minor_sub_category,
            business_minor_sub_category_str,
            business_scale,
            business_industry_belong_to,
        } = data[0];
        displayBusinessTradeCategory.textContent = getTradeCategoriesTitleById(business_major_category);
        displayBusinessSubCategory.textContent = getSubCategoriesTitleById(
            business_sub_category,
            business_sub_category_str,
        );
        displayBusinessMinorCategory.textContent = getMinorSubCategoriesTitleById(
            business_minor_sub_category,
            business_minor_sub_category_str,
        );
        displayBusinessScale.textContent = getBusinessScaleTitle(business_scale);
        formattingBusinessTags(business_industry_belong_to, 'displayBusinessTags');
    } catch (error) {
        console.error(error);
    }
}

function getTradeCategoriesTitleById(tradeCategoryId) {
    if (!tradeCategoryId) {
        return 'N/A';
    }

    if (tradeCategoryId) {
        let value;
        $.ajax({
            url: host + '/api/get/trade-category-title-by-id/' + tradeCategoryId,
            async: false,
            success: function (data) {
                value = data[0].title;
            },
        });
        return value;
    }
}

function getSubCategoriesTitleById(subCategoryId, string) {
    if (!subCategoryId && !string) {
        return 'N/A';
    }

    if (subCategoryId) {
        let value;
        $.ajax({
            url: host + '/api/get/sub-category-title-by-id/' + subCategoryId,
            async: false,
            success: function (data) {
                value = data[0].title;
            },
        });
        return value;
    }

    if (string) {
        return string;
    }
}

function getMinorSubCategoriesTitleById(minorSubCategoryId, string) {
    if (!minorSubCategoryId && !string) {
        return 'N/A';
    }

    if (minorSubCategoryId) {
        let value;
        $.ajax({
            url: host + '/api/get/minor-sub-category-title-by-id/' + minorSubCategoryId,
            async: false,
            success: function (data) {
                value = data[0].title;
            },
        });
        return value;
    }

    if (string) {
        return string;
    }
}

function getBusinessScaleTitle(id) {
    let value;

    switch (id) {
        case 1:
            value = 'Small Scale';
            break;
        case 2:
            value = 'Medium Scale';
            break;
        case 3:
            value = 'Large Scale';
            break;
        default:
            value = 'N/A';
    }

    return value;
}

function formattingBusinessTags(string, elementId) {
    let element_id = getId(elementId);

    if (!string) {
        element_id.innerHTML = 'N/A';
    }

    if (string) {
        let data = string.split(',');
        for (var i = 0; i < data.length; i++) {
            element_id.innerHTML =
                element_id.innerHTML + '<a href="#" class="bg-gray-200 py-1.5 px-4 rounded-full">' + data[i] + '</a>';
        }
    }
}
//============================
// COMPANY DETAILS - [END]
//============================

//====================================
// REPRESENTATIVE DETAILS - [START]
//====================================
async function getUser() {
    try {
        const response = await fetch(API_URL.get_user, { method: 'POST' });
        const data = await response.json();
        const firstName = data[0]?.first_name || '';
        const lastName = data[0]?.last_name || '';
        displayReprestativeFullname.textContent = `${firstName} ${lastName}`;
    } catch (error) {
        console.error(error);
    }
}

async function getUsersAccount() {
    try {
        const response = await fetch(API_URL.get_users_account, { method: 'POST' });
        const data = await response.json();
        const { email_or_social_media, contact_number } = data[0] || {};
        displayReprestativeEmailAddress.textContent = email_or_social_media || '';
        displayReprestativeContactNumber.textContent = contact_number || '';
    } catch (error) {
        console.error(error);
    }
}

async function getUsersAddress() {
    try {
        const response = await fetch(API_URL.get_users_address, { method: 'POST' });
        const data = await response.json();
        if (!data || data.length === 0) {
            displayReprestativeAddress.textContent = 'N/A';
            return;
        }
        const { address, city, state_or_province, country } = data[0];
        displayReprestativeAddress.textContent = address || 'N/A';
        getCityNameToBeDisplayUsingCode(city, 'displayReprestativeAddressCity');
        getStatesNameToBeDisplayUsingCode(state_or_province, 'displayReprestativeAddressStates');
        getCountryNameUsingCode(country, 'displayReprestativeAddressCountry');
    } catch (error) {
        console.error(error);
    }
}

//====================================
// REPRESENTATIVE DETAILS - [END]
//====================================

//=======================================
// REGION OF OPERATION DETAILS - [START]
//=======================================
function getRegionNameUsingCode(string, elementId) {
    let element_id = getId(elementId);

    if (!string) {
        element_id.innerHTML = 'N/A';
        return;
    }

    if (string) {
        let data = string.split(',');
        for (var i = 0; i < data.length; i++) {
            element_id.innerHTML =
                element_id.innerHTML + '<a href="#" class="bg-gray-200 py-1.5 px-4 rounded-full">' + data[i] + '</a>';
        }
    }
}

function getCountryOfOperationNameUsingCode(code, elementId) {
    let element_id = getId(elementId);

    if (!code) {
        element_id.innerHTML = ' ';
        return;
    }

    let data = code.split(',');
    for (var i = 0; i < data.length; i++) {
        element_id.innerHTML =
            element_id.innerHTML + '<a href="#" class="bg-gray-200 py-1.5 px-4 rounded-full">' + data[i] + '</a>';
    }
}

function getStatesOfOperationNameUsingCode(code, elementId) {
    let element_id = getId(elementId);

    if (!code) {
        element_id.innerHTML = 'N/A';
        return;
    }

    if (code === 'No States Found') {
        element_id.innerHTML = 'N/A';
        return;
    }

    fetch('assets/json/states.json')
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            let filtered = data.filter((d) => d.id == code);
            element_id.innerHTML = filtered[0].name;
        });
}

function getCityOfOperationNameUsingCode(code, elementId) {
    let element_id = getId(elementId);

    if (!code) {
        element_id.innerHTML = 'N/A';
        return;
    }

    fetch('assets/json/cities.json')
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            let filtered = data.filter((d) => d.id == code);
            element_id.innerHTML = filtered[0].name;
        });
}
//=====================================
// REGION OF OPERATION DETAILS - [END]
//=====================================

//====================================
// UPDATE COMPANY DETAILS - [START]
//====================================
btnCompanyDetailsEdit.addEventListener('click', (e) => {
    divCompanyDetails.style.display = 'none';
    divUpdateCompanyDetails.style.display = 'block';
});

btnCompanyDetailsCancelEdit.addEventListener('click', (e) => {
    divCompanyDetails.style.display = 'block';
    divUpdateCompanyDetails.style.display = 'none';
});

//====================================
// UPDATE COMPANY DETAILS - [END]
//====================================

async function getUsersLogoAndBanner() {
    try {
        const data = await $.ajax({
            url: API_URL.get_users_logo_and_banner,
            type: 'GET',
        });

        const firstData = data[0] || {};
        const { banner, logo, id } = firstData;

        if (banner) {
            companyBannerPreview.src = `${API_URL.users_upload_files}${banner}`;
        } else {
            companyBannerPreview.src = API_URL.banner_placeholder;
        }

        if (logo) {
            companyLogoPreview.src = `${API_URL.users_upload_files}${logo}`;
            userImage.src = `${API_URL.users_upload_files}${logo}`;
            isAvatar.src = `${API_URL.users_upload_files}${logo}`;
        } else {
            companyLogoPreview.src = API_URL.logo_placeholder;
            userImage.src = API_URL.logo_placeholder;
            isAvatar.src = API_URL.logo_placeholder;
        }

        companyLogoId.value = id;
        companyBannerId.value = id;
    } catch (error) {
        console.log(error);
    }
}

//====================
// BANNNER - START
//====================
companyBanner.onchange = (evt) => {
    const [file] = companyBanner.files;
    if (file) {
        companyBannerPreview.src = URL.createObjectURL(file);
        editcompanyBanner();
    }
};

function editcompanyBanner() {
    // Get form
    let form = $('#editcompanyBanner')[0];

    // Create an FormData object
    let data = new FormData(form);

    $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: API_URL.update_company_banner,
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        async: true,
        success: function (data) {
            // some code here
        },
        // error: function (e) {},
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 413) {
                console.error('Request Entity Too Large');
                console.log('Request Entity Too Large');
                Swal.fire('Warning', 'Try to upload file image lower than 1mb', 'warning');
                // Handle error response
            }
        },
    });
}
//====================
// BANNNER - END
//====================

//====================
// LOGO - START
//====================
companyLogo.onchange = (evt) => {
    const [file] = companyLogo.files;
    if (file) {
        companyLogoPreview.src = URL.createObjectURL(file);
        editcompanyLogo();
    }
};

function editcompanyLogo() {
    // Get form
    let form = $('#editcompanyLogo')[0];

    // Create an FormData object
    let data = new FormData(form);

    $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: API_URL.update_company_logo,
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            // some code here
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 413) {
                console.error('Request Entity Too Large');
                console.log('Request Entity Too Large');
                Swal.fire('Warning', 'Try to upload file image lower than 1mb', 'warning');
                // Handle error response
            }
        },
    });
}
//====================
// LOGO - END
//====================

Promise.all([
    getCompanyDetails(),
    getUser(),
    getUsersAccount(),
    getUsersAddress(),
    getUsersBusinessCharacteristics(),
    getUsersLogoAndBanner(),
]);

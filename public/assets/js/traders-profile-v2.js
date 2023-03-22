const displayCompanyName = getId('displayCompanyName');
const displayCompanyTagline = getId('displayCompanyTagline');
const displayBusinessEmail = getId('displayBusinessEmail');
const displayBusinessContact = getId('displayBusinessContact');
const displayBusinessWebsite = getId('displayBusinessWebsite');
const displayBusinessSocialMediaContact = getId('displayBusinessSocialMediaContact');
const displayBusinessAddress = getId('displayBusinessAddress');
const displayBusinessRegionOfOperation = getId('displayBusinessRegionOfOperation');
const displayBusinessTradeCategory = getId('displayBusinessTradeCategory');
const displayBusinessSubCategory = getId('displayBusinessSubCategory');
const displayBusinessMinorCategory = getId('displayBusinessMinorCategory');
const displayBusinessScale = getId('displayBusinessScale');
const displayBusinessTags = getId('displayBusinessTags');

const displayReprestativeFullname = getId('displayReprestativeFullname');
const displayReprestativeEmailAddress = getId('displayReprestativeEmailAddress');
const displayReprestativeContactNumber = getId('displayReprestativeContactNumber');
const displayReprestativeAddress = getId('displayReprestativeAddress');

const divCompanyDetails = getId('divCompanyDetails');
const divUpdateCompanyDetails = getId('divUpdateCompanyDetails');
const btnCompanyDetailsEdit = getId('btnCompanyDetailsEdit');
const btnCompanyDetailsCancelEdit = getId('btnCompanyDetailsCancelEdit');

const companyBanner = getId('companyBanner');
const companyBannerPreview = getId('companyBannerPreview');
const companyBannerId = getId('companyBannerId');
const companyLogo = getId('companyLogo');
const companyLogoPreview = getId('companyLogoPreview');
const companyLogoId = getId('companyLogoId');
const userImage = getId('user-image');
const isAvatar = getId('is_avatar');

//edit
const companyName = getId('companyName');
const tagline = getId('tagline');
const businessEmailAddress = getId('businessEmailAddress');
const businessContactNumber = getId('businessContactNumber');
const website = getId('website');
const businessSocialMediaContactType = getId('businessSocialMediaContactType');
const businessSocialMediaContactNumber = getId('businessSocialMediaContactNumber');
const businessAddress = getId('businessAddress');
const editBusinessCountryLocation = getId('editBusinessCountryLocation');
const editBusinessStatesLocation = getId('editBusinessStatesLocation');
const editBusinessCityLocation = getId('editBusinessCityLocation');
const startOperatingHour = getId('startOperatingHour');
const endOperatingHour = getId('endOperatingHour');
const editTradeCategory = getId('editTradeCategory');
const subCategorySelect = getId('sub-category-select');
const subCategoryManual = getId('sub-category-manual');
const minorSubCategorySelect = getId('minor-sub-category-select');
const minorSubCategoryManual = getId('minor-sub-category-manual');
const editBusinessScale = getId('editBusinessScale');
const editLanguagesOfCommunication = getId('editLanguagesOfCommunication');
const tagInput = getId('tag-input');

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
    create_communicator_link: `${host}/api/get/create-communicator-link`,
    get_current_visitor: `${host}/api/post/get-current-visitor`,
    email_payment_account: `${host}/api/post/email-payment-account`,
    communicator_domain: `https://meet.allworldtrade.com/join/`,
    //communicator_domain: 'https://meet2.allworldtrade.com/groupcall/' //old
    download_current_visitor_data: `${host}/download-current-visitor-data`,
};

// $(function () {
//     // getUsersBusinessBrochures();
// });

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
                business_social_media_contact_type,
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
            getCityNameToBeDisplayUsingCode(
                business_country,
                business_states,
                business_city,
                'displayBusinessAddressCity',
            );
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
            getBusinessSocialMediaContactType(business_social_media_contact_type, 'businessSocialMediaContactType');
            businessSocialMediaContactNumber.value = business_social_media_contact_number;
            businessAddress.value = business_address || '';
            getBusinessCountryLocationToBeEditAndOptions(business_country, 'editBusinessCountryLocation');
            getBusinessStatesLocationToBeEditAndOptions(
                business_country,
                business_states,
                'editBusinessStatesLocation',
            );
            getBusinessCityLocationToBeEditAndOptions(
                business_country,
                business_states,
                business_city,
                'editBusinessCityLocation',
            );

            // getBusinessCountryLocationToBeEditAndOptions(data, 'editBusinessCountryLocation');
            // getBusinessStatesLocationToBeEditAndOptions(data, 'editBusinessStatesLocation');
            // getBusinessCityLocationToBeEditAndOptions(data, 'editBusinessCityLocation');
            // getRegionOfOperationFunction(data);
            // getCountryOfOperation(data);
            // getCountryForState(data);
            // getStatesOfOperation(data);
            // getCityOfOperation(data);
        })
        .catch((error) => {
            console.error(error);
        });
}

async function getCityNameToBeDisplayUsingCode(countryCode, stateId, cityId, elementId) {
    const element_id = getId(elementId);

    // if (cityId && cityId !== 'No Cities Found') {
    //     const cities = await fetchCities();
    //     const citiesUnderCountry = cities.filter(({ country_code }) => country_code === countryCode);
    //     const citiesUnderCountryAndState = citiesUnderCountry.filter(({ state_id }) => state_id === parseInt(stateId));
    //     const selectedCity = citiesUnderCountryAndState.find((d) => d.id === parseInt(cityId));

    //     console.log('selectedCity: ', selectedCity);
    //     element_id.innerHTML = selectedCity ? selectedCity.name + ', ' : ' ';
    // } else {
    //     element_id.innerHTML = ' ';
    // }

    if (cityId || cityId !== 'No States Found') {
        const cities = await fetchCities();
        const selectedCity = cities.find((d) => d.id === parseInt(cityId));
        console.log('selectedCity: ', selectedCity);
        element_id.innerHTML = selectedCity ? selectedCity.name + ', ' : ' ';
    } else {
        element_id.innerHTML = ' ';
    }
}

async function getStatesNameToBeDisplayUsingCode(code, elementId) {
    const element_id = getId(elementId);

    if (code && code !== 'No States Found') {
        const states = await fetchStates();
        const filtered = states.filter((d) => d.id == code);
        element_id.innerHTML = filtered.length > 0 ? filtered[0].name + ', ' : ' ';
    } else {
        element_id.innerHTML = ' ';
    }
}

async function getCountryNameUsingCode(code, elementId) {
    const element_id = getId(elementId);

    if (code) {
        const countries = await fetchCountries();
        const filtered = countries.filter((d) => d.iso2 == code);
        element_id.innerHTML = filtered.length > 0 ? filtered[0].name : ' ';
    } else {
        element_id.innerHTML = ' ';
    }
}

function getLanguageName(string, elementId) {
    const element_id = getId(elementId);

    if (!string) {
        element_id.innerHTML = 'N/A';
        return;
    }

    const data = string.split(',');
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
    const element_id = getId(elementId);

    if (!string) {
        element_id.innerHTML = 'N/A';
    }

    if (string) {
        const data = string.split(',');
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
            displayReprestativeAddress.textContent = ' ';
            return;
        }
        const { address, city, state_or_province, country } = data[0];
        displayReprestativeAddress.textContent = address || ' ';
        getCityNameToBeDisplayUsingCode(country, state_or_province, city, 'displayReprestativeAddressCity');
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
    const element_id = getId(elementId);

    if (!string) {
        element_id.innerHTML = 'N/A';
        return;
    }

    if (string) {
        const data = string.split(',');
        for (var i = 0; i < data.length; i++) {
            element_id.innerHTML =
                element_id.innerHTML + '<a href="#" class="bg-gray-200 py-1.5 px-4 rounded-full">' + data[i] + '</a>';
        }
    }
}

function getCountryOfOperationNameUsingCode(code, elementId) {
    const element_id = getId(elementId);

    if (!code) {
        element_id.innerHTML = 'N/A';
        return;
    }

    const data = code.split(',');
    for (var i = 0; i < data.length; i++) {
        element_id.innerHTML =
            element_id.innerHTML + '<a href="#" class="bg-gray-200 py-1.5 px-4 rounded-full">' + data[i] + '</a>';
    }
}

async function getStatesOfOperationNameUsingCode(stateId, elementId) {
    const element_id = getId(elementId);

    // if (!stateId || stateId === 'No States Found') {
    //     element_id.innerHTML = 'N/A';
    //     return;
    // }

    // fetch('assets/json/states.json')
    //     .then(function (resp) {
    //         return resp.json();
    //     })
    //     .then(function (data) {
    //         const filtered = data.filter((d) => d.id == stateId);
    //         element_id.innerHTML = filtered[0].name;
    //     });

    if (stateId && stateId !== 'No States Found') {
        const states = await fetchStates();
        const selectedState = states.find((d) => d.id === parseInt(stateId));
        console.log('selectedState: ', selectedState);
        element_id.innerHTML = selectedState ? selectedState.name : ' ';
    } else {
        element_id.innerHTML = 'N/A';
    }
}

async function getCityOfOperationNameUsingCode(cityId, elementId) {
    const element_id = getId(elementId);

    // if (!cityId) {
    //     element_id.innerHTML = 'N/A';
    //     return;
    // }

    // fetch('assets/json/cities.json')
    //     .then(function (resp) {
    //         return resp.json();
    //     })
    //     .then(function (data) {
    //         const filtered = data.filter((d) => d.id == cityId);
    //         element_id.innerHTML = filtered[0].name;
    //     });

    if (cityId && cityId !== 'No States Found') {
        const cities = await fetchCities();
        const selectedCity = cities.find((d) => d.id === parseInt(cityId));
        console.log('selectedCity: ', selectedCity);
        element_id.innerHTML = selectedCity ? selectedCity.name : ' ';
    } else {
        element_id.innerHTML = 'N/A';
    }
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

function getBusinessSocialMediaContactType(selectedValue, elementId) {
    const element_id = document.getElementById(elementId);
    const companyDetails = [
        { id: '', title: 'None' },
        { id: '1', title: 'Viber' },
        { id: '2', title: 'Wechat' },
        { id: '3', title: 'Whatsapp' },
    ];

    if (!selectedValue || selectedValue === '' || selectedValue === null) {
        element_id.innerHTML = companyDetails
            .map((detail) => `<option value="${detail.id}">${detail.title}</option>`)
            .join('');
    } else {
        const selectedOption = companyDetails.find((detail) => detail.id == selectedValue);
        const optionsToRender = companyDetails.filter((detail) => detail.id != selectedValue);
        const optionsHtml = optionsToRender
            .map((detail) => `<option value="${detail.id}">${detail.title}</option>`)
            .join('');
        element_id.innerHTML = `<option value="${selectedOption.id}">${selectedOption.title}</option>${optionsHtml}`;
        element_id.value = selectedValue;
    }

    $(`#${elementId}`).selectpicker('refresh');
}

async function fetchCountries() {
    const resp = await fetch('assets/json/countries.json');
    const countries = await resp.json();
    return countries;
}

async function getBusinessCountryLocationToBeEditAndOptions(countryCode, elementId) {
    const element = getId(elementId);
    const countries = await fetchCountries();
    const selectedCountry = countries.find((country) => country.iso2 === countryCode);

    element.innerHTML = countryCode
        ? `<option value="${selectedCountry.iso2}">${selectedCountry.name}</option>`
        : '<option value="">Select Country</option>';

    const countriesToRender = countries.filter((country) => country.iso2 !== countryCode);
    businessCountryLocationForOfLoop(countriesToRender, element);

    $(`#${elementId}`).selectpicker('refresh');
}

function businessCountryLocationForOfLoop(countriesOptionsToRender, element_id) {
    for (const country of countriesOptionsToRender) {
        const option = document.createElement('option');
        option.value = country.iso2;
        option.textContent = country.name;
        element_id.appendChild(option);
    }
}

async function fetchStates() {
    const resp = await fetch('assets/json/states.json');
    const states = await resp.json();
    return states;
}

function initialOption(value = null, title, element) {
    element.innerHTML = `<option value="${value}">${title}</option>`;
    $(element).selectpicker('refresh');
}

async function getBusinessStatesLocationToBeEditAndOptions(countryCode, stateId, elementId) {
    try {
        const element = getId(elementId);
        !countryCode ? initialOption(null, 'Select Country First', element) : null;
        stateId === 'No States Found' ? initialOption('No States Found', 'No States Found', element) : null;

        const states = await fetchStates();
        const statesInCountry = states.filter((state) => state.country_code === countryCode);

        if (!stateId) {
            initialOption(null, 'Select States', element);
            businessStatesLocationForOfLoop(statesInCountry, element);
        } else {
            const selectedState = states.find((state) => state.id === parseInt(stateId));
            initialOption(selectedState.id, selectedState.name, element);
            const statesToRender = statesInCountry.filter((state) => state.id !== parseInt(stateId));
            businessStatesLocationForOfLoop(statesToRender, element);
        }
    } catch (error) {
        console.error('Error fetching states:', error);
    }
}

function businessStatesLocationForOfLoop(statesOptionsToRender, element_id) {
    for (const state of statesOptionsToRender) {
        const option = document.createElement('option');
        option.value = state.id;
        option.textContent = state.name;
        element_id.appendChild(option);
    }
    $(element_id).selectpicker('refresh');
}

async function fetchCities() {
    const response = await fetch('assets/json/cities.json');
    const cities = await response.json();
    return cities;
}

async function getBusinessCityLocationToBeEditAndOptions(countryCode, stateId, cityId, elementId) {
    try {
        const element = document.getElementById(elementId);
        let citiesUnderCountry, citiesUnderCountryAndState, selectedCity, otherCitiesUnderCountryAndState;

        if (cityId === 'No Cities Found') {
            element.innerHTML = '<option value="No Cities Found">No Cities Found</option>';
        }

        if (stateId === 'No States Found') {
            element.innerHTML = '<option value="No States Found">No States Found</option>';
        }

        if (!countryCode || !stateId) {
            element.innerHTML = '<option value="">Select Country and State First</option>';
        }

        if (countryCode && stateId && !cityId) {
            const cities = await fetchCities();
            citiesUnderCountry = cities.filter(({ country_code }) => country_code === countryCode);
            citiesUnderCountryAndState = citiesUnderCountry.filter(({ state_id }) => state_id === parseInt(stateId));

            element.innerHTML = '<option value="">Select City</option>';
            businessCityLocationForEachLoop(citiesUnderCountryAndState, element);
        }

        if (countryCode && stateId && cityId) {
            const cities = await fetchCities();
            citiesUnderCountry = cities.filter(({ country_code }) => country_code === countryCode);
            citiesUnderCountryAndState = citiesUnderCountry.filter(({ state_id }) => state_id === parseInt(stateId));
            selectedCity = citiesUnderCountryAndState.filter(({ id }) => id === parseInt(cityId));
            otherCitiesUnderCountryAndState = citiesUnderCountryAndState.filter(({ id }) => id !== parseInt(cityId));

            element.innerHTML = `<option value="${selectedCity[0].id}">${selectedCity[0].name}</option>`;
            businessCityLocationForEachLoop(otherCitiesUnderCountryAndState, element);
        }

        $(`#${elementId}`).selectpicker('refresh');
    } catch (error) {
        console.error('Error fetching states:', error);
    }
}

function businessCityLocationForEachLoop(citiesOptionsToRender, elementId) {
    citiesOptionsToRender.forEach(({ id, name }) => {
        const option = document.createElement('option');
        option.value = id;
        option.innerHTML = name;
        elementId.appendChild(option);
    });
}

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
    const form = $('#editcompanyBanner')[0];

    // Create an FormData object
    const data = new FormData(form);

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
    const form = $('#editcompanyLogo')[0];

    // Create an FormData object
    const data = new FormData(form);

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

//=================================
// THREE FUNCTION BUTTON - START
//=================================

const createCommunicatorLink = () => {
    fetch(API_URL.create_communicator_link, {
        method: 'POST',
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.communicator) {
                window.open(API_URL.communicator_domain + data.communicator, '_blank');
            }
        })
        .catch((error) => console.error(error));
};

const downloadCurrentVisitorData = async () => {
    try {
        const response = await fetch(API_URL.get_current_visitor, {
            method: 'POST',
        });
        const res = await response.json();

        if (res.length > 0) {
            const result = await Swal.fire({
                title: 'Download?',
                text: 'Do you want to download visitor details?',
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, download!',
            });

            if (result.isConfirmed) {
                window.location = API_URL.download_current_visitor_data;
            }
        } else {
            Swal.fire('Success', 'Currently No Visitors', 'success');
        }
    } catch (error) {
        console.error(error);
    }
};

function paymentAccount() {
    $.ajax({
        url: API_URL.email_payment_account,
        type: 'POST',
        data: {
            email: sessionEmail,
        },
        success: function (data) {
            if (data === 'email sent') {
                Swal.fire('Success', 'Email Sent. Kindly check you email address inbox or spam folder', 'success');
            } else {
                Swal.fire('Warning', 'Email not sent. Report to customer service', 'warning');
            }
        },
        error: function (e) {
            // some code here
        },
    });
}

//==============================
// THREE FUNCTION BUTTON - END
//==============================

Promise.all([
    getCompanyDetails(),
    getUser(),
    getUsersAccount(),
    getUsersAddress(),
    getUsersBusinessCharacteristics(),
    getUsersLogoAndBanner(),
]);

// PREV NEXT ICONS IN SLIDES
let selectionsNextSlide = getId('selections-next-slide');
let selectionsPrevSlide = getId('selections-prev-slide');

//CARD LAYOUT OF SELECTION (lef,tmid,right)
let selectionLeftColumn = getId('selectionLeftColumn');
let selectionMidColumnCompanyBanner = getId('selectionMidColumnCompanyBanner');
let cardForDetailsOfSpecificCompany = getId('cardForDetailsOfSpecificCompany');
let cardForCompanySearchResult = getId('cardForCompanySearchResult');

// SCOPE OF OPERATION
let selectionRegionOfOperation = getId('selectionRegionOfOperation');
let displayselectedRegionOfOperation = getId('displayselectedRegionOfOperation');
let displaySelectedCountry = getId('displaySelectedCountry');
let displaySelectedState = getId('displaySelectedState');
let displaySelectedCity = getId('displaySelectedCity');
let selectedRegionOfOperation = getId('selectedRegionOfOperation');
let selectedCountry = getId('selectedCountry');
let selectedState = getId('selectedState');
let selectedCity = getId('selectedCity');

// IN THE BOTTOM PART OF REGION OF OPERATION BUT IDEPENDENT IDENTITY
let displaySelectedBusinessScale = getId('displaySelectedBusinessScale');
let selectedBusinessScale = getId('selectedBusinessScale');

let displaySelectedlanguage = getId('displaySelectedlanguage');
let selectedLanguage = getId('selectedLanguage');
let languageDiv = getId('language');

// SELECTION CATEGORY
let tradeCategories = getId('trade-categories');
let subCategories = getId('sub-categories');
let minorSubCategories = getId('minor-sub-categories');
let displaySelectedTradeCategories = getId('displaySelectedTradeCategories');
let displaySelectedSubCategories = getId('displaySelectedSubCategories');
let displaySelectedMinorSubCategories = getId('displaySelectedMinorSubCategories');
let selectedTradeCategories = getId('selectedTradeCategories');
let selectedSubCategories = getId('selectedSubCategories');
let selectedMinorSubCategories = getId('selectedMinorSubCategories');

// SEARCH BY
let product_service_input = getId('product_service_input');
let company_name_input = getId('company_name_input');
let searchByProductOrCompanyName = getId('searchByProductOrCompanyName');

// ul kung saan nag concatenate yung mga image sa carousel
let companiesProfilePicture = getId('companiesProfilePicture');

// BREADCRUMB
let displaySearchParameterId = getId('displaySearchParameter');

// COMPANY DETAILS
let businessIndustryBelongId = getId('selection-business-industry-belong');
let businessLanguageOfCommunicationId = getId('selection-business-language-of-communication');
let companyNameId = getId('selection-company-name');
let companyTaglineId = getId('selection-company-tagline');
let businessMajorCategoryId = getId('selection-business-major-category');
let businessSubCategoryId = getId('selection-business-sub-category');
let businessMinorSubCategoryId = getId('selection-business-minor-sub-category');
let businessScaleId = getId('selection-business-scale');
let companyRegionOfOperationsId = getId('selection-company-region-of-operations');
let countryOfOperationsId = getId('selection-company-country-of-operations');
let stateOfOperationsId = getId('selection-company-state-of-operations');
let cityOfOperationsId = getId('selection-company-city-of-operations');
let localOperatingTimeId = getId('local-operating-time');
let uctOperatingTimeId = getId('uct-operating-time');

// RESULT
let topSelectionResultsId = getId('top-selection-results');

// di ko gets kung para saan itong fixed-top-mid
const fixedTopMid = document.querySelector('.fixed-top-mid');

product_service_input.style.display = 'block';
company_name_input.style.display = 'none';

const companyDetailsJsonObj2 = [];
const dataForDisplaySearchParameter = [];
let intervalId = null;
let varCounter = 0;
let timer;
let num = 0;

$(function () {
    getCompaniesRelatedToCurrentUser();
    displayFirstCompanyDetails();
    displayTopCompany();
});

function getCompaniesRelatedToCurrentUser() {
    $.ajax({
        url: '/api/get/get-companies-related-to-current-user',
        type: 'POST',
        async: false,
        success: function (data) {
            if (data.length > 0) {
                companyDetailsJsonObj2.push(data);
                dataForDisplaySearchParameter.push(data[0]);

                const adjustedScreenHeight = window.innerHeight - 125;
                const img = new Image();
                img.className = 'companyBannerPreview';
                img.id = 'companyBannerPreview';
                img.onload = function () {
                    this.style.height = '';
                    this.style.height = `${adjustedScreenHeight}px`;
                };

                let adjustedScreenHeight2 = (window.innerHeight - 125) / 2;
                selectionsPrevSlide.style.top = `${adjustedScreenHeight2}px`;
                selectionsNextSlide.style.top = `${adjustedScreenHeight2}px`;

                companiesProfilePicture.innerHTML = '';
                const fragment = document.createDocumentFragment();

                for (let i = data.length - 1; i >= 0; i--) {
                    const bannerTitle = getCompaniesProfilePicture(data[i]['id'], data[i]['uuid']);
                    if (bannerTitle) {
                        const bannerSrc = host + '/uploads/users_upload_files/' + bannerTitle[0].banner;
                        img.src = bannerSrc;
                    }

                    const li = document.createElement('li');
                    li.appendChild(img.cloneNode());
                    fragment.appendChild(li);
                }

                companiesProfilePicture.appendChild(fragment);

                displaySearchParameter();
            } else {
                const data = {
                    message: 'empty',
                };
                companyDetailsJsonObj2.push(data);
            }
        },
    });
}

function displayFirstCompanyDetails() {
    const [firstCompany] = companyDetailsJsonObj2[0];
    // console.log('displayFirstCompanyDetails firstCompany: ', firstCompany);
    // console.log(
    //     'displayFirstCompanyDetails firstCompany companyDetailsJsonObj2[0].length: ',
    //     companyDetailsJsonObj2[0].length,
    // );
    // console.log('displayFirstCompanyDetails companyDetailsJsonObj2[0]: ', companyDetailsJsonObj2[0]);

    if (firstCompany === undefined) {
        replaceDashCompanyDetailsDiv();
        return;
    }

    const {
        business_name,
        business_tagline,
        business_language_of_communication,
        business_major_category,
        business_sub_category,
        business_minor_sub_category,
        business_scale,
        business_industry_belong_to,
        country_of_operation,
        states_of_operation,
        city_of_operation,
        region_of_operation,
        start_operating_hour,
        end_operating_hour,
    } = firstCompany;

    companyNameId.innerHTML = business_name;
    companyTaglineId.innerHTML = business_tagline || 'N/A';
    business_language_of_communication ? formattingLanguageName(business_language_of_communication) : '';
    businessMajorCategoryId.innerHTML = business_major_category
        ? getTradeCategoriesTitleById(business_major_category)
        : 'N/A';
    businessSubCategoryId.innerHTML = business_sub_category ? getSubCategoriesTitleById(business_sub_category) : 'N/A';
    businessMinorSubCategoryId.innerHTML = business_minor_sub_category
        ? getMinorSubCategoriesTitleById(business_minor_sub_category)
        : 'N/A';
    businessScaleId.innerHTML = business_scale ? getBusinessScaleTitle(business_scale) : 'N/A';

    business_industry_belong_to ? formattingBusinessTags(business_industry_belong_to) : '';

    country_of_operation
        ? getCountryNameUsingCode(country_of_operation, 'selection-company-country-of-operations')
        : '';
    states_of_operation
        ? getStatesNameToBeDisplayUsingCode(states_of_operation, 'selection-company-state-of-operations')
        : '';
    city_of_operation ? getCityNameToBeDisplayUsingCode(city_of_operation, 'selection-company-city-of-operations') : '';
    companyRegionOfOperationsId.innerHTML = region_of_operation || 'N/A';
    localOperatingTimeId.innerHTML =
        start_operating_hour && end_operating_hour ? `${start_operating_hour} - ${end_operating_hour}` : 'N/A';
    uctOperatingTimeId.innerHTML =
        start_operating_hour && end_operating_hour
            ? convertTimeToInternationalStart(start_operating_hour, 'Philippines', 'UTC') +
              ' - ' +
              convertTimeToInternationalEnd(end_operating_hour, 'Philippines', 'UTC')
            : 'N/A';
}

function displayTopCompany() {
    topSelectionResultsId.innerHTML = '';

    const leng = companyDetailsJsonObj2[0].length;
    for (let i = leng - 1; i >= 0; i--) {
        topSelectionResultsId.innerHTML += `<div class="flex items-center space-x-4 rounded-md -mx-2 p-2 hover:bg-gray-50">
                <div class="flex-1">
                    <a href="#" onclick="displayTopCompanyDetails('${companyDetailsJsonObj2[0][i].business_name}')" class="text-base font-semibold capitalize">
                        ${companyDetailsJsonObj2[0][i].business_name}
                    </a>
                </div>
            </div>`;
    }
}

function displayTopCompanyImage() {
    companiesProfilePicture.innerHTML = '';

    let bannerTitle1 = getCompaniesProfilePicture(companyDetailsJsonObj2[0][0].id, companyDetailsJsonObj2[0][0].uuid);
    console.log('displayTopCompanyImage bannerTitle1:', bannerTitle1);
    console.log('displayTopCompanyImage business_name2:', companyDetailsJsonObj2[0][0].business_name);
    const img = new Image();
    img.src = host + '/uploads/users_upload_files/' + bannerTitle1[0].banner;
    img.onload = function () {
        const adjustedScreenHeight = window.innerHeight - 125;
        img.style.height = `${adjustedScreenHeight}px`;
        const li = document.createElement('li');
        li.appendChild(img);
        companiesProfilePicture.appendChild(li);
    };

    setTimeout(() => {
        const leng = companyDetailsJsonObj2[0].length;
        // for (let i = leng - 1; i >= 0; i--) {
        for (var i = leng - 1; i > -1; i--) {
            let bannerTitle2 = getCompaniesProfilePicture(
                companyDetailsJsonObj2[0][i].id,
                companyDetailsJsonObj2[0][i].uuid,
            );
            //if(bannerTitle1[0].banner != bannerTitle2[0].banner) {
            console.log('displayTopCompanyImage bannerTitle2:', i + ' - ' + bannerTitle2);
            console.log(
                'displayTopCompanyImage business_name2:',
                i + ' - ' + companyDetailsJsonObj2[0][i].business_name,
            );
            const img = new Image();
            img.src = host + '/uploads/users_upload_files/' + bannerTitle2[0].banner;
            img.onload = function () {
                const adjustedScreenHeight = window.innerHeight - 125;
                img.style.height = `${adjustedScreenHeight}px`;
                const li = document.createElement('li');
                li.appendChild(img);
                companiesProfilePicture.appendChild(li);
            };
            // } else {
            //     console.log('displayTopCompanyImage same bannerTitle1[0].banner:', bannerTitle1[0].banner);
            //     console.log('displayTopCompanyImage same bannerTitle2[0].banner:', bannerTitle2[0].banner);
            // }
        }
    }, 500);
}

function displayTopCompanyDetails(companyName) {
    $('#selection-business-industry-belong').empty();
    $('#selection-business-language-of-communication').empty();
    $('#selection-business-sub-category').empty();
    $('#selection-business-minor-sub-category').empty();

    let leng = companyDetailsJsonObj2[0].length;

    for (let i = 0; i < leng; i++) {
        if (companyDetailsJsonObj2[0][i].business_name === companyName) {
            document.getElementById('selection-company-name').innerHTML = companyDetailsJsonObj2[0][i].business_name;
            if (companyDetailsJsonObj2[0][i].business_tagline) {
                document.getElementById('selection-company-tagline').innerHTML =
                    companyDetailsJsonObj2[0][i].business_tagline;
            }

            if (companyDetailsJsonObj2[0][i].business_language_of_communication) {
                formattingLanguageName(companyDetailsJsonObj2[0][i].business_language_of_communication);
            }
            if (companyDetailsJsonObj2[0][i].business_major_category) {
                document.getElementById('selection-business-major-category').innerHTML = getTradeCategoriesTitleById(
                    companyDetailsJsonObj2[0][i].business_major_category,
                );
            }
            if (companyDetailsJsonObj2[0][i].business_sub_category) {
                document.getElementById('selection-business-sub-category').innerHTML = getSubCategoriesTitleById(
                    companyDetailsJsonObj2[0][i].business_sub_category,
                );
            }

            document.getElementById('selection-business-minor-sub-category').innerHTML = companyDetailsJsonObj2[0][i]
                .business_minor_sub_category
                ? getMinorSubCategoriesTitleById(companyDetailsJsonObj2[0][i].business_minor_sub_category)
                : 'N/A';

            if (companyDetailsJsonObj2[0][i].business_scale) {
                document.getElementById('selection-business-scale').innerHTML = getBusinessScaleTitle(
                    companyDetailsJsonObj2[0][i].business_scale,
                );
            }
            if (companyDetailsJsonObj2[0][i].business_industry_belong_to) {
                formattingBusinessTags(companyDetailsJsonObj2[0][i].business_industry_belong_to);
            }
            getCountryNameUsingCode(
                companyDetailsJsonObj2[0][i].country_of_operation,
                'selection-company-country-of-operations',
            );
            getStatesNameToBeDisplayUsingCode(
                companyDetailsJsonObj2[0][i].states_of_operation,
                'selection-company-state-of-operations',
            );
            getCityNameToBeDisplayUsingCode(
                companyDetailsJsonObj2[0][i].city_of_operation,
                'selection-company-city-of-operations',
            );

            if (companyDetailsJsonObj2[0][i].region_of_operation) {
                document.getElementById('selection-company-region-of-operations').innerHTML =
                    companyDetailsJsonObj2[0][i].region_of_operation;
            } else {
                document.getElementById('selection-company-region-of-operations').innerHTML = 'N/A';
            }

            const localOperatingTimeId = getId('local-operating-time');
            const uctOperatingTimeId = getId('uct-operating-time');
            const startOperatingHour = companyDetailsJsonObj2[0][i].start_operating_hour;
            const endOperatingHour = companyDetailsJsonObj2[0][i].end_operating_hour;

            if (startOperatingHour || endOperatingHour) {
                localOperatingTimeId.innerHTML =
                    startOperatingHour && endOperatingHour ? `${startOperatingHour} - ${endOperatingHour}` : 'N/A';
                uctOperatingTimeId.innerHTML =
                    startOperatingHour && endOperatingHour
                        ? convertTimeToInternationalStart(startOperatingHour, 'Philippines', 'UTC') +
                          ' - ' +
                          convertTimeToInternationalEnd(endOperatingHour, 'Philippines', 'UTC')
                        : 'N/A';
            }

            // $('#companiesProfilePicture').empty();
            // let bannerTitle = getCompaniesProfilePicture(
            //     companyDetailsJsonObj2[0][i].id,
            //     companyDetailsJsonObj2[0][i].uuid,
            // );

            // companiesProfilePicture.innerHTML =
            //     companiesProfilePicture.innerHTML +
            //     '<li>' +
            //     '<img src="' +
            //     host +
            //     '/uploads/users_upload_files/' +
            //     bannerTitle[0].banner +
            //     '" alt="" uk-cover>' +
            //     '</li>';

            // setTimeout(() => {
            //     const adjustedScreenHeight = window.innerHeight - 125;
            //     // Get the image element
            //     const img = document.querySelector('#companiesProfilePicture li img');
            //     // Remove the height style property
            //     img.style.height = `${adjustedScreenHeight}px`;
            // }, 500);

            $('#companiesProfilePicture').empty();
            let bannerTitle = getCompaniesProfilePicture(
                companyDetailsJsonObj2[0][i].id,
                companyDetailsJsonObj2[0][i].uuid,
            );
            const img = new Image();
            img.src = host + '/uploads/users_upload_files/' + bannerTitle[0].banner;
            img.onload = function () {
                const adjustedScreenHeight = window.innerHeight - 125;
                img.style.height = `${adjustedScreenHeight}px`;
                const li = document.createElement('li');
                li.appendChild(img);
                companiesProfilePicture.appendChild(li);
            };
        }
    }
}


// window.addEventListener('scroll', handleScroll);

// function handleScroll() {
//     const isPositionFixed = window.getComputedStyle(fixedTopMid).getPropertyValue('position') === 'fixed';

//     if (window.scrollY > 200 && !isPositionFixed) {
//         fixedTopMid.style.position = 'fixed';
//         fixedTopMid.style.top = '0';
//     }

//     if (window.scrollY < 200 && isPositionFixed) {
//         fixedTopMid.style.position = 'static';
//         fixedTopMid.style.top = '0';
//     }
// }

// ===============================================
// responsiveness of height in selection [start]
// ===============================================
window.addEventListener('load', handleSelectionPageResize);
window.addEventListener('resize', handleSelectionPageResize);

function handleSelectionPageResize() {
    const screenHeight = window.innerHeight;
    const adjustedScreenHeight = screenHeight - 125;
    const adjustedScreenHeight2 = (screenHeight - 125) / 2;

    const customStyles = {
        height: `${adjustedScreenHeight}px`,
    };

    const customStyles2 = {
        height: `${adjustedScreenHeight2}px`,
    };

    selectionLeftColumn.style.height = customStyles.height;
    companiesProfilePicture.style.height = customStyles.height;
    selectionMidColumnCompanyBanner.style.height = customStyles.height;
    cardForDetailsOfSpecificCompany.style.height = customStyles2.height;
    cardForCompanySearchResult.style.height = customStyles2.height;
    selectionsPrevSlide.style.top = customStyles2.height;
    selectionsNextSlide.style.top = customStyles2.height;

    // Initialize image height in selection
    const images = document.querySelectorAll('.uk-slideshow-items img');
    images.forEach((image) => {
        image.style.height = `${adjustedScreenHeight}px`;
    });
}
// ============================================
// responsiveness of height in selection [end]
// ============================================

selectionsNextSlide.addEventListener('click', handleSelectionsSlideClickV1);
selectionsPrevSlide.addEventListener('click', handleSelectionsSlideClickV1);
selectionsNextSlide.addEventListener('mouseleave', handleSelectionsSlideClickV2);
selectionsPrevSlide.addEventListener('mouseleave', handleSelectionsSlideClickV2);
selectionsNextSlide.addEventListener('transitionend', getImageName);
selectionsPrevSlide.addEventListener('transitionend', getImageName);

function handleSelectionsSlideClickV1() {
    varCounter = 0;

    // This condition is required because 2 click events are fired for each dblclick
    // but we only want to record the time of the first click
    if (num % 2 === 0) {
        if (num === 0) {
            timer = new Date().getTime() - 2000;
        } else {
            timer = new Date().getTime();
        }
    }

    const time2 = new Date().getTime();
    const dblClickTime = time2 - timer;
    // console.log('dblClickTime: ', dblClickTime);
    // console.log('time2: ', time2);
    // console.log('timer: ', timer);

    if (dblClickTime > 1000) {
        // console.log('good: ', dblClickTime);
        intervalId = setInterval(getImageName, 1500);
    } else {
        // console.log('too fast: ', dblClickTime);
    }

    num++;
}

function handleSelectionsSlideClickV2(e) {
    varCounter = 0;
    intervalId = setInterval(getImageName, 1000);
}

let isTransitioning = false;
function getImageName() {
    if (!isTransitioning && varCounter < 3) {
        isTransitioning = true;
        varCounter++;

        //=========================================================
        // SET image height in selection [START]
        //=========================================================
        // Get the adjusted screen height by subtracting the height of the header
        const adjustedScreenHeight = window.innerHeight - 125;

        // Loop through all images inside the ul element and set their height to 1000px
        document.querySelectorAll('.uk-slideshow-items img').forEach((img) => {
            img.style.height = `${adjustedScreenHeight}px`;
        });
        //=========================================================
        // SET image height in selection [END]
        //=========================================================

        const activeDivOfCarousel = getSl('.uk-active.uk-transition-active');
        if (activeDivOfCarousel) {
            const activeImageOfCarousel = activeDivOfCarousel.getElementsByTagName('img')[0];
            const imageSrcOfActiveImageInCarousel = activeImageOfCarousel.src;
            const imageNameOfActiveImageInCarousel = imageSrcOfActiveImageInCarousel.split('/').pop();
            displayCompanyDetailsUsingImageName(imageNameOfActiveImageInCarousel);
        }

        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    } else if (varCounter >= 3) {
        clearInterval(intervalId);
    }
}

function displayCompanyDetailsUsingImageName(filename) {
    const companyDetails = companyDetailsJsonObj2[0].find((details) => details.banner === filename);
    if (!companyDetails) return;

    const {
        business_name,
        business_tagline,
        business_language_of_communication,
        business_major_category,
        business_sub_category,
        business_minor_sub_category,
        business_scale,
        business_industry_belong_to,
        country_of_operation,
        states_of_operation,
        city_of_operation,
        region_of_operation,
        start_operating_hour,
        end_operating_hour,
    } = companyDetails;

    businessIndustryBelongId.innerHTML = '';
    businessLanguageOfCommunicationId.innerHTML = '';
    companyRegionOfOperationsId.innerHTML = '';
    countryOfOperationsId.innerHTML = '';
    stateOfOperationsId.innerHTML = '';

    if (!companyDetails) return;
    // console.log('companyDetails', companyDetails);
    companyNameId.innerHTML = business_name;
    companyTaglineId.innerHTML = business_tagline || '';
    businessMajorCategoryId.innerHTML = business_major_category
        ? getTradeCategoriesTitleById(business_major_category)
        : 'N/A';
    businessSubCategoryId.innerHTML = business_sub_category ? getSubCategoriesTitleById(business_sub_category) : 'N/A';
    businessMinorSubCategoryId.innerHTML = business_minor_sub_category
        ? getMinorSubCategoriesTitleById(business_minor_sub_category)
        : 'N/A';
    businessScaleId.innerHTML = business_scale ? getBusinessScaleTitle(business_scale) : 'N/A';
    business_language_of_communication ? formattingLanguageName(business_language_of_communication) : '';
    business_industry_belong_to ? formattingBusinessTags(business_industry_belong_to) : '';
    country_of_operation
        ? getCountryNameUsingCode(country_of_operation, 'selection-company-country-of-operations')
        : '';
    states_of_operation
        ? getStatesNameToBeDisplayUsingCode(states_of_operation, 'selection-company-state-of-operations')
        : '';
    city_of_operation ? getCityNameToBeDisplayUsingCode(city_of_operation, 'selection-company-city-of-operations') : '';
    companyRegionOfOperationsId.innerHTML = region_of_operation ? region_of_operation : 'N/A';
    localOperatingTimeId.innerHTML =
        start_operating_hour && end_operating_hour ? `${start_operating_hour} - ${end_operating_hour}` : 'N/A';
    uctOperatingTimeId.innerHTML =
        start_operating_hour && end_operating_hour
            ? convertTimeToInternationalStart(start_operating_hour, 'Philippines', 'UTC') +
              ' - ' +
              convertTimeToInternationalEnd(end_operating_hour, 'Philippines', 'UTC')
            : 'N/A';
}




function displaySearchParameter() {
    displaySearchParameterId.innerHTML = '';
    let html = `
      <li>
        <a href="index.html">Home</a>
      </li>
      <li class="active">
        <a href="" onclick="return false;">Selection </a>
      </li>
    `;
    const data = dataForDisplaySearchParameter[0];

    if (data.business_major_category) {
        html += `
        <li class="">
          <a href="" onclick="return false;">${getTradeCategoriesTitleById(data.business_major_category)}</a>
        </li>
      `;
    }
    if (data.business_sub_category) {
        html += `
        <li class="">
          <a href="" onclick="return false;">${getSubCategoriesTitleById(data.business_sub_category)}</a>
        </li>
      `;
    }
    if (data.business_minor_sub_category) {
        html += `
        <li class="">
          <a href="" onclick="return false;">${getMinorSubCategoriesTitleById(data.business_minor_sub_category)}</a>
        </li>
      `;
    }
    if (data.region_of_operation) {
        html += `
        <li class="">
          <a href="" onclick="return false;">${data.region_of_operation}</a>
        </li>
      `;
    }
    if (data.country_of_operation) {
        html += `
        <li class="">
          <a href="#" id="displaySearchParameter_countryOperation"></a>
        </li>
      `;
        getCountryNameUsingCode(data.country_of_operation, 'displaySearchParameter_countryOperation');
    }
    if (data.states_of_operation) {
        html += `
        <li class="">
          <a href="#" id="displaySearchParameter_stateOperation"></a>
        </li>
      `;
        getStatesNameToBeDisplayUsingCode(data.states_of_operation, 'displaySearchParameter_stateOperation');
    }

    displaySearchParameterId.innerHTML = html;
}

async function getCountryNameUsingCode(code, elementId) {
    if (!code || !elementId) {
        document.getElementById(elementId).innerHTML = 'N/A';
        return;
    }

    if (code && elementId) {
        try {
            const response = await fetch('assets/json/countries.json');
            const countries = await response.json();
            const countryCodes = code.split(',');

            let countryNames = [];
            for (let i = 0; i < countryCodes.length; i++) {
                const countryCode = countryCodes[i];
                const filtered = countries.filter((country) => country.iso2 === countryCode);
                if (filtered.length === 0) {
                    continue;
                }
                const countryName = filtered[0].name;
                countryNames.push(countryName);
            }

            const countryNamesString = countryNames.join(', ');
            document.getElementById(elementId).innerHTML = countryNamesString;
        } catch (error) {
            console.error('Error fetching countries:', error);
            document.getElementById(elementId).innerHTML = 'N/A';
        }
    }
}

async function getStatesNameToBeDisplayUsingCode(code, elementId) {
    if (!code || !elementId) {
        document.getElementById(elementId).innerHTML = 'N/A';
        return;
    }

    if (code && elementId) {
        try {
            const response = await fetch('assets/json/states.json');
            const data = await response.json();

            const filtered = data.find((d) => d.id == code);
            if (filtered) {
                document.getElementById(elementId).textContent = filtered.name;
            } else {
                document.getElementById(elementId).textContent = 'N/A';
            }
        } catch (error) {
            console.error('Failed to fetch states', error);
        }
    }
}

async function getCityNameToBeDisplayUsingCode(code, elementId) {
    if (!code || !elementId) {
        document.getElementById(elementId).innerHTML = 'N/A';
        return;
    }

    if (code && elementId) {
        try {
            const response = await fetch('assets/json/cities.json');
            const data = await response.json();

            const filtered = data.find((d) => d.id == code);
            if (filtered) {
                document.getElementById(elementId).textContent = filtered.name;
            } else {
                document.getElementById(elementId).textContent = 'N/A';
            }
        } catch (error) {
            console.error('Failed to fetch cities', error);
        }
    }
}

function getCompaniesProfilePicture(id, uuid) {
    let value;
    $.ajax({
        url: '/api/get/companies-profile-picture',
        type: 'POST',
        data: { id: id, uuid: uuid },
        async: false,
        success: function (data) {
            value = data;
        },
    });
    return value;
}

async function getTradeCategories() {
    try {
        const response = await fetch(`${host}/api/get/trade-categories-for-today`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching trade categories:', error);
        throw error;
    }
}

getTradeCategories()
    .then((data) => {
        const categories = data
            .map(
                (category) => `
        <div class="filterByTradeCategoryClass text-md font-md text-white-900 dark:text-white-300 p-2 hover:bg-gray-50 orbitron"
          data-el="${category.id}">${category.title}</div>`,
            )
            .join('');
        tradeCategories.insertAdjacentHTML(
            'beforeend',
            `<div class="filterByTradeCategoryClass text-md font-md text-white-900 dark:text-white-300 p-2 hover:bg-gray-50 orbitron" data-el="">Any</div>${categories}`,
        );
    })
    .catch((error) => {
        console.error('Error rendering trade categories:', error);
    });

function getSubCategory(tradeCategoriesElementId, subCategoriesElementId) {
    displaySelectedSubCategories.innerHTML = 'Any';
    displaySelectedMinorSubCategories.innerHTML = 'Any';

    const subCategoriesElement = document.getElementById(subCategoriesElementId);
    subCategoriesElement.innerHTML = '';

    const tradeCategoryId = document.getElementById(tradeCategoriesElementId).value;
    if (tradeCategoryId) {
        fetch(`${host}/api/get/sub-categories-by-trade-category-id/${tradeCategoryId}`)
            .then((response) => response.json())
            .then((data) => {
                subCategoriesElement.innerHTML = `
            <div class="filterBySubCategoryClass text-md font-md text-white-900 dark:text-white-300 p-2 hover:bg-gray-50" data-el="">Any</div>
            ${data
                .map(
                    (subCategory) => `
              <div class="filterBySubCategoryClass text-md font-md text-white-900 dark:text-white-300 p-2 hover:bg-gray-50" data-el="${subCategory.id}">
                ${subCategory.title}
              </div>
            `,
                )
                .join('')}
          `;
            });
    } else {
        subCategoriesElement.innerHTML = '';
    }
}

async function getMinorCategory(subCategoriesElementId, minorSubCategoriesElementId) {
    const minorSubCategories = document.querySelector(`#${minorSubCategoriesElementId}`);
    minorSubCategories.innerHTML = '';

    const subCategoryId = document.querySelector(`#${subCategoriesElementId}`).value;
    if (!subCategoryId) {
        return;
    }

    const response = await fetch(`${host}/api/get/minor-sub-categories-by-sub-category-id/${subCategoryId}`);
    const data = await response.json();

    const minorSubCategoriesHTML = data
        .map(
            ({ id, title }) => `
      <div class="filterByMinorSubCategoryClass text-md font-md text-white-900 dark:text-white-300 p-2 hover:bg-gray-50" data-el="${id}">
        ${title}
      </div>
    `,
        )
        .join('');

    minorSubCategories.innerHTML = `
      <div class="filterByMinorSubCategoryClass text-md font-md text-white-900 dark:text-white-300 p-2 hover:bg-gray-50" data-el="">Any</div>
      ${minorSubCategoriesHTML}
    `;
}

//consume api to get all languages
async function getLanguages() {
    const response = await fetch(`${host}/api/get/languages`);
    const data = await response.json();
    return data;
}

// display all languages in frontend select option
getLanguages().then((data) => {
    const defaultOption = document.createElement('div');
    defaultOption.classList.add(
        'filterByLanguageClass',
        'text-md',
        'font-md',
        'text-white-900',
        'dark:text-white-300',
        'p-2',
        'hover:bg-gray-50',
    );
    defaultOption.setAttribute('data-el', '');
    defaultOption.textContent = 'Any';
    languageDiv.appendChild(defaultOption);

    data.forEach((language) => {
        const option = document.createElement('div');
        option.classList.add(
            'filterByLanguageClass',
            'text-md',
            'font-md',
            'text-white-900',
            'dark:text-white-300',
            'p-2',
            'hover:bg-gray-50',
        );
        option.setAttribute('data-el', language.code);
        option.textContent = language.name;
        languageDiv.appendChild(option);
    });
});

searchByProductOrCompanyName.onchange = function () {
    let searchByProductOrCompanyNameValue = this.value;

    if (searchByProductOrCompanyNameValue === 'product_service') {
        product_service_input.style.display = 'block';
        company_name_input.style.display = 'none';
        company_name_input.value = '';
    }
    if (searchByProductOrCompanyNameValue === 'company_name') {
        product_service_input.style.display = 'none';
        company_name_input.style.display = 'block';
        product_service_input.value = '';
    }
};

function getTradeCategoriesTitleById(id) {
    let value;

    if (id) {
        $.ajax({
            url: host + '/api/get/trade-category-title-by-id/' + id,
            async: false,
            success: function (data) {
                value = data[0].title;
            },
        });
        return value;
    } else {
        return 'N/A';
    }
}

function getSubCategoriesTitleById(id) {
    let value;
    $.ajax({
        url: host + '/api/get/sub-category-title-by-id/' + id,
        async: false,
        success: function (data) {
            value = data[0].title;
        },
    });
    return value;
}

function getMinorSubCategoriesTitleById(id) {
    if (id) {
        let value;
        $.ajax({
            url: host + '/api/get/minor-sub-categories-by-id/' + id,
            async: false,
            success: function (data) {
                value = data[0].title;
            },
        });
        return value;
    } else {
        return 'None';
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
        case '1':
            value = 'Small Scale';
            break;
        case '2':
            value = 'Medium Scale';
            break;
        case '3':
            value = 'Large Scale';
            break;
        case '':
            value = 'Any';
            break;
        default:
            value = 'N/A';
    }

    return value;
}

function formattingBusinessTags(string) {
    if (string) {
        let data = string.split(',');
        for (var i = 0; i < data.length; i++) {
            businessIndustryBelongId.innerHTML =
                businessIndustryBelongId.innerHTML +
                '<a href="#" class="bg-gray-200 py-1.5 px-4 rounded-full">' +
                data[i] +
                '</a>';
        }
    } else {
        businessIndustryBelongId.innerHTML = 'N/A';
    }
}

function formattingLanguageName(string) {
    let data = string.split(',');
    for (var i = 0; i < data.length; i++) {
        businessLanguageOfCommunicationId.innerHTML =
            businessLanguageOfCommunicationId.innerHTML +
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



product_service_input.addEventListener('change', function () {
    selectionSearchParameter();
});

company_name_input.addEventListener('change', function () {
    selectionSearchParameter();
});

function selectionSearchParameter() {
    let regionOfOperationCode = selectedRegionOfOperation.value;
    let countryCode = selectedCountry.value;
    let selectionState = selectedState.value;
    let selectionCity = selectedCity.value;
    let language = selectedLanguage.value;
    let business_scale = selectedBusinessScale.value;
    let trade_categories = selectedTradeCategories.value;
    let sub_categories = selectedSubCategories.value;
    let minor_sub_categories = selectedMinorSubCategories.value;
    let productServiceInput = product_service_input.value;
    let companyNameInput = company_name_input.value;

    // console.log('selectionSearchParameter regionOfOperationCode', regionOfOperationCode);
    // console.log('selectionSearchParameter countryCode', countryCode);
    // console.log('selectionSearchParameter selectionState', selectionState);
    // console.log('selectionSearchParameter selectionCity', selectionCity);
    // console.log('selectionSearchParameter language', language);
    // console.log('selectionSearchParameter business_scale', business_scale);
    // console.log('selectionSearchParameter trade_categories', trade_categories);
    // console.log('selectionSearchParameter sub_categories', sub_categories);
    // console.log('selectionSearchParameter minor_sub_categories', minor_sub_categories);
    // console.log('selectionSearchParameter product_service_input', productServiceInput);
    // console.log('selectionSearchParameter company_name_input', companyNameInput);

    $.ajax({
        url: '/api/post/selection-search-parameter',
        type: 'POST',
        data: {
            regionOfOperationCode: regionOfOperationCode,
            countryCode: countryCode,
            selectionState: selectionState,
            selectionCity: selectionCity,
            language: language,
            business_scale: business_scale,
            trade_categories: trade_categories,
            sub_categories: sub_categories,
            minor_sub_categories: minor_sub_categories,
            product_service_input: productServiceInput,
            company_name_input: companyNameInput,
        },
        success: function (data) {
            console.log('selectionSearchParameter data: ', data);
            if (data.length > 0) {
                emptyCompanyDetailsDiv();
                while (companyDetailsJsonObj2.length > 0) {
                    companyDetailsJsonObj2.pop();
                }
                while (dataForDisplaySearchParameter.length > 0) {
                    dataForDisplaySearchParameter.pop();
                }
                companyDetailsJsonObj2.push(data);
                dataForDisplaySearchParameter.push(data[0]);

                companiesProfilePicture.innerHTML = '';

                const bannerTitle1 = getCompaniesProfilePicture(data[0]['id'], data[0]['uuid']);
                const img = new Image();
                img.className = 'companyBannerPreview';
                img.id = 'companyBannerPreview';

                let adjustedScreenHeight2 = (window.innerHeight - 125) / 2;
                selectionsPrevSlide.style.top = `${adjustedScreenHeight2}px`;
                selectionsNextSlide.style.top = `${adjustedScreenHeight2}px`;

                const fragment = document.createDocumentFragment();

                if (bannerTitle1) {
                    const bannerSrc = host + '/uploads/users_upload_files/' + bannerTitle1[0].banner;
                    img.src = bannerSrc;
                    img.onload = function () {
                        const adjustedScreenHeight = window.innerHeight - 125;
                        img.style.height = `${adjustedScreenHeight}px`;
                        const li = document.createElement('li');
                        li.appendChild(img.cloneNode());
                        fragment.appendChild(li);
                        companiesProfilePicture.appendChild(fragment);
                    };
                }

                setTimeout(() => {
                    for (let i = data.length - 1; i >= 1; i--) {
                        const bannerTitle1 = getCompaniesProfilePicture(data[0]['id'], data[0]['uuid']);
                        const bannerTitle = getCompaniesProfilePicture(data[i]['id'], data[i]['uuid']);
                        if(bannerTitle != bannerTitle1) {
                            if (bannerTitle) {
                                const bannerSrc = host + '/uploads/users_upload_files/' + bannerTitle[0].banner;
                                console.log('bannerSrc: ', bannerSrc);
                                console.log('bannerSrc i: ', i);
                                img.src = bannerSrc;
                            }
                        }

                        const li = document.createElement('li');
                        li.appendChild(img.cloneNode());
                        fragment.appendChild(li);
                    }
                    companiesProfilePicture.appendChild(fragment);
                }, 500);


                displaySearchParameter();
                displayFirstCompanyDetails();
                displayTopCompany();
            } else {
                const data = {
                    message: 'empty',
                };
                companyDetailsJsonObj2.push(data);
                replaceDashCompanyDetailsDivV2();
            }
        },
    });
}

function replaceDashCompanyDetailsDiv() {
    // $('#companiesProfilePicture').empty();
    // $('#top-selection-results').empty();
    // $('#selections-next-slide').hide();
    // $('#selections-prev-slide').hide();

    topSelectionResultsId.innerHTML = '';
    selectionsNextSlide.style.display = 'none';
    selectionsPrevSlide.style.display = 'none';

    companyNameId.innerHTML = '-';
    companyTaglineId.innerHTML = '-';
    businessLanguageOfCommunicationId.innerHTML = '-';
    businessMajorCategoryId.innerHTML = '-';
    businessSubCategoryId.innerHTML = '-';
    businessMinorSubCategoryId.innerHTML = '-';
    businessIndustryBelongId.innerHTML = '-';
    countryOfOperationsId.innerHTML = '-';
    stateOfOperationsId.innerHTML = '-';
    cityOfOperationsId.innerHTML = '-';
    companyRegionOfOperationsId.innerHTML = '-';
    businessScaleId.innerHTML = '-';
    localOperatingTimeId.innerHTML = '-';
    uctOperatingTimeId.innerHTML = '-';

    noRecordFoundImageSrc();
    showRandomChoices();
}

function replaceDashCompanyDetailsDivV2() {
    $('#companiesProfilePicture').empty();
    // $('#top-selection-results').empty();
    // $('#selections-next-slide').hide();
    // $('#selections-prev-slide').hide();

    topSelectionResultsId.innerHTML = '';
    selectionsNextSlide.style.display = 'none';
    selectionsPrevSlide.style.display = 'none';

    companyNameId.innerHTML = '-';
    companyTaglineId.innerHTML = '-';
    businessLanguageOfCommunicationId.innerHTML = '-';
    businessMajorCategoryId.innerHTML = '-';
    businessSubCategoryId.innerHTML = '-';
    businessMinorSubCategoryId.innerHTML = '-';
    businessIndustryBelongId.innerHTML = '-';
    countryOfOperationsId.innerHTML = '-';
    stateOfOperationsId.innerHTML = '-';
    cityOfOperationsId.innerHTML = '-';
    companyRegionOfOperationsId.innerHTML = '-';
    businessScaleId.innerHTML = '-';
    localOperatingTimeId.innerHTML = '-';
    uctOperatingTimeId.innerHTML = '-';

    noRecordFoundImageSrcV2();
    showRandomChoices();
}

function noRecordFoundImageSrc() {
    let noRecordFoundImageSrc = `${host}/uploads/placeholder/no-record-found.jpg`;

    companiesProfilePicture.innerHTML =
        `<li><img src="${noRecordFoundImageSrc}" id="companyBannerPreview" alt="" uk-cover></li>`;

    displayInformationMessage('No record found related to your personal data. Allow us to give you random choices.');
}

function noRecordFoundImageSrcV2() {
    let noRecordFoundImageSrc = `${host}/uploads/placeholder/no-record-found.jpg`;

    companiesProfilePicture.innerHTML =
        `<li><img src="${noRecordFoundImageSrc}" id="companyBannerPreview" alt="" uk-cover></li>`;

    displayInformationMessage('No record found related to your query. Allow us to give you random choices.');
}

function displayInformationMessage(message) {
    Swal.fire('Info', message, 'info');
}

function showRandomChoices() {
    setTimeout(function () {
        $.ajax({
            url: '/api/get/get-random-companies',
            type: 'POST',
            async: false,
            success: function (data) {
                if (data.length > 0) {
                    emptyCompanyDetailsDiv();
                    while (companyDetailsJsonObj2.length > 0) {
                        companyDetailsJsonObj2.pop();
                    }
                    companyDetailsJsonObj2.push(data);
                    companiesProfilePicture.innerHTML = '';
                    for (var i = data.length - 1; i > -1; i--) {
                        let bannerTitle = getCompaniesProfilePicture(data[i]['id'], data[i]['uuid']);

                        companiesProfilePicture.innerHTML =
                            companiesProfilePicture.innerHTML +
                            '<li>' +
                            '<img src="' +
                            host +
                            '/uploads/users_upload_files/' +
                            bannerTitle[0].banner +
                            '"  id="companyBannerPreview" alt="" uk-cover>' +
                            '</li>';
                    }
                    displayFirstCompanyDetails();
                    displayTopCompany();
                }
            },
        });
    }, 1 * 1000);
}

function emptyCompanyDetailsDiv() {
    companiesProfilePicture.innerHTML = '';
    topSelectionResultsId.innerHTML = '';
    selectionsNextSlide.innerHTML = '';
    selectionsPrevSlide.innerHTML = '';

    companyNameId.innerHTML = '';
    companyTaglineId.innerHTML = '';
    businessLanguageOfCommunicationId.innerHTML = '';
    businessMajorCategoryId.innerHTML = '';
    businessSubCategoryId.innerHTML = '';
    businessMinorSubCategoryId.innerHTML = '';
    businessIndustryBelongId.innerHTML = '';
    countryOfOperationsId.innerHTML = '';
    stateOfOperationsId.innerHTML = '';
    cityOfOperationsId.innerHTML = '';
    companyRegionOfOperationsId.innerHTML = '';
    businessScaleId.innerHTML = '';
    localOperatingTimeId.innerHTML = '';
    uctOperatingTimeId.innerHTML = '';
}


companiesProfilePicture.addEventListener('click', getActiveImageToDownloadOrContact);

function getActiveImageToDownloadOrContact() {
    // get the active parent div to get the active image
    const activeDivOfCarousel = getEcN('uk-active uk-transition-active')[0];
    // console.log("getEcN('uk-active uk-transition-active')[0]: ", activeDivOfCarousel);
    // get the active image inside parent div
    const activeImageOfCarousel = activeDivOfCarousel.getElementsByTagName('img')[0];
    // get the image src
    const imageSrcOfActiveImageInCarousel = activeImageOfCarousel.getAttribute('src');
    // remove "uploads/" part of image src name
    const imageNameOfActiveImageInCarousel = imageSrcOfActiveImageInCarousel.split('/').pop();
    // exclude extension from filename
    //fileNameOfActiveImageInCarousel = imageNameOfActiveImageInCarousel.split('.').slice(0, -1).join('.');

    if (imageNameOfActiveImageInCarousel) {
        downloadOrContact(imageNameOfActiveImageInCarousel);
    }
}

function downloadOrContact(filename) {
    let leng = companyDetailsJsonObj2[0].length;
    let companyName;
    let communicator_link;

    for (let i = 0; i < leng; i++) {
        if (companyDetailsJsonObj2[0][i].banner === filename) {
            companyName = companyDetailsJsonObj2[0][i].business_name;
            communicator_link = companyDetailsJsonObj2[0][i].communicator;
            trader_uuid = companyDetailsJsonObj2[0][i].uuid;
        }
    }

    Swal.fire({
        title: '',
        text: `How do you want to engage with ${companyName}  ?`,
        icon: 'info',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Contact Directly',
        denyButtonText: 'Download Details',
        denyButtonColor: 'blue',
        customClass: {
            actions: 'my-actions',
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
            denyButton: 'order-3',
        },
    }).then((result) => {
        if (result.isConfirmed) {
            recordTheMeetingOfVisitorAndTrader(trader_uuid, communicator_link);
        } else if (result.isDenied) {
            downloadCurrentTraderData(trader_uuid);
        }
    });
}

function recordTheMeetingOfVisitorAndTrader(trader_uuid, communicator_link) {
    $.ajax({
        url: '/api/post/record-the-meeting-of-visitor-and-trader',
        type: 'POST',
        data: { trader_uuid: trader_uuid },
        async: true,
        success: function (res) {
            console.log('recordTheMeetingOfVisitorAndTrader res: ', res);
            if (res) {
                const domainLink = 'https://meet.allworldtrade.com/join/'; //new
                window.open(domainLink + res[0].communicator, '_blank');
                console.log('domain link', domainLink + res[0].communicator);
            } else {
            }
        },
        error: function (error) {
            // handle the error
            console.error(error);
        },
    });
}

function downloadCurrentTraderData(trader_uuid) {
    $.ajax({
        url: '/api/post/get-current-trader',
        type: 'POST',
        data: { trader_uuid: trader_uuid },
        success: function (res) {
            window.location = host + '/download-current-trader-data';
        },
    });
}

async function getStatesOptions(countryElementId, stateElementId, cityElementId) {
    const stateElement = document.getElementById(stateElementId);
    const cityElement = document.getElementById(cityElementId);
    stateElement.innerHTML = '';
    cityElement.innerHTML = '';

    const countryElement = document.getElementById(countryElementId);
    const countryCode = countryElement.value;

    if (countryCode) {
        try {
            const response = await fetch('assets/json/states.json');
            const data = await response.json();
            const filtered = data.filter((d) => d.country_code === countryCode);
            if (filtered.length > 0) {
                stateElement.innerHTML = `
          <div class="filterByStateClass text-md font-md text-white-900 dark:text-white-300 p-2 hover:bg-gray-50" data-el="">Any</div>
          ${filtered
              .map(
                  (d) =>
                      `<div class="filterByStateClass text-md font-md text-white-900 dark:text-white-300 p-2 hover:bg-gray-50" data-el="${d.id}">${d.name}</div>`,
              )
              .join('')}
        `;

                cityElement.innerHTML = `
          <div class="filterByCityClass text-md font-md text-white-900 dark:text-white-300 p-2 hover:bg-gray-50 orbitron" data-el="">Any</div>
        `;
            } else {
                displaySelectedState.innerHTML = 'No States Found';
                displaySelectedCity.innerHTML = 'No Cities Found';

                stateElement.innerHTML = `
          <div class="filterByStateClass text-md font-md text-white-900 dark:text-white-300 p-2 hover:bg-gray-50" data-el="No States Found">No States Found</div>
        `;
                cityElement.innerHTML = `
          <div class="filterByCityClass text-md font-md text-white-900 dark:text-white-300 p-2 hover:bg-gray-50" data-el="No Cities Found">No Cities Found</div>
        `;
            }

            $(`#${stateElementId}`).selectpicker('refresh');

            const selectedState = document.getElementById(stateElementId).value;

            if (selectedState === 'No States Found') {
                displaySelectedState.innerHTML = 'No States Found';
                displaySelectedCity.innerHTML = 'No Cities Found';
                cityElement.innerHTML = `
          <div class="filterByCityClass text-md font-md text-white-900 dark:text-white-300 p-2 hover:bg-gray-50" data-el="No Cities Found">No Cities Found</div>
        `;
            }
        } catch (error) {
            console.error('Error fetching states:', error);
        }
    } else {
        displaySelectedState.innerHTML = 'Any';
        displaySelectedCity.innerHTML = 'Any';
        stateElement.innerHTML = `<div
                class="filterByStateClass text-md font-md text-white-900 dark:text-white-300 p-2 hover:bg-gray-50 orbitron"
                data-el=""
            >
                Any
            </div>`;
        cityElement.innerHTML = `<div
                class="filterByCityClass text-md font-md text-white-900 dark:text-white-300 p-2 hover:bg-gray-50 orbitron"
                data-el=""
            >
                Any
            </div>`;
    }
}

async function getCitiesOptions(countryElementId, stateElementId, cityElementId) {
    const cityElement = document.getElementById(cityElementId);
    cityElement.innerHTML = '';

    try {
        const response = await fetch('assets/json/cities.json');
        const data = await response.json();

        const countryCode = document.getElementById(countryElementId).value;
        const stateId = document.getElementById(stateElementId).value;
        const filtered = data.filter((d) => d.country_code == countryCode);

        if (filtered.length > 0 && stateId !== 'No States Found' && stateId !== '') {
            const cities = filtered.filter((d) => d.state_id == stateId);
            cityElement.insertAdjacentHTML(
                'beforeend',
                '<div class="filterByCityClass text-md font-md text-white-900 dark:text-white-300 p-2 hover:bg-gray-50" data-el="">Any</div>',
            );
            cities.forEach((city) => {
                cityElement.insertAdjacentHTML(
                    'beforeend',
                    `<div class="filterByCityClass text-md font-md text-white-900 dark:text-white-300 p-2 hover:bg-gray-50" data-el="${city.id}">${city.name}</div>`,
                );
            });
        } else if (stateId === '') {
            displaySelectedCity.innerHTML = 'Any';
            cityElement.insertAdjacentHTML(
                'beforeend',
                '<div class="filterByCityClass text-md font-md text-white-900 dark:text-white-300 p-2 hover:bg-gray-50" data-el="">Any</div>',
            );
        } else {
            displaySelectedCity.innerHTML = 'No Cities Found';
            cityElement.insertAdjacentHTML(
                'beforeend',
                '<div class="filterByCityClass text-md font-md text-white-900 dark:text-white-300 p-2 hover:bg-gray-50" data-el="No Cities Found">No Cities Found</div>',
            );
        }
    } catch (error) {
        console.error(error);
    }
}


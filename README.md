function selectionSearchParameter() {
function displayTopCompany() {
function getCompaniesRelatedToCurrentUser() {
$(companiesProfilePicture).empty();
for (var i = data.length - 1; i > -1; i--) {
                    let bannerTitle = getCompaniesProfilePicture(data[i]['id'], data[i]['uuid']);
                    const img = new Image();
                    img.src = host + '/uploads/users_upload_files/' + bannerTitle[0].banner;
                    img.onload = function() {
                        const adjustedScreenHeight = window.innerHeight - 125;
                        img.style.height = `${adjustedScreenHeight}px`;
                        const li = document.createElement('li');
                        li.appendChild(img);
                        companiesProfilePicture.appendChild(li);
                    };
                }






for (let i = leng - 1; i >= 0; i--) {
	let bannerTitle = getCompaniesProfilePicture(companyDetailsJsonObj2[0][i].id, companyDetailsJsonObj2[0][i].uuid);
	const img = new Image();
	img.src = host + '/uploads/users_upload_files/' + bannerTitle[0].banner;
	img.onload = function() {
		const adjustedScreenHeight = window.innerHeight - 125;
		img.style.height = `${adjustedScreenHeight}px`;
		const li = document.createElement('li');
		li.appendChild(img);
		companiesProfilePicture.appendChild(li);
	};
}


companiesProfilePicture.innerHTML = '';
                const fragment = document.createDocumentFragment();

                for (let i = data.length - 1; i >= 0; i--) {
                    const bannerTitle = getCompaniesProfilePicture(data[i]['id'], data[i]['uuid']);
                    const bannerSrc = host + '/uploads/users_upload_files/' + bannerTitle[0].banner;
                  
                    img.src = bannerSrc;
                    const li = document.createElement('li');
                    li.appendChild(img.cloneNode());
                    fragment.appendChild(li);
                }
                  
                companiesProfilePicture.appendChild(fragment);



				function displayFirstCompanyDetails() {

					companyDetailsJsonObj2[0][i].business_name;





					displayTopCompanyImage# all-world-trade-v9

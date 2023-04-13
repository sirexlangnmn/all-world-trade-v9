const formLogin = $('#formLogin');
formLogin.on('submit', loginSubmitHandler);

function loginSubmitHandler(e) {
    e.preventDefault();

    $.ajax({
        url: '/api/post/login-process',
        type: 'POST',
        data: formLogin.serialize(),
        success: function (res) {
            if (res.message === 'found') {
                // window.location.replace('/profile');
                window.location.replace('/selection');
            } else if (res.message !== 'found') {
                Swal.fire('Error', res.message, 'error');
            } else {
                Swal.fire('Error', 'Please check your email address and password', 'error');
            }
        },
    });
}

function comparePassword(plainPassword, hashedPassword) {
    $.ajax({
        url: '/api/post/compare-password',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            plainPassword: plainPassword,
            hashedPassword: hashedPassword,
        }),
        success: function (res) {
            if (res === true) {
                window.location.replace('/profile');
            }
            if (res === false) {
                Swal.fire('Error', 'Please check your email address and password', 'error');
            }
        },
    });
}

function lookingForSmallScaleCompany() {
    // location.replace(host + '/registration-for-small-scale-company');
    location.replace(host + '/registration');
}

function showPassword(elementID) {
    let inputPassword = getId(elementID);
    let passEyeId1 = getId('passEyeId1');
    let passEyeId2 = getId('passEyeId2');

    if (inputPassword.type === 'password') {
        inputPassword.type = 'text';
        passEyeId1.style.display = 'block';
        passEyeId2.style.display = 'none';
    } else {
        inputPassword.type = 'password';
        passEyeId1.style.display = 'none';
        passEyeId2.style.display = 'block';
    }
}

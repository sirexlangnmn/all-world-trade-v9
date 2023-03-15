const sql = require('./db.js');
const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');
const JWT_SECRET = process.env.JWT_SECRET;

const Model = function (model) {
    console.log('model', model);
    this.email_or_social_media = model.email_or_social_media;
    // this.email_or_social_media = "a.dimaano.awt@gmail.com"
    this.password = model.password;
    this.session = model.session;
};

Model.create = (newModel, result) => {
    //const usersAccountsQuery = `SELECT id, uuid, email_or_social_media, password, type FROM users_accounts WHERE email_or_social_media = "${newModel.email_or_social_media}"`;
    console.log('newModel', newModel);
    const usersAccountsQuery = `SELECT password FROM users_accounts WHERE email_or_social_media = "${newModel.email_or_social_media}"`;

    sql.query(usersAccountsQuery, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        if (res.length > 0) {
            let plainPasswordInput = newModel.password;
            let hashedPassword = res[0].password;
            const verified = bcrypt.compareSync(plainPasswordInput, hashedPassword);

            if (verified) {
                const usersAccountsQuery = `SELECT 
                    users_accounts.id, 
                    users_accounts.uuid, 
                    users_accounts.email_or_social_media, 
                    users_accounts.password, 
                    users_accounts.type, 
                    users.first_name, 
                    users.last_name,
                    users_addresses.country,
                    users_addresses.state_or_province
                    FROM users_accounts
                    INNER JOIN users 
                    ON users.uuid = users_accounts.uuid 
                    INNER JOIN users_addresses 
                    ON users_addresses.uuid = users_accounts.uuid 
                    WHERE users_accounts.email_or_social_media = "${newModel.email_or_social_media}"`;

                sql.query(usersAccountsQuery, (err, res) => {
                    if (err) {
                        result(err, null);
                        return;
                    }

                    let UuidToBeEncrypt = res[0].uuid;
                    const cipherUuid = CryptoJS.AES.encrypt(UuidToBeEncrypt, JWT_SECRET).toString();

                    let sessionUser = {
                        uuid: cipherUuid,
                        email_or_social_media: res[0].email_or_social_media,
                        type: res[0].type,
                        first_name: res[0].first_name,
                        last_name: res[0].last_name,
                        country: res[0].country,
                        state_or_province: res[0].state_or_province,
                    };

                    if (res.length) {
                        newModel.session.user = sessionUser;
                        result(null, { message: 'found' });
                        return;
                    } else {
                        result(null, { message: 'not found' });
                        return;
                    }
                });
            } else {
                result(null, { message: 'Please check your email address and password' });
                return;
            }
        } else {
            result(null, { message: 'Please check your email address and password' });
            return;
        }
    });
};

function ec(dataToBeEncrypt) {
    let dataToBeEncryptx = 31;
    const ciphertext = CryptoJS.AES.encrypt(dataToBeEncryptx, JWT_SECRET).toString();
    return ciphertext;
}

module.exports = Model;

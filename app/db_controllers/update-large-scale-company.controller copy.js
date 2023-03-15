const { v4: uuidV4 } = require('uuid');
const { check, validationResult } = require('express-validator');
const CryptoJS = require('crypto-js');
const JWT_SECRET = process.env.JWT_SECRET;
const db = require('../db_models');
const sequelizeConfig = require('../config/sequelize.config.js');
const Users = db.users;
const Users_accounts = db.users_accounts;
const Users_address = db.users_address;
const Users_business = db.users_businesses;
const Users_business_characteristics = db.users_business_characteristics;
const Op = db.Sequelize.Op;

exports.update = async (req, res) => {
    // console.log('update-large-scale-company.controller', req.body);

    // update-large-scale-company.controller {
    //     companyName: 'Company Name:',
    //     tagline: 'Company Tag Line:',
    //     website: 'BusinessWebsite.com',
    //     businessEmailAddress: 'corteznina38@gmail.com',
    //     businessContactNumber: '0909822088',
    //     businessSocialMediaContactType: '3',
    //     businessSocialMediaContactNumber: '09098202055',
    //     businessAddress: 'Business Address:',
    //     businessCountryLocation: 'PH',
    //     businessStatesLocation: '1347',
    //     businessCityLocation: '83375',
    //     editLanguagesOfCommunication: [ 'en', 'tl', 'da', 'nl' ],
    //     currentLanguagesOfCommunication: '',
    //     editTradeCategory: '7',
    //     subCategorySelect: '26',
    //     subCategoryManual: '',
    //     minorSubCategorySelect: '152',
    //     minorSubCategoryManual: '',
    //     firstName: 'nina',
    //     lastName: 'cortez',
    //     middleName: '',
    //     country: 'PH',
    //     states: '1347',
    //     city: '143918',
    //     personalSocialMediaContactType: '2',
    //     personalSocialMediaContactNumber: '0909822088'
    //   }

    

    try {
        const { 
            companyName, 
            tagline, 
            website, 
            businessEmailAddress, 
            businessContactNumber, 
            businessSocialMediaContactType, 
            businessSocialMediaContactNumber, 
            businessAddress, 
            businessCountryLocation, 
            businessStatesLocation, 
            businessCityLocation, 
            editLanguagesOfCommunication, 
            editTradeCategory, 
            subCategorySelect, 
            subCategoryManual, 
            minorSubCategorySelect, 
            minorSubCategoryManual, 
            firstName, 
            lastName, 
            middleName, 
            country, 
            states, 
            city, 
            personalSocialMediaContactType, 
            personalSocialMediaContactNumber 
        } = req.body;
      
        let uuid = req.session.user.uuid;
        const bytes = CryptoJS.AES.decrypt(uuid, JWT_SECRET);
        const originalUuid = bytes.toString(CryptoJS.enc.Utf8);
        uuid = originalUuid;
        
        // do something with the variables
        let business_social_media_contact_type = businessSocialMediaContactType ? businessSocialMediaContactType : null;
        let personal_social_media_contact_type = personalSocialMediaContactType ? personalSocialMediaContactType : null;
        let uniqueChars = [...new Set(editLanguagesOfCommunication)];
        let languages = uniqueChars.toString();
        let business_sub_category = subCategorySelect ? subCategorySelect : null;
        let business_sub_category_str = subCategoryManual !== undefined && subCategoryManual !== '' ? subCategoryManual : null;
        let business_minor_sub_category = minorSubCategorySelect ? minorSubCategorySelect : null;
        let business_minor_sub_category_str = minorSubCategoryManual !== undefined && minorSubCategoryManual !== '' ? minorSubCategoryManual : null;

        const sequelize = sequelizeConfig.sequelize;
        const transaction = await sequelize.transaction();

        try {
            let usersObjects = {
                first_name: firstName,
                last_name: lastName,
                middle_name: middleName
            };

            let usersAddressObjects = {
                country: country,
                state_or_province: states,
                city: city
            };

            let usersAccountsObjects = {
                social_media_contact_type: personal_social_media_contact_type,
                contact_number: personalSocialMediaContactNumber
            };

            let usersBusinessObjects = {
                business_name: companyName,
                business_email: businessEmailAddress,
                business_contact: businessContactNumber,
                business_language_of_communication: languages,
                business_tagline: tagline,
                business_website: website,
                business_social_media_contact_type: business_social_media_contact_type,
                business_social_media_contact_number: businessSocialMediaContactNumber,
                business_address: businessAddress,
                business_country: businessCountryLocation,
                business_states: businessStatesLocation,
                business_city: businessCityLocation
            };
    
            let usersBusinessCharacteristicsObjects = {
                business_major_category: editTradeCategory,
                business_sub_category: business_sub_category,
                business_sub_category_str: business_sub_category_str,
                business_minor_sub_category: business_minor_sub_category,
                business_minor_sub_category_str: business_minor_sub_category_str,
            };
    
            let condition = { uuid: uuid };
    
            
            console.log('usersAccountsObjects: ', usersAccountsObjects);
            console.log('usersObjects: ', usersObjects);
            console.log('usersAddressObjects: ', usersAddressObjects);
            console.log('usersBusinessObjects: ', usersBusinessObjects);
            console.log('usersBusinessCharacteristicsObjects: ', usersBusinessCharacteristicsObjects);
    
            const user = await Users_business.update(usersBusinessObjects, {
                where: condition,
                transaction: transaction,
            });
            await Users.update(usersObjects, {
                where: condition,
                transaction: transaction,
            });
            await Users_accounts.update(usersAccountsObjects, {
                where: condition,
                transaction: transaction,
            });
            await Users_address.update(usersAddressObjects, {
                where: condition,
                transaction: transaction,
            });
            await Users_business_characteristics.update(usersBusinessCharacteristicsObjects, {
                where: condition,
                transaction: transaction,
            });

            await transaction.commit();
    
            console.log('success');
            res.send('success');
        } catch (e) {
            await transaction.rollback();
    
            let responseData = {
                message: 'rollback',
            };
    
            res.send(responseData);
        }
    } catch (error) {
        // handle error
    }
      
   
};

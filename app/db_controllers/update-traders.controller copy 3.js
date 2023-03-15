const { v4: uuidV4 } = require('uuid');
const { check, validationResult } = require('express-validator');
const CryptoJS = require('crypto-js');
const JWT_SECRET = process.env.JWT_SECRET;
const db = require('../db_models');
const sequelizeConfig = require('../config/sequelize.config.js');
// const Users_accounts = db.users_accounts;
// const Users_address = db.users_address;
const Users_business = db.users_businesses; //ok
const Users_business_characteristics = db.users_business_characteristics; //ok
const Users_business_visibility = db.users_business_visibility; //ok
// const Users = db.users;
const Op = db.Sequelize.Op;

exports.update = async (req, res) => {
    let uuid = req.session.user.uuid;
    const bytes = CryptoJS.AES.decrypt(uuid, JWT_SECRET);
    const originalUuid = bytes.toString(CryptoJS.enc.Utf8);
    uuid = originalUuid;

    // users_business
    let business_tagline = req.body.tagline; //ok
    let business_website = req.body.website; //ok
    let business_social_media_contact_type = req.body.businessSocialMediaContactType; //ok
    let start_operating_hour = req.body.startOperatingHour; //ok
    let end_operating_hour = req.body.endOperatingHour; //ok
    let business_email = req.body.businessEmailAddress; //ok
    let business_contact = req.body.businessContactNumber; //ok
    let editLanguagesOfCommunication = req.body.editLanguagesOfCommunication; //ok
    // let currentLanguagesOfCommunication = req.body.currentLanguagesOfCommunication; //ok
    let business_social_media_contact_number = req.body.businessSocialMediaContactNumber; //ok
    let business_address = req.body.businessAddress; //ok
    let business_country = req.body.editBusinessCountryLocation; //ok
    let business_states = req.body.editBusinessStatesLocation; //ok
    let business_city = req.body.editBusinessCityLocation; //ok
    let region_of_operation = req.body.traderRegionOfOperation; // nothing
    let country_of_operation = req.body.traderCountryOfOperation; //ok but check
    let country_for_state = req.body.traderCountryOfOperation2; // ok but check
    let states_of_operation = req.body.traderStatesOfOperation; //ok

    let business_major_category = req.body.editTradeCategory; //ok
    // let business_sub_category = req.body.subCategorySelect; //ok
    let business_sub_category = req.body.subCategorySelect; //ok
    business_sub_category = business_sub_category ? business_sub_category : null;
    // let business_sub_category_str = req.body.subCategoryManual; //ok
    let business_sub_category_str = req.body.subCategoryManual; //ok
    business_sub_category_str =
        business_sub_category_str !== undefined && business_sub_category_str !== '' ? business_sub_category_str : null;
    // let business_minor_sub_category = req.body.minorSubCategorySelect; //ok
    let business_minor_sub_category = req.body.minorSubCategorySelect; //ok
    business_minor_sub_category = business_minor_sub_category ? business_minor_sub_category : null;
    // let business_minor_sub_category_str = req.body.minorSubCategoryManual; //ok
    let business_minor_sub_category_str = req.body.minorSubCategoryManual; //ok
    business_minor_sub_category_str =
        business_minor_sub_category_str !== undefined && business_minor_sub_category_str !== ''
            ? business_minor_sub_category_str
            : null;

    let textAreaAddKeywords = req.body.textAreaAddKeywords; //ok
    let textAreaCurrentKeywords = req.body.textAreaCurrentKeywords; // no need to include
    let business_scale = req.body.editBusinessScale; //ok

    // users_business_visibility
    // let i_operate_on_a_world_wide_level = req.body.iOperateOnAWorldWideLevelRadioButton;
    // let i_operate_on_a_global_regional_level = req.body.iOperateOnAGlobalRegionalLevelRadioButton;
    // let i_operate_on_a_national_level = req.body.iOperateOnANationalLevelRadioButton;
    // let i_operate_on_a_state_level = req.body.iOperateOnAStateLevelRadioButton;

    let i_operate_on_a_world_wide_level = req.body.iOperateOnAWorldWideLevelRadioButton === undefined ? 0 : 1;
    let i_operate_on_a_global_regional_level = req.body.iOperateOnAGlobalRegionalLevelRadioButton === undefined ? 0 : 1;
    let i_operate_on_a_national_level = req.body.iOperateOnANationalLevelRadioButton === undefined ? 0 : 1;
    let i_operate_on_a_state_level = req.body.iOperateOnAStateLevelRadioButton === undefined ? 0 : 1;

    const sequelize = sequelizeConfig.sequelize;
    const transaction = await sequelize.transaction();

    try {
        // users_business
        let usersBusinessObjects = {
            business_email: business_email,
            business_contact: business_contact,
            //newModel.business_language_of_communication,
            business_language_of_communication: editLanguagesOfCommunication,
            business_tagline: business_tagline,
            business_website: business_website,
            business_social_media_contact_type: business_social_media_contact_type,
            business_social_media_contact_number: business_social_media_contact_number,
            business_address: business_address,
            business_country: business_country,
            business_states: business_states,
            business_city: business_city,
            region_of_operation: region_of_operation,
            country_of_operation: country_of_operation,
            country_for_state: country_for_state,
            states_of_operation: states_of_operation,
            //newModel.city_of_operation,
            start_operating_hour: start_operating_hour,
            end_operating_hour: end_operating_hour,
        };

        let usersBusinessCharacteristicsObjects = {
            business_industry_belong_to: textAreaAddKeywords,
            business_major_category: business_major_category,
            business_sub_category: business_sub_category,
            business_sub_category_str: business_sub_category_str,
            business_minor_sub_category: business_minor_sub_category,
            business_minor_sub_category_str: business_minor_sub_category_str,
            business_scale: business_scale,
        };

        let usersBusinessVisibilityObjects = {
            i_operate_on_a_world_wide_level: i_operate_on_a_world_wide_level,
            i_operate_on_a_global_regional_level: i_operate_on_a_global_regional_level,
            i_operate_on_a_national_level: i_operate_on_a_national_level,
            i_operate_on_a_state_level: i_operate_on_a_state_level,
        };

        let condition = { uuid: uuid };

        // console.log('usersBusinessObjects', usersBusinessObjects);
        // console.log('usersBusinessCharacteristicsObjects', usersBusinessCharacteristicsObjects);
        // console.log('usersBusinessVisibilityObjects', usersBusinessVisibilityObjects);

        const user = await Users_business.update(usersBusinessObjects, {where: condition, transaction: transaction});
        await Users_business_characteristics.update(usersBusinessCharacteristicsObjects, {where: { uuid: uuid }, transaction: transaction});
        await Users_business_visibility.update(usersBusinessVisibilityObjects, {where: { uuid: uuid }, transaction: transaction});
        await transaction.commit();
        res.send('success');
    } catch (e) {
        await transaction.rollback();

        let responseData = {
            message: 'rollback',
        };

        res.send(responseData);
    }
};

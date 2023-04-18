module.exports = (app) => {
  const db = require('../db_models');
  const sequelizeConfig = require('../config/sequelize.config.js');

  const Prospects = db.prospects;

  const Op = db.Sequelize.Op;

  const express = require('express');
  const path = require('path');
  const nodemailer = require('nodemailer');
  const hbs = require('nodemailer-express-handlebars');
  app.use(express.static(path.join(__dirname, '../../', 'public')));


  app.post('/api/post/emails/introduction', async (req, res) => {
    try {
      const records = await getAllProspects();
      records.forEach((record, index) => {
        let receiverEmailAddress = record.email_address;
        if (receiverEmailAddress) {
          setTimeout(() => {
            sendIntroductionEmail(receiverEmailAddress);
          }, index * 2000);
        }
      });
    } catch (error) {
      console.error(error);
    }
  });


  async function getAllProspects() {
    try {
      const records = await Prospects.findAll();
      return records;
    } catch (error) {
      console.error(error);
    }
  }

  function sendIntroductionEmail(receiverEmailAddress) {
    // console.log('receiverEmailAddress: ', receiverEmailAddress);
    // let receiverEmailAddress = 'potolin.federex@gmail.com';

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVERHOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.SUPPORT_RECEIVER_EMAIL_ADDRESS,
            pass: process.env.SUPPORT_RECEIVER_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const handlebarOptions = {
        viewEngine: {
            extName: '.handlebars',
            partialsDir: path.resolve('./public/view/email'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./public/view/email'),
        extName: '.handlebars',
    };

    transporter.use('compile', hbs(handlebarOptions));

    // setup email data with unicode symbols
    let mailOptions = {
        from: process.env.SUPPORT_RECEIVER_EMAIL_ADDRESS,
        to: receiverEmailAddress,
        subject: 'All World Trade - Introduction to AllWorldTrade platform for boosting market and sales',
        template: 'introduction',
        // context: {
        //     code: verification_code
        // },
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('transporter.sendMail error: ', error);
            // return error;
        } else {
            // res.send('email sent');
            console.log('Email has been sent to: ', receiverEmailAddress);
        }
        // console.log('Message sent info: ', info);
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        // res.render('Email has been sent');
    });
  }
};

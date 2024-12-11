// simple mail send using gmail 
const path = require('path');
const nodemailer = require('nodemailer');
const config = require('./config');
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:config.email.user, //email from .env
        pass:config.email.pass, // password from .env
    }
});



const invoiceData = {
  invoiceNumber: '9878748',
  purchasedItems: [
      { name: 'Product A', quantity: 2, price: 100 },
      { name: 'Product B', quantity: 1, price: 200 },
      { name: 'Product C', quantity: 3, price: 50 },
  ],
  companyName: 'Fablead Technolabs',
  total: function () {
      return this.purchasedItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
  },
};

const imagefilepath = path.join(__dirname,'files/image.jpg');
const pdffilepath = path.join(__dirname,'files/pdf_file.pdf');
const logofilepath = path.join(__dirname,'files/logo.png');

const htmlcontent = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>invoice template</title>
        </head>
        <body style="font-family: 'Poppins', Arial, sans-serif">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                  <td align="center">
                      <table width="600" cellpadding="0" cellspacing="0" border="1">
                          <tr>
                            <td style="background-color: #02745ec9; padding: 20px;">
                              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                  <td style="text-align: left; color: #fff; font-size: 24px; font-weight: bold;">
                                    Invoice #${invoiceData.invoiceNumber}
                                  </td>
                                  <td style="text-align: right;">
                                    <img src="cid:uniqueid_123" alt="Embedded Image" style="max-width: 100px; height: auto;" />
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>

                          <tr>
                              <td class="body" style="padding: 40px; text-align: left; font-size: 16px; line-height: 1.6;">
                              <span style="font-size: 24px;"> Purchesed Items </span> <br>
                              <hr\>

                              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                                <thead>
                                    <tr>
                                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Item</th>
                                        <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Quantity</th>
                                        <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Price</th>
                                        <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${invoiceData.purchasedItems.map(item => `
                                        <tr>
                                            <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
                                            <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.quantity}</td>
                                            <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">$${item.price.toFixed(2)}</td>
                                            <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">$${(item.quantity * item.price).toFixed(2)}</td>
                                        </tr>
                                    `).join('')}
                                    <tr>
                                        <td colspan="3" style="border: 1px solid #ddd; padding: 8px; text-align: right; font-weight: bold;">Total:</td>
                                        <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">$${invoiceData.total().toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                              
                          </tr>

                          <tr>
                          <td class="footer" style="background-color: #404040; padding: 40px; text-align: center; color: white; font-size: 14px;">
                          Copyright &copy; 2024 | fableadtechnolabs
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
        </body>
        </html>
        `;


const mailOptions = {
    from: config.email.user, 
    to: 'kirtan.394160@gmail.com', 
    subject: 'NodeMailer Practice Email',
    text: 'Hello! This is a test email sent using NodeMailer.',
    html: htmlcontent,
    attachments:[
      {
        filename:'image.jpg',
        path:imagefilepath

      },
      {
        filename:'pdf_file.pdf',
        path:pdffilepath
      },
      {
          filename: 'logo.png', 
          path: logofilepath,
          cid: 'uniqueid_123',
      }
    ]
    
  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Error:', error);
    }
    console.log('Email sent:', info.response);
  });
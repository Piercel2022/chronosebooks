const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { name, email, subject, message } = JSON.parse(event.body);

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'All fields are required' })
      };
    }

    // Configure email transporter
    // You'll need to set these environment variables in Netlify:
    // EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, CONTACT_EMAIL
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: process.env.EMAIL_PORT || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL || 'support@chronosebooks.com',
      subject: `New Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">New Contact Form Submission</h1>
          </div>
          
          <div style="background: #f7fafc; padding: 30px; border: 1px solid #e2e8f0;">
            <h2 style="color: #2d3748; margin-top: 0;">Contact Details</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; background: white; border: 1px solid #e2e8f0; font-weight: bold; width: 30%;">Name:</td>
                <td style="padding: 10px; background: white; border: 1px solid #e2e8f0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: white; border: 1px solid #e2e8f0; font-weight: bold;">Email:</td>
                <td style="padding: 10px; background: white; border: 1px solid #e2e8f0;">
                  <a href="mailto:${email}" style="color: #4299e1;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px; background: white; border: 1px solid #e2e8f0; font-weight: bold;">Subject:</td>
                <td style="padding: 10px; background: white; border: 1px solid #e2e8f0;">${subject}</td>
              </tr>
            </table>
            
            <h3 style="color: #2d3748; margin-top: 30px;">Message:</h3>
            <div style="background: white; padding: 20px; border: 1px solid #e2e8f0; border-radius: 5px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: #edf2f7; border-left: 4px solid #4299e1; border-radius: 3px;">
              <p style="margin: 0; color: #4a5568;">
                <strong>💡 Quick Action:</strong> Reply to ${email} within 24 hours to maintain our response guarantee!
              </p>
            </div>
          </div>
          
          <div style="background: #2d3748; padding: 20px; text-align: center; color: white;">
            <p style="margin: 0; font-size: 12px;">
              This message was sent via the Chronos eBooks contact form
            </p>
          </div>
        </div>
      `
    };

    // Confirmation email to customer
    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "We've Received Your Message - Chronos eBooks",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">Thanks for Reaching Out! 🎉</h1>
          </div>
          
          <div style="background: #f7fafc; padding: 30px;">
            <p style="font-size: 16px; color: #2d3748; line-height: 1.6;">
              Hi <strong>${name}</strong>,
            </p>
            
            <p style="font-size: 16px; color: #2d3748; line-height: 1.6;">
              Thank you for contacting Chronos eBooks! We've received your message and our team is already on it.
            </p>
            
            <div style="background: white; padding: 20px; border-left: 4px solid #48bb78; margin: 20px 0; border-radius: 5px;">
              <p style="margin: 0; color: #2d3748;">
                <strong>✓ What happens next?</strong><br>
                We'll review your inquiry and respond within <strong>24 hours</strong> during business days.
              </p>
            </div>
            
            <div style="background: #edf2f7; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h3 style="color: #2d3748; margin-top: 0;">Your Message Summary:</h3>
              <p style="margin: 5px 0; color: #4a5568;"><strong>Subject:</strong> ${subject}</p>
              <p style="margin: 5px 0; color: #4a5568;"><strong>Message:</strong></p>
              <p style="color: #718096; font-style: italic; margin: 10px 0;">
                "${message.substring(0, 150)}${message.length > 150 ? '...' : ''}"
              </p>
            </div>
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px; text-align: center; margin: 30px 0;">
              <h3 style="color: white; margin: 0 0 15px 0;">While You Wait...</h3>
              <p style="color: #e6e6ff; margin: 0 0 20px 0;">
                Explore our latest eBooks and join our community!
              </p>
              <a href="https://chronosebooks.com/products" 
                 style="display: inline-block; background: white; color: #667eea; padding: 12px 30px; 
                        text-decoration: none; border-radius: 5px; font-weight: bold; margin: 5px;">
                Browse eBooks
              </a>
              <div style="margin-top: 20px;">
                <a href="https://facebook.com/chronosebooks" style="margin: 0 10px; color: white; text-decoration: none;">📘 Facebook</a>
                <a href="https://instagram.com/chronosebooks" style="margin: 0 10px; color: white; text-decoration: none;">📷 Instagram</a>
              </div>
            </div>
            
            <p style="font-size: 14px; color: #718096; line-height: 1.6;">
              If you have any urgent concerns, feel free to reply to this email directly.
            </p>
            
            <p style="font-size: 16px; color: #2d3748; line-height: 1.6;">
              Best regards,<br>
              <strong>The Chronos eBooks Team</strong>
            </p>
          </div>
          
          <div style="background: #2d3748; padding: 20px; text-align: center;">
            <p style="color: white; margin: 0 0 10px 0; font-size: 12px;">
              Chronos eBooks - Transform Your Life, One Page at a Time
            </p>
            <p style="color: #a0aec0; margin: 0; font-size: 12px;">
              © 2024 Chronos eBooks. All rights reserved.
            </p>
          </div>
        </div>
      `
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(customerMailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Message sent successfully!' 
      })
    };

  } catch (error) {
    console.error('Contact form error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to send message. Please try again later.' 
      })
    };
  }
};
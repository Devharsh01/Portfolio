import { NextResponse, NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { applyCors, corsMiddleware } from "@/lib/cors";

async function handler(req: NextRequest) {
  try {
    const text = await new Response(req.body).text();
    const body = text ? JSON.parse(text) : {};
    const { content, prompt, senderName, senderEmail, subject } =
      body;

    // Validate required fields
    if (!content) {
      return NextResponse.json(
        { error: "Email content is required" },
        { status: 400 }
      );
    }

    if (!senderName) {
      return NextResponse.json(
        { error: "Sender name is required" },
        { status: 400 }
      );
    }

    if (!senderEmail) {
      return NextResponse.json(
        { error: "Sender email is required" },
        { status: 400 }
      );
    }

    if (!subject) {
      return NextResponse.json(
        { error: "Subject is required" },
        { status: 400 }
      );
    }

    // Verify environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
      console.error("Missing email configuration");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(senderEmail)) {
      return NextResponse.json(
        { error: "Invalid email address format" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.verify();

    const emailSubject =
      subject || `AI Generated Email: ${prompt.substring(0, 50)}...`;

    // Create a from address that includes the name if provided
    const fromAddress = senderEmail
      ? senderName
        ? `"${senderName}" <${process.env.EMAIL_USER}>`
        : `"${senderEmail}" <${process.env.EMAIL_USER}>`
      : `"AI Email Generator" <${process.env.EMAIL_USER}>`;

    const mailOptions = {
      from: `"${senderName}" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
      // replyTo: `"${senderName}" <${senderEmail}>`,
      subject: subject,
      text: content,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; border-radius: 10px; padding: 30px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #333; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #e4ded7;">
              📧 New Message Received
            </h2>
            
            <div style="margin-bottom: 25px;">
              <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-bottom: 20px;">
                <div style="background-color: #f8f9fa; padding: 10px 15px; border-radius: 8px; border-left: 4px solid #0E1016;">
                  <strong style="color: #0E1016;">From:</strong> ${senderName}
                </div>
                <div style="background-color: #f8f9fa; padding: 10px 15px; border-radius: 8px; border-left: 4px solid #0E1016;">
                  <strong style="color: #0E1016;">Email:</strong> ${senderEmail}
                </div>
              </div>
              
              <div style="background-color: #f8f9fa; padding: 10px 15px; border-radius: 8px; border-left: 4px solid #0E1016; margin-bottom: 15px;">
                <strong style="color: #0E1016;">Subject:</strong> ${subject}
              </div>
              
              ${prompt && prompt !== "Manual Email" ? `
                <div style="background-color: #e8f4f8; padding: 10px 15px; border-radius: 8px; border-left: 4px solid #17a2b8; margin-bottom: 15px;">
                  <strong style="color: #17a2b8;">🤖 AI Prompt:</strong> ${prompt}
                </div>
              ` : ''}
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #e9ecef;">
              <h3 style="color: #495057; margin-bottom: 15px; font-size: 16px;">💬 Message:</h3>
              <div style="line-height: 1.6; color: #212529; white-space: pre-wrap;">${content}</div>
            </div>
            
            <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #dee2e6; text-align: center; color: #6c757d; font-size: 12px;">
              <p>This email was sent from your portfolio contact form at ${new Date().toLocaleString()}</p>
              <p style="margin-top: 5px;">Please respond to ${senderEmail} if you wish to reply.</p>
            </div>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    // Send confirmation email to the sender
    try {
      const confirmationMailOptions = {
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: senderEmail,
        subject: `Thank you for contacting me - ${subject}`,
        text: `Dear ${senderName},

        Thanks for reaching out to me. I have received your message and will get back to you soon.

        Your message details:
        Subject: ${subject}
        Message: ${content}

        I will typically respond within 24-48 hours.

        Best regards,
        Portfolio Team`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: white; border-radius: 10px; padding: 30px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #333; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #e4ded7;">
                ✅ Thank You for Contacting Me!
              </h2>
              
              <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                Dear <strong>${senderName}</strong>,
              </p>
              
              <p style="color: #333; font-size: 14px; line-height: 1.6; margin-bottom: 25px;">
                Thank you for reaching out to me. I have successfully received your message and will get back to you as soon as possible.
              </p>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #28a745; margin-bottom: 25px;">
                <h3 style="color: #28a745; margin-bottom: 15px; font-size: 16px;">📋 Your Message Summary:</h3>
                <div style="margin-bottom: 10px;">
                  <strong style="color: #495057;">Subject:</strong> <span style="color: #212529;">${subject}</span>
                </div>
                <div style="margin-bottom: 15px;">
                  <strong style="color: #495057;">Message:</strong>
                </div>
                <div style="background-color: white; padding: 15px; border-radius: 5px; border: 1px solid #dee2e6;">
                  <div style="color: #212529; line-height: 1.6; white-space: pre-wrap;">${content}</div>
                </div>
              </div>
              
              <div style="background-color: #e8f4f8; padding: 15px; border-radius: 8px; border-left: 4px solid #17a2b8; margin-bottom: 25px;">
                <p style="color: #17a2b8; margin: 0; font-size: 14px;">
                  <strong>⏰ Response Time:</strong> I typically respond within 24-48 hours during business days.
                </p>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; text-align: center; color: #6c757d; font-size: 12px;">
                <p>This is an automated confirmation email.</p>
                <p style="margin-top: 5px;">
                  Please do not reply to this email if you have additional questions - send a new message through our contact form.
                </p>
                <p style="margin-top: 10px; color: #28a745; font-weight: bold;">
                  Thank you for your interest! 🚀
                </p>
              </div>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(confirmationMailOptions);
      console.log("Confirmation email sent successfully to:", senderEmail);
    } catch (confirmationError) {
      console.error("Failed to send confirmation email:", confirmationError);
      // Don't fail the main request if confirmation email fails
    }

    // Return more detailed information about the sent email
    return NextResponse.json(
      {
        message: "Email sent successfully",
        id: info.messageId,
        details: {
          senderName: senderName,
          senderEmail: senderEmail,
          timestamp: new Date().toISOString(),
          confirmationSent: true,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to send email", details: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Failed to send email", details: "Unknown error" },
      { status: 500 }
    );
  }
}

export const POST = (req: NextRequest) => applyCors(req, handler);
export const OPTIONS = (req: NextRequest) => corsMiddleware(req);

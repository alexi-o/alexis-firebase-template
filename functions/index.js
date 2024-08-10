// functions/index.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");

admin.initializeApp();
sgMail.setApiKey(functions.config().sendgrid.api_key);

exports.sendInvitationEmail = functions.firestore
  .document("accessRequests/{requestId}")
  .onUpdate(async (change, context) => {
    const afterData = change.after.data();
    const beforeData = change.before.data();

    if (beforeData.status !== "approved" && afterData.status === "approved") {
      const email = afterData.email;
      const invitationCode = afterData.invitationCode;

      const msg = {
        to: email,
        from: "your-email@example.com",
        subject: "Your Access Invitation Code",
        text: `You have been approved for access. Use the following invitation code to sign up: ${invitationCode}`,
      };

      try {
        await sgMail.send(msg);
        console.log(`Invitation email sent to ${email}`);
      } catch (error) {
        console.error("Error sending email:", error);
      }
    }
  });

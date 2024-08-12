const functions = require("firebase-functions");
const admin = require("firebase-admin");
const mailjet = require("node-mailjet");

admin.initializeApp();

const mailjetClient = mailjet.apiConnect(
  functions.config().mailjet.api_key,
  functions.config().mailjet.api_secret
);

exports.sendInvitationEmail = functions.firestore
  .document("accessRequests/{requestId}")
  .onUpdate(async (change, context) => {
    const afterData = change.after.data();
    const beforeData = change.before.data();

    if (beforeData.status !== "approved" && afterData.status === "approved") {
      const email = afterData.email;
      const invitationCode = afterData.invitationCode;

      try {
        const request = mailjetClient
          .post("send", { version: "v3.1" })
          .request({
            Messages: [
              {
                From: {
                  Email: "your-email@example.com",
                  Name: "Your Name",
                },
                To: [
                  {
                    Email: email,
                  },
                ],
                Subject: "Your Access Invitation Code",
                TextPart: `You have been approved for access. Use the following invitation code to sign up: ${invitationCode}`,
              },
            ],
          });

        await request;
        console.log(`Invitation email sent to ${email}`);
      } catch (error) {
        console.error("Error sending email:", error);
      }
    }
  });

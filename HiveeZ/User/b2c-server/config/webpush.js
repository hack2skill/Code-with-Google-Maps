const webpush = require("web-push");

const vapidKeys = 
{
  publicKey: "BL5K8kB_kgzknNBjNvOkd1-ISoroCbkUdfaUPtAcLShuGJz9IUmtmIx0vmWhxHEb9FnnCQVpelarjX8KpYoUndo",
  privateKey: "fbwx1OfWIR_GAQ7T4yFiuGKJL_mm05q2zyOdcrMuqP8",
};

const pushNotification = async (sub, payload) => {
  console.log("Pushing notification...");
  console.log(sub, payload);
  webpush.setVapidDetails(
      'mailto:test@test.com',
      vapidKeys.publicKey,
      vapidKeys.privateKey
    );
    await webpush.sendNotification(sub, payload).catch((err) => {
      console.error(err);
    });
}

module.exports = {pushNotification};
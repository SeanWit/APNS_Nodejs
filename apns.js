var apns = require("apns"), options, connection, notification;

options = {
   keyFile : "conf/key.pem",
   certFile : "conf/cert.pem",
   debug : true
};

connection = new apns.Connection(options);

notification = new apns.Notification();
notification.device = new apns.Device("iphone_token");
notification.alert = "Hello World !";

connection.sendNotification(notification);

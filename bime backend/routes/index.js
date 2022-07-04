var express = require('express');
var router = express.Router();
const Pusher = require("pusher");


/* GET home page. */
router.get('/', function(req, res, next) {
  
  
  const pusher = new Pusher({
    app_id : process.env.PUSHER_ID,
    key : process.env.PUSHER_KEY,
    secret : process.env.PUSHER_SECRET,
    cluster : prcess.env.PUSHER_CLUSTER,
    useTLS: true
  });
  
  pusher.trigger("my-channel", "my-event", {
    message: "hello world"
  });
  res.render('index', { title: 'Express' });
});

module.exports = router;

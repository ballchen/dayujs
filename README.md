## dayujs is a alidayu module for nodejs

## Usage

### Request
```
var AliDaYu = require('dayujs');
var api = new AliDaYu({
  app_key: 'KEY',
  secret: 'SECRET'
});

let options = {
  sms_free_sign_name: '身份验证',
  sms_param: {
    code: '1234',
    product: 'dayujs test'
  },
  rec_num: '1300000000', 
  sms_template_code: 'SMS_XXXXXXX',
};

api.sms(option, function(err, result) {
  if(err)
    console.log(err);
  else
    console.log(result);
})
```

### Response

#### SUCCESS
```
{  
   "alibaba_aliqin_fc_sms_num_send_response":{  
      "result":{  
         "err_code":"0",
         "model":"101022856840^1101495700000",
         "success":true
      },
      "request_id":"15q116rxxxxxx"
   }
}
```


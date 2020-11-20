import RPCClient = require('@alicloud/pop-core');
import { Injectable } from '@nestjs/common';
import { AliSMSConfig, SmsConfig } from 'src_config/aliyun-sms.config';

@Injectable()
export class SmsSenderService {
  client: RPCClient;
  private codeStr = '123456789';

  constructor() {
    this.client = new RPCClient({
      accessKeyId: AliSMSConfig.accessKeyId,
      accessKeySecret: AliSMSConfig.accessKeySecret,
      apiVersion: AliSMSConfig.apiVersion,
      endpoint: AliSMSConfig.endpoint
    });
  }

  createRandomCode(): string {
    var str = '';
    for (var i = 0; i < 6; i++) {
      var ran = this.getRandom(0, 9);
      str += this.codeStr.charAt(ran);
    }

    return str;
  }

  async sendCodeSMS(number: string, code: string, template: string) {
    const input = new SmsSendInput();
    input.PhoneNumbers = number;
    input.TemplateParam = "{code:" + code + "}"
    input.TemplateCode = template;

    // Default
    input.RegionId = SmsConfig.RegionId;
    input.SignName = SmsConfig.SignName;

    var requestOption = {
      method: 'POST'
    };

    this.client.request('SendSms', input, requestOption).then((result) => {
      const res = JSON.stringify(result);
      if (res['Code'] === 'OK') {
        return true;
      }
      else {
        return false;
      }
    }, (ex) => {
      return false;
    })
  }

  private getRandom(n, m) { // param: (Number, Number)
    n = Number(n);
    m = Number(m);
    // 确保 m 始终大于 n
    if (n > m) {
      var temp = n;
      n = m;
      m = temp;
    }
    // 下有详细说明
    return Math.floor(Math.random() * (m - n) + n);
  }
}

export class SmsSendInput {
  RegionId: string;
  PhoneNumbers: string;
  SignName: string;
  TemplateCode: string;
  TemplateParam: string;
}
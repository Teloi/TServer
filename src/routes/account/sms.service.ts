import { Injectable } from '@nestjs/common';
import { AliSMSConfig, params } from 'src_config/aliyun-sms.config';
import RPCClient = require('@alicloud/pop-core');

@Injectable()
export class SmsService {

  client: RPCClient;

  constructor() {
    this.client = new RPCClient({
      accessKeyId: AliSMSConfig.accessKeyId,
      accessKeySecret: AliSMSConfig.accessKeySecret,
      apiVersion: AliSMSConfig.apiVersion,
      endpoint: AliSMSConfig.endpoint
    });
  }

  async sendOneSMS() {


    var requestOption = {
      method: 'POST'
    };

    this.client.request('SendSms', params, requestOption).then((result) => {
      console.log(JSON.stringify(result));
    }, (ex) => {
      console.log(ex);
    })


  }
}

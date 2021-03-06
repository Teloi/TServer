import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import * as Redis from 'ioredis';

@Injectable()
export class CacheService {
  client: Redis.Redis;

  loginCache = '_Login';
  registerCache = '_Register';

  constructor(private redisService: RedisService) {
    this.getClient();
  }

  async getClient() {
    this.client = this.redisService.getClient();
  }

  //设置值的方法
  async set(key: string, value: any, seconds?: number) {
    value = JSON.stringify(value);
    if (!this.client) {
      await this.getClient();
    }
    if (!seconds) {
      await this.client.set(key, value);
    } else {
      await this.client.set(key, value, 'EX', seconds);
    }
  }

  //获取值的方法
  async get(key: string) {
    if (!this.client) {
      await this.getClient();
    }
    var data = await this.client.get(key);
    if (!data) return;
    return JSON.parse(data);
  }

  // 删除值的方法
  async clear(key: string) {
    if (!this.client) {
      await this.getClient();
    }
    await this.client.del(key);
  }
}
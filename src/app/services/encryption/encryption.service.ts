import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptService {
  private saltOrRounds: number = 12;

  public async encrypt(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.saltOrRounds);
    return hash;
  }

  public async match(value: string, hash: string ): Promise<boolean> {
    const isMatch = await bcrypt.compare(value, hash);
    return isMatch;
  }
}
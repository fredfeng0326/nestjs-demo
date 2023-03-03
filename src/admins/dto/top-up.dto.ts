import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TopUpDto {
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;
}

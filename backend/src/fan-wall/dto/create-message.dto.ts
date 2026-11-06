import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  author: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(280)
  message: string;
}

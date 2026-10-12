import {
  IsDateString,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @MinLength(2)
  eventName: string;

  @IsDateString()
  eventDate: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsUrl({ require_protocol: true, require_tld: false })
  imageUrl?: string;
}

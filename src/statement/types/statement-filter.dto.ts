import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumberString } from 'class-validator';
import { format, startOfDay } from 'date-fns';

class StatementFilterDTO {
  @ApiProperty({
    default: format(startOfDay(new Date()), 'yyyy-MM-dd HH:mm:ss'),
  })
  @IsDateString()
  from: string;

  @ApiProperty({ default: format(new Date(), 'yyyy-MM-dd HH:mm:ss') })
  @IsDateString()
  to: string;

  @ApiProperty({ default: 0 })
  @IsNumberString()
  page: number;

  @ApiProperty({ default: 10 })
  @IsNumberString()
  limit: number;
}

export default StatementFilterDTO;

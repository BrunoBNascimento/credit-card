import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';
import { format, startOfYear } from 'date-fns';

class BillQueryDTO {
  @ApiProperty({
    description: 'Data Inicial da busca das faturas',
    default: format(startOfYear(new Date()), 'yyyy-MM-dd HH:mm:ss'),
  })
  @IsDateString()
  from: string;

  @ApiProperty({
    description: 'Data Final da busca das faturas',
    default: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  })
  @IsDateString()
  to: string;
}

export default BillQueryDTO;

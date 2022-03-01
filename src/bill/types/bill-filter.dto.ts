import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';
import { format, startOfYear } from 'date-fns';

class BillFilterDTO {
  @ApiProperty({
    description: 'Data inicial da busca de faturas',
    default: format(startOfYear(new Date()), 'yyyy-MM-dd'),
  })
  @IsDateString()
  from: string;

  @ApiProperty({
    description: 'Data final da busca de faturas',
    default: format(new Date(), 'yyyy-MM-dd'),
  })
  @IsDateString()
  to: string;
}

export default BillFilterDTO;

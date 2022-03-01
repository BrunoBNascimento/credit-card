import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

class BillFilterDTO {
  @ApiProperty({ description: 'Data inicial da busca de faturas' })
  @IsDateString()
  from: string;

  @ApiProperty({ description: 'Data final da busca de faturas' })
  @IsDateString()
  to: string;
}

export default BillFilterDTO;

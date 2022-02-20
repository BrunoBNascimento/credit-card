import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNumberString } from 'class-validator';

class StatementFilterDTO {
  @ApiProperty({
    description: 'Data inicial do filtro',
    default: new Date().toISOString(),
  })
  @IsDateString()
  from: string;

  @ApiProperty({
    description: 'Data inicial do filtro',
    default: new Date().toISOString(),
  })
  @IsDateString()
  to: string;

  @ApiPropertyOptional({
    description: 'Página',
    default: 0,
  })
  @IsNumberString()
  page: number;

  @ApiPropertyOptional({
    description: 'Limite',
    default: 10,
  })
  @IsNumberString()
  limit: number;
}

export default StatementFilterDTO;

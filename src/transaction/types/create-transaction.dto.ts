import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  MaxLength,
  MinLength,
} from 'class-validator';

class CreateTransactionDTO {
  @ApiProperty({
    description: 'Cartão de crédito usado',
  })
  @IsNotEmpty({ message: 'Número de cartão obrigatório' })
  @MaxLength(16, {
    message: 'Numero de cartão deve conter no máximo 16 dígitos',
  })
  @MinLength(13, { message: 'Número de cartão deve ter no mínimo 13 dígitos' })
  credit_card: string;

  @ApiProperty({
    description: 'Valor da transação',
  })
  @IsNumber()
  @IsPositive()
  value: number;
}

export default CreateTransactionDTO;

import { ApiProperty } from '@nestjs/swagger';

class CreateTransactionDTO {
  @ApiProperty({ description: 'Cartão de crédito utilizado na compra' })
  credit_card: string;

  @ApiProperty({ description: 'Valor da compra' })
  value: number;
}

export default CreateTransactionDTO;

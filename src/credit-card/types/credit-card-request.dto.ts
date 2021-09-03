import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';

class CreditCardRequestDTO {
  @ApiProperty({
    description: 'Dia no qual usuário quer que vença sua fatura',
  })
  @IsNumber()
  preferredDueDay: number;

  @ApiProperty({
    description: 'Nome do usuário',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description:
      'Email do usuário, também usado para fazer login caso aprovado',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'CPF válido do usuário',
  })
  @IsNotEmpty()
  @IsNumberString()
  cpf: string;
}

export default CreditCardRequestDTO;

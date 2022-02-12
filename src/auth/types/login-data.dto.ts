import { ApiProperty } from "@nestjs/swagger";

class LoginDataDTO {

    @ApiProperty({
        description: 'Dia no qual usuário quer que vença sua fatura',
    })
    email: string;

    @ApiProperty({
        description: 'Dia no qual usuário quer que vença sua fatura',
    })
    password: string;
}

export default LoginDataDTO;
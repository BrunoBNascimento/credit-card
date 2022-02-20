import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BalanceService } from './balance.service';
import GetBalanceDTO from './types/get-balance.dto';

@ApiTags('Balance')
@ApiBearerAuth('JWT')
@Controller('balance')
export class BalanceController {
  constructor(private balanceService: BalanceService) {}

  @Get(':creditCard')
  async getBalance(@Param('creditCard') creditCard: string) {
    const balance = await this.balanceService.getBalanceByCreditCardNumber(
      creditCard,
    );

    return new GetBalanceDTO(balance);
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/is-public.decorator';
import { BillService } from './bill.service';
import BillQueryDTO from './types/bill-query.dto';

@IsPublic()
@ApiTags('Bills')
@ApiBearerAuth('JWT')
@Controller('bill')
export class BillController {
  constructor(private billService: BillService) {}

  @Get()
  getBills(@Query() params: BillQueryDTO) {
    const { from, to } = params;

    return this.billService.getBills(from, to);
  }
}

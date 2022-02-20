import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { StatementService } from './statement.service';
import StatementFilterDTO from './types/statement-filter.dto';

@ApiTags('Statement')
@ApiBearerAuth('JWT')
@Controller('statement')
export class StatementController {
  constructor(private statementService: StatementService) {}

  @Get()
  getPaginatedStatement(@Query() params: StatementFilterDTO) {
    return this.statementService.paginate(params);
  }
}

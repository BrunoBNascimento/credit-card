import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/is-public.decorator';
import { TransactionService } from './transaction.service';
import CreateTransactionDTO from './types/create-transaction.dto';

@IsPublic()
@ApiTags('Transactions')
@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  createTransaction(@Body() createTransactionDto: CreateTransactionDTO) {
    return this.transactionService.createTransaction(createTransactionDto);
  }
}

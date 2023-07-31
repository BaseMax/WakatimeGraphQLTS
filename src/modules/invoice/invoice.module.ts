import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceResolver } from './invoice.resolver';

@Module({
  providers: [InvoiceService, InvoiceResolver]
})
export class InvoiceModule {}

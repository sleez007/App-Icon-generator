import { Module } from '@nestjs/common';
import { IconGeneratorService } from './icon-generator.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [IconGeneratorService],
  exports: [IconGeneratorService],
})
export class IconGeneratorModule {}

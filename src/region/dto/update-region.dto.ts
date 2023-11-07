import { PartialType } from '@nestjs/swagger';
import { AddRegionDto } from './add-region.dto';

export class UpdateRegionDto extends PartialType(AddRegionDto) {}

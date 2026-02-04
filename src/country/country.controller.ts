import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { CountryService } from './country.service';
import type { Country } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  findAll(): Country[] {
    return this.countryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Country {
    return this.countryService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateCountryDto): Country {
    return this.countryService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCountryDto,
  ): Country {
    return this.countryService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.countryService.remove(id);
  }
}

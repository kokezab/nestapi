import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

export interface Country {
  id: number;
  name: string;
}

@Injectable()
export class CountryService {
  private countries: Country[] = [];
  private idCounter = 1;

  findAll(): Country[] {
    return this.countries;
  }

  findOne(id: number): Country {
    const country = this.countries.find((c) => c.id === id);
    if (!country) {
      throw new NotFoundException(`Country with id ${id} not found`);
    }
    return country;
  }

  create(dto: CreateCountryDto): Country {
    const country: Country = { id: this.idCounter++, name: dto.name };
    this.countries.push(country);
    return country;
  }

  update(id: number, dto: UpdateCountryDto): Country {
    const country = this.findOne(id);
    country.name = dto.name;
    return country;
  }

  remove(id: number): void {
    const index = this.countries.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new NotFoundException(`Country with id ${id} not found`);
    }
    this.countries.splice(index, 1);
  }
}

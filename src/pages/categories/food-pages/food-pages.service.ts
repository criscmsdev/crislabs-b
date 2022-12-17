import { Injectable } from '@nestjs/common';
import { CreateFoodPageInput } from './dto/create-food-page.input';
import { UpdateFoodPageInput } from './dto/update-food-page.input';

@Injectable()
export class FoodPagesService {
  create(createFoodPageInput: CreateFoodPageInput) {
    return 'This action adds a new foodPage';
  }

  findAll() {
    return `This action returns all foodPages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} foodPage`;
  }

  update(id: number, updateFoodPageInput: UpdateFoodPageInput) {
    return `This action updates a #${id} foodPage`;
  }

  remove(id: number) {
    return `This action removes a #${id} foodPage`;
  }
}

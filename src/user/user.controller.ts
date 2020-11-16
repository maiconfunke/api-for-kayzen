import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() user: User) {
    this.userService.createUser(user);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id): Promise<User | undefined> {
    return this.userService.getUser(id);
  }

  @Put('/:id')
  updateCompany(
    @Body() user: User,
    @Param('id', ParseIntPipe) id,
  ): Promise<User | undefined> {
    return this.userService.updateUser({ ...user, id });
  }

  @Delete('/:id')
  deleteUser(@Param('id', ParseIntPipe) id): Promise<HttpException> {
    return this.userService.deleteUser(id);
  }
}

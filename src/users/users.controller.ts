import { Controller, Post, Body, Get, Param, UseGuards, Put, Delete, Headers } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserGuard } from 'src/auth/jwt/user.guard';
import { CreateColumnDto } from './dto/create-column.dto';
import { CreateCardDto } from './dto/create-card.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard, UserGuard)
  @Post('/:id/add_column')
  addColumn(@Body() createColumnDto: CreateColumnDto, @Param('id') id: string) {
    return this.usersService.createColumn(createColumnDto, +id);
  }

  @Post('/:id/:id_card')
  addCard(@Body() createCardDto: CreateCardDto, @Param('id') id: string, @Param('id_card') idColumn: string) {
    return this.usersService.createCard(createCardDto, +idColumn, +id);
  }

  // @Put()
  // update(@Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.updateUser(updateUserDto, updateUserDto.id);
  // }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @UseGuards(JwtAuthGuard, UserGuard)
  @Get(':id')
  get(@Param('id') id: string) {
    return this.usersService.showUserById(+id);
  }

  @UseGuards(JwtAuthGuard, UserGuard)
  @Post('create')
  createColumn(@Headers('Authorization') headers: string) {

    console.log(headers);
    /// this.authService.getId();
  }

}

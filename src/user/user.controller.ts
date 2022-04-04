import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserCreateDto } from './models/user-create.dto';
import { UserUpdateDto } from './models/user-update.dto';
import { User } from './models/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private userService: UserService) {

    }

    @Get()
    async all(
        @Query('page') page = 1 
    ): Promise<User[]> {
        return await this.userService.paginate(page)
    }

    @Post()
    async create(@Body() body: UserCreateDto): Promise<User>{
        return this.userService.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            age: body.age,
            grade: body.grade
        })
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: UserUpdateDto
    ){
        return this.userService.update(id, body)
    }

    @Delete(':ids')
    async delete(
        @Param('ids') ids: string
    ){
        return this.userService.delete(ids)
    }
}

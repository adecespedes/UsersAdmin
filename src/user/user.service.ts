import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';

@Injectable()
export class UserService {    
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>        
    ) {
    }

    async all(): Promise<User[]>{
        return await this.userRepository.find()
    }

    async paginate(page = 1): Promise<any> {
        const take = 5
        const [users, total] = await this.userRepository.findAndCount({
            take,
            skip: (page - 1) * take
        })

        return {
            data: users.map(user => {
                const {...data} = user
                return data
            }),
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take)
            }

        }
    }

    async create(data): Promise<User> {
        return this.userRepository.save(data)
    }

    async update(id: number, data): Promise<any> {
        return this.userRepository.update(id, data)
    }

    async delete(ids: string): Promise<any> {
        const array = ids.split(/\s*,\s*/).map(Number);
        array.map(id => {
            return this.userRepository.delete(id)
        })
    }
}

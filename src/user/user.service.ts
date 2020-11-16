import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
      ) {}
    
      async getUsers(): Promise<User[]> {
        return this.usersRepository.find();
      }
    
      async getUser(id: number): Promise<User | undefined> {
        return this.usersRepository.findOne(id).then((user: User) => {
            if(user) {
              return user;
            } else {
              throw new HttpException('Not found', HttpStatus.NOT_FOUND);
            }
          });
      
      }
    
      async createUser(user: User): Promise<User> {
        return this.usersRepository.save(user);
      }
    
      async updateUser(user: User): Promise<User | undefined> {
        return this.usersRepository.findOne(user.id).then((userSaved: User) => {
            if(userSaved) {
              return this.usersRepository.save({...userSaved, ...user});
            } else {
              throw new HttpException('Not found', HttpStatus.NOT_FOUND);
            }
          });
      
      }
    
      async deleteUser(id: number): Promise<HttpException> {
        return this.usersRepository.findOne(id).then((data: User) => {
            if(data) {
              return this.usersRepository.delete(id).then(() => {
                throw new HttpException(`Removed - Id: ${id}`, HttpStatus.OK);
              });
            } else {
              throw new HttpException('Not found', HttpStatus.NOT_FOUND);
            }
          });
      
      }    
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import Big from 'big.js';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { createHash } from 'crypto';
import { Repository } from 'typeorm';
import {
  CreateAdminDto,
  CreateUserDto,
  UpdateUserDto,
} from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { Role } from '../../auth/models/roles.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto | CreateAdminDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (user) {
      throw new BadRequestException();
    }

    const createdUser = await this.userRepository.create(createUserDto);
    const saveUser = await this.userRepository.save(createdUser);
    delete saveUser.password;
    delete saveUser.refreshToken;
    return saveUser;
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findAllUsers() {
    return this.userRepository.find({
      where: {
        role: Role.CUSTOMER,
      },
    });
  }

  async findByEmailAndGetPassword(email: string) {
    return await this.userRepository.findOne({
      select: ['id', 'password', 'role'],
      where: { email },
    });
  }

  async addBalance(userId: string, amount: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    user.balance = Big(user.balance).plus(amount).toNumber();
    return this.userRepository.save(user);
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async findById(userId: string) {
    return await this.userRepository.findOneOrFail({ where: { id: userId } });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneOrFail({
      where: { email },
    });
  }

  async findAllDetails(email?: string, firstName?: string, lastName?: string) {
    let query = this.userRepository.createQueryBuilder('users');
    if (email)
      query = query.andWhere('users.email ILIKE :email', {
        email,
      });
    if (firstName)
      query = query.andWhere('users.first_name ILIKE :firstName', {
        firstName,
      });
    if (lastName)
      query = query.andWhere('users.last_name ILIKE :lastName', {
        lastName,
      });
    return query.getMany();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }
    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }

    return this.userRepository.remove(user);
  }

  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    //crypto is a node module, and bcrypt the maximum length of the hash is 60 characters, and token is longer than that, so we need to hash it
    const hash = createHash('sha256').update(refreshToken).digest('hex');

    const currentHashedRefreshToken = await bcrypt.hashSync(hash, 10);
    return await this.userRepository.update(userId, {
      refreshToken: currentHashedRefreshToken,
    });
  }

  async removeRefreshToken(userId: string) {
    await this.findById(userId);

    return this.userRepository.update(
      { id: userId },
      {
        refreshToken: null,
      },
    );
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    const user = await this.userRepository.findOne({
      select: ['id', 'refreshToken', 'role'],
      where: { id: userId },
    });

    const hash = createHash('sha256').update(refreshToken).digest('hex');
    const isRefreshTokenMatching = await bcrypt.compare(
      hash,
      user.refreshToken,
    );

    if (isRefreshTokenMatching) {
      return { id: user.id, role: user.role };
    }
  }
}

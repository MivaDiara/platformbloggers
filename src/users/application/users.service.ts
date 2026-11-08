import {UsersType} from "../types/users";
import {UserInputDTO} from "../dto/users.input-dto";
import {usersRepository} from "../repositories/users.repository";
import bcrypt from 'bcrypt';

export const usersService = {
    async create(dto: UserInputDTO): Promise<string> {
        const email = await usersRepository.isEmail(dto.email);
        const login = await usersRepository.isLogin(dto.login);
        if (email) {
            throw new Error("Email already exists");
        }
        if (login) {
            throw new Error("Login already exists");
        }
        const passwordHash = await bcrypt.hash(dto.password, 10);
        const createdUser: UsersType = {
            email: dto.email,
            login: dto.login,
            createdAt: new Date().toISOString(),
            password: passwordHash
        }
        return await usersRepository.create(createdUser)
    },
    async delete(id: string): Promise<void> {
        await usersRepository.delete(id);
        return
    }
}
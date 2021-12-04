import { Controller, ClassSerializerInterceptor, Get, Logger, Req, UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { UserDTO } from '../../service/dto/user.dto';
import { Request } from 'express';
import { HeaderUtil } from '../../client/header-util';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from '../../service/auth.service';

@Controller('api')
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiUseTags('public-user-controller')
export class PublicUserController {
    logger = new Logger('PublicUserController');

    constructor(private readonly authService: AuthService) {}

    @Get('/users')
    @ApiOperation({ title: 'Get the list of users' })
    @ApiResponse({
        status: 200,
        description: 'List all users records',
        type: UserDTO,
    })
    async getAllPublicUsers(@Req() req: Request): Promise<UserDTO[]> {
        const sortField = req.query.sort;
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, sortField);
        const [results, count] = await this.authService.getAllUsers({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }

    @Get('/authorities')
    @ApiOperation({ title: 'Get the list of user roles' })
    @ApiResponse({
        status: 200,
        description: 'List all user roles',
        type: 'string',
        isArray: true,
    })
    async getAuthorities(@Req() req: any): Promise<string[]> {
        const autoritiesDTO = await this.authService.getAllAuthorities();

        console.log(autoritiesDTO);

        const autoritiesNames = [];

        autoritiesDTO.forEach(element => autoritiesNames.push(element.name));

        console.log(autoritiesNames);

        return autoritiesNames;
    }
}

import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post as PostMethod,
    Put,
    UseGuards,
    Req,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AlmacenDTO } from '../../service/dto/almacen.dto';
import { AlmacenService } from '../../service/almacen.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/almacens')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('almacens')
export class AlmacenController {
    logger = new Logger('AlmacenController');

    constructor(private readonly almacenService: AlmacenService) {}

    @Get('/')
    @Roles(RoleType.USER, RoleType.CURADO)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: AlmacenDTO,
    })
    async getAll(@Req() req: Request): Promise<AlmacenDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.almacenService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }

    @Get('/:id')
    @Roles(RoleType.USER, RoleType.CURADO)
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: AlmacenDTO,
    })
    async getOne(@Param('id') id: number): Promise<AlmacenDTO> {
        return await this.almacenService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN, RoleType.CURADO)
    @ApiOperation({ title: 'Create almacen' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: AlmacenDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() almacenDTO: AlmacenDTO): Promise<AlmacenDTO> {
        const created = await this.almacenService.save(almacenDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Almacen', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN, RoleType.CURADO)
    @ApiOperation({ title: 'Update almacen' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: AlmacenDTO,
    })
    async put(@Req() req: Request, @Body() almacenDTO: AlmacenDTO): Promise<AlmacenDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Almacen', almacenDTO.id);
        return await this.almacenService.update(almacenDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN, RoleType.CURADO)
    @ApiOperation({ title: 'Update almacen with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: AlmacenDTO,
    })
    async putId(@Req() req: Request, @Body() almacenDTO: AlmacenDTO): Promise<AlmacenDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Almacen', almacenDTO.id);
        return await this.almacenService.update(almacenDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN, RoleType.CURADO)
    @ApiOperation({ title: 'Delete almacen' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Almacen', id);
        return await this.almacenService.deleteById(id);
    }
}

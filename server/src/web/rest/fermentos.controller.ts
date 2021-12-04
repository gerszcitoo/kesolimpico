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
import { FermentosDTO } from '../../service/dto/fermentos.dto';
import { FermentosService } from '../../service/fermentos.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/fermentos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('fermentos')
export class FermentosController {
    logger = new Logger('FermentosController');

    constructor(private readonly fermentosService: FermentosService) {}

    @Get('/')
    @Roles(RoleType.USER, RoleType.LABORATORIO, RoleType.PRODUCCION)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: FermentosDTO,
    })
    async getAll(@Req() req: Request): Promise<FermentosDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.fermentosService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }

    @Get('/:id')
    @Roles(RoleType.USER, RoleType.LABORATORIO, RoleType.PRODUCCION)
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: FermentosDTO,
    })
    async getOne(@Param('id') id: number): Promise<FermentosDTO> {
        return await this.fermentosService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN, RoleType.LABORATORIO)
    @ApiOperation({ title: 'Create fermentos' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: FermentosDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() fermentosDTO: FermentosDTO): Promise<FermentosDTO> {
        const created = await this.fermentosService.save(fermentosDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Fermentos', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN, RoleType.LABORATORIO, RoleType.PRODUCCION)
    @ApiOperation({ title: 'Update fermentos' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: FermentosDTO,
    })
    async put(@Req() req: Request, @Body() fermentosDTO: FermentosDTO): Promise<FermentosDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Fermentos', fermentosDTO.id);
        return await this.fermentosService.update(fermentosDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN, RoleType.LABORATORIO)
    @ApiOperation({ title: 'Update fermentos with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: FermentosDTO,
    })
    async putId(@Req() req: Request, @Body() fermentosDTO: FermentosDTO): Promise<FermentosDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Fermentos', fermentosDTO.id);
        return await this.fermentosService.update(fermentosDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN, RoleType.LABORATORIO)
    @ApiOperation({ title: 'Delete fermentos' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Fermentos', id);
        return await this.fermentosService.deleteById(id);
    }
}

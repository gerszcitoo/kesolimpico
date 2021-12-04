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
import { RecepcionDTO } from '../../service/dto/recepcion.dto';
import { RecepcionService } from '../../service/recepcion.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/recepcions')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('recepcions')
export class RecepcionController {
    logger = new Logger('RecepcionController');

    constructor(private readonly recepcionService: RecepcionService) {}

    @Get('/')
    @Roles(RoleType.USER, RoleType.RECEPCION, RoleType.PRODUCCION)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: RecepcionDTO,
    })
    async getAll(@Req() req: Request): Promise<RecepcionDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.recepcionService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }

    @Get('/:id')
    @Roles(RoleType.USER, RoleType.RECEPCION, RoleType.PRODUCCION)
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: RecepcionDTO,
    })
    async getOne(@Param('id') id: number): Promise<RecepcionDTO> {
        return await this.recepcionService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN, RoleType.RECEPCION)
    @ApiOperation({ title: 'Create recepcion' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: RecepcionDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() recepcionDTO: RecepcionDTO): Promise<RecepcionDTO> {
        const created = await this.recepcionService.save(recepcionDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Recepcion', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN, RoleType.RECEPCION, RoleType.PRODUCCION)
    @ApiOperation({ title: 'Update recepcion' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: RecepcionDTO,
    })
    async put(@Req() req: Request, @Body() recepcionDTO: RecepcionDTO): Promise<RecepcionDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Recepcion', recepcionDTO.id);
        return await this.recepcionService.update(recepcionDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN, RoleType.RECEPCION)
    @ApiOperation({ title: 'Update recepcion with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: RecepcionDTO,
    })
    async putId(@Req() req: Request, @Body() recepcionDTO: RecepcionDTO): Promise<RecepcionDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Recepcion', recepcionDTO.id);
        return await this.recepcionService.update(recepcionDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN, RoleType.RECEPCION)
    @ApiOperation({ title: 'Delete recepcion' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Recepcion', id);
        return await this.recepcionService.deleteById(id);
    }
}

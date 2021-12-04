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
import { SectorProduccionDTO } from '../../service/dto/sector-produccion.dto';
import { SectorProduccionService } from '../../service/sector-produccion.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/sector-produccions')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('sector-produccions')
export class SectorProduccionController {
    logger = new Logger('SectorProduccionController');

    constructor(private readonly sectorProduccionService: SectorProduccionService) {}

    @Get('/')
    @Roles(RoleType.USER, RoleType.PRODUCCION)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: SectorProduccionDTO,
    })
    async getAll(@Req() req: Request): Promise<SectorProduccionDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.sectorProduccionService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }

    @Get('/:id')
    @Roles(RoleType.USER, RoleType.PRODUCCION)
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: SectorProduccionDTO,
    })
    async getOne(@Param('id') id: number): Promise<SectorProduccionDTO> {
        return await this.sectorProduccionService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN, RoleType.PRODUCCION)
    @ApiOperation({ title: 'Create sectorProduccion' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: SectorProduccionDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() sectorProduccionDTO: SectorProduccionDTO): Promise<SectorProduccionDTO> {
        const created = await this.sectorProduccionService.save(sectorProduccionDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'SectorProduccion', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN, RoleType.PRODUCCION)
    @ApiOperation({ title: 'Update sectorProduccion' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: SectorProduccionDTO,
    })
    async put(@Req() req: Request, @Body() sectorProduccionDTO: SectorProduccionDTO): Promise<SectorProduccionDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'SectorProduccion', sectorProduccionDTO.id);
        return await this.sectorProduccionService.update(sectorProduccionDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN, RoleType.PRODUCCION)
    @ApiOperation({ title: 'Update sectorProduccion with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: SectorProduccionDTO,
    })
    async putId(@Req() req: Request, @Body() sectorProduccionDTO: SectorProduccionDTO): Promise<SectorProduccionDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'SectorProduccion', sectorProduccionDTO.id);
        return await this.sectorProduccionService.update(sectorProduccionDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN, RoleType.PRODUCCION)
    @ApiOperation({ title: 'Delete sectorProduccion' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'SectorProduccion', id);
        return await this.sectorProduccionService.deleteById(id);
    }
}

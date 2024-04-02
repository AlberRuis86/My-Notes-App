import { Controller, Get, Post, Patch, Delete, Body, Param, Query, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBadRequestResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AddTagDto } from './dto/add-tag.dto';
import { FilterByTagsDto } from './dto/filter-by-tags.dto';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Retorna todas las notas.' })
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'ID de la nota' })
  @ApiResponse({ status: 200, description: 'Retorna la nota encontrada.' })
  @ApiResponse({ status: 404, description: 'Nota no encontrada.' })
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  @Get('filtered')
  @ApiQuery({ name: 'tags', description: 'Filtrar notas por etiquetas', type: String, isArray: true })
  @ApiResponse({ status: 200, description: 'Retorna las notas filtradas.' })
  @ApiBadRequestResponse({ description: 'Petición inválida.' })
  async filterNotesByTags(@Query() filterByTagsDto: FilterByTagsDto) {
    if (!filterByTagsDto || !filterByTagsDto.tags || !Array.isArray(filterByTagsDto.tags)) {
      throw new BadRequestException('Invalid filterByTagsDto');
    }

    return this.notesService.filterNotesByTags(filterByTagsDto.tags);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Nota creada satisfactoriamente.' })
  @ApiBadRequestResponse({ description: 'Petición inválida.' })
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Post(':id/tags')
  @ApiParam({ name: 'id', description: 'ID de la nota' })
  @ApiResponse({ status: 201, description: 'Etiqueta agregada satisfactoriamente.' })
  @ApiResponse({ status: 404, description: 'Nota no encontrada.' })
  @ApiBadRequestResponse({ description: 'Petición inválida.' })
  addTagToNote(@Param('id') id: string, @Body() addTagDto: AddTagDto) {
    return this.notesService.addTagToNote(id, addTagDto);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: 'ID de la nota' })
  @ApiResponse({ status: 200, description: 'Nota actualizada satisfactoriamente.' })
  @ApiResponse({ status: 404, description: 'Nota no encontrada.' })
  @ApiBadRequestResponse({ description: 'Petición inválida.' })
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'ID de la nota' })
  @ApiResponse({ status: 200, description: 'Nota eliminada satisfactoriamente.' })
  @ApiResponse({ status: 404, description: 'Nota no encontrada.' })
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }

  @Delete(':id/tags/:tag')
  @ApiParam({ name: 'id', description: 'ID de la nota' })
  @ApiParam({ name: 'tag', description: 'Nombre de la etiqueta' })
  @ApiResponse({ status: 200, description: 'Etiqueta eliminada satisfactoriamente.' })
  @ApiResponse({ status: 404, description: 'Nota no encontrada.' })
  @ApiBadRequestResponse({ description: 'Petición inválida.' })
  removeTagFromNote(@Param('id') id: string, @Param('tag') tag: string) {
    return this.notesService.removeTagFromNote(id, tag);
  }

}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AddTagDto } from './dto/add-tag.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  async findAll(): Promise<Note[]> {
    return this.noteRepository.find();
  }

  async findOne(id: string): Promise<Note> {
    return this.noteRepository.findOne({ where: { id: Number(id) } });
  }  

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const newNote = this.noteRepository.create(createNoteDto);
    return this.noteRepository.save(newNote);
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const noteToUpdate = await this.noteRepository.findOne({ where: { id: Number(id) } });
    if (!noteToUpdate) {
      return null;
    }
    const updatedNote = Object.assign(noteToUpdate, updateNoteDto);
    return this.noteRepository.save(updatedNote);
  }  

  async remove(id: string): Promise<void> {
    await this.noteRepository.delete(id);
  }

  async addTagToNote(id: string, addTagDto: AddTagDto): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { id: Number(id) } });
    if (!note) {
      return null;
    }
    if (!note.tags.includes(addTagDto.tag)) {
      note.tags.push(addTagDto.tag);
      await this.noteRepository.save(note);
    }
    return note;
  }

  async removeTagFromNote(id: string, tag: string): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { id: Number(id) } });
    if (!note) {
      return null;
    }
    note.tags = note.tags.filter(t => t !== tag);
    return this.noteRepository.save(note);
  }  

  async filterNotesByTags(tags: string[]): Promise<Note[]> {
    const notes = await this.noteRepository.find();
    return notes.filter(note => tags.every(tag => note.tags.includes(tag)));
  }  
}


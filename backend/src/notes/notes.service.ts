import { Injectable, NotFoundException } from '@nestjs/common';
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
    const note = await this.noteRepository.findOne({ where: { id: Number(id) } });
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const newNote = this.noteRepository.create(createNoteDto);
    return this.noteRepository.save(newNote);
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const noteToUpdate = await this.findOne(id);
    
    noteToUpdate.archived = updateNoteDto.archived;
    
    return this.noteRepository.save(noteToUpdate);
  }

  async updateNote(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const noteToUpdate = await this.findOne(id);
    
    if (updateNoteDto.title !== undefined) {
      noteToUpdate.title = updateNoteDto.title;
    }
    if (updateNoteDto.content !== undefined) {
      noteToUpdate.content = updateNoteDto.content;
    }
    if (updateNoteDto.tags !== undefined) {
      noteToUpdate.tags = updateNoteDto.tags;
    }

    return this.noteRepository.save(noteToUpdate);
  }

  async remove(id: string): Promise<void> {
    const note = await this.findOne(id);
    await this.noteRepository.remove(note);
  }

  async addTagToNote(id: string, addTagDto: AddTagDto): Promise<Note> {
    const note = await this.findOne(id);
    
    addTagDto.tags.forEach(tag => {
      if (!note.tags.includes(tag)) {
        note.tags.push(tag);
      }
    });

    return this.noteRepository.save(note);
  }

  async removeTagFromNote(id: string, tag: string): Promise<Note> {
    const note = await this.findOne(id);
    
    note.tags = note.tags.filter(t => t !== tag);
    
    return this.noteRepository.save(note);
  }

  async filterNotesByTags(tags: string[]): Promise<Note[]> {
    const notes = await this.noteRepository.find();
    return notes.filter(note => tags.every(tag => note.tags.includes(tag)));
  }
}


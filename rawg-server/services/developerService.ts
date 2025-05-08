import { Developer } from "../entities/Developer";
import { EntityReadDto } from "../controllers/dto/EntityReadDto";
import { toEntityReadDto } from "../controllers/dto/entityMappers";
import { BaseDtoService } from "./baseDtoService";

export const developerService = new BaseDtoService<Developer, EntityReadDto>(
  Developer,
  toEntityReadDto
);

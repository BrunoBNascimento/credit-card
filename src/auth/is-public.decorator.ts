import { SetMetadata } from "@nestjs/common";

export const PUBLIC = 'isPublic'

export const IsPublic = () => SetMetadata(PUBLIC, true)
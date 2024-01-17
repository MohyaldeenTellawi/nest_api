import { SetMetadata } from '@nestjs/common';

export const IS_PUPLIC_KEY = 'IS_PUPLIC';

export const Puplic = () => SetMetadata(IS_PUPLIC_KEY, true);

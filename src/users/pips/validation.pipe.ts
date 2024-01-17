import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  transform(value: any) {
    console.log('mu custom validation pipe :', value);
    return value;
  }
}

//metadata: ArgumentMetadata

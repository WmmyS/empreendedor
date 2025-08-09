import { HttpException, HttpStatus } from "@nestjs/common";

export class StoreErrorExceptions extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super(message, status);
  }

  public static registry(input: ImputRegistryError): any {
    const exceptions = [
      {
        name: 'StoreAlreadyExistsException',
        status: HttpStatus.BAD_REQUEST,
        message: 'Loja já cadastrada',
      },
      {
        name: 'StoreNotFoundException',
        status: HttpStatus.NOT_FOUND,
        message: 'Loja não encontrada',
      },
      {
        name: 'NameIsRequiredException',
        status: HttpStatus.BAD_REQUEST,
        message: 'Nome da loja é obrigatório',
      },
      {
        name: 'StoreInvalidDataException',
        status: HttpStatus.BAD_REQUEST,
        message: 'Dados da loja inválidos',
      }
    ];

    const exception = exceptions.find((e) => e.name === input);
    return new StoreErrorExceptions(exception.message, exception.status);
  }

}

export type ImputRegistryError =
'StoreAlreadyExistsException' |
'StoreNotFoundException'      |
'NameIsRequiredException'     |
'StoreInvalidDataException'
;

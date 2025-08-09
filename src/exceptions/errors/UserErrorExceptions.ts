import { HttpException, HttpStatus } from "@nestjs/common";

export class UserErrorExceptions extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super(message, status);
  }

  public static registry(input: ImputRegistryError): any {
    const exceptions = [
      {
        name: 'UserAlreadyExistsException',
        status: HttpStatus.BAD_REQUEST,
        message: 'Usuário já cadastrado',
      },
      {
        name: 'UserNotFoundException',
        status: HttpStatus.NOT_FOUND,
        message: 'Usuário não encontrado',
      },
      {
        name: 'InvalidPasswordException',
        status: HttpStatus.BAD_REQUEST,
        message: 'Senha inválida',
      },
      {
        name: 'InvalidEmailException',
        status: HttpStatus.BAD_REQUEST,
        message: 'Email inválido',
      },
      {
        name: 'NameIsRequiredException',
        status: HttpStatus.BAD_REQUEST,
        message: 'Nome é obrigatório',
      },
      {
        name: 'EmailIsRequiredException',
        status: HttpStatus.BAD_REQUEST,
        message: 'Email é obrigatório',
      },
      {
        name: 'PasswordIsRequiredException',
        status: HttpStatus.BAD_REQUEST,
        message: 'Senha é obrigatória',
      }
    ];

    const exception = exceptions.find((e) => e.name === input);
    return new UserErrorExceptions(exception.message, exception.status);
  }

}

export type ImputRegistryError =
'UserAlreadyExistsException' |
'UserNotFoundException'      |
'InvalidPasswordException'   |
'InvalidEmailException'      |
'NameIsRequiredException'    |
'EmailIsRequiredException'   |
'PasswordIsRequiredException';
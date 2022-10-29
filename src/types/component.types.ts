export const Component = {
    LoggerApplication: Symbol.for('LoggerApplication'),
    LoggerInterface: Symbol.for('LoggerInterface'),
    ConfigInterface: Symbol.for('ConfigInterface'),
    DatabaseInterface: Symbol.for('DatabaseInterface'),
    UserServiceInterface: Symbol.for('UserServiceInterface'),
    FilmServiceInterface: Symbol.for('FilmServiceInterface'),
    CommentServiceInterface: Symbol.for('CommentServiceInterface'),
    GenreSerivceInterface: Symbol.for('GenreServiceInterface'),
    ExceptionFilterInterface: Symbol.for('ExceptionFilter'),
    UserModel: Symbol.for('UserModel'),
    FilmModel: Symbol.for('FilmModel'),
    CommentModel: Symbol.for('CommentModel'),
    GenreModel: Symbol.for('GenreModel'),
    FilmController: Symbol.for('FilmController'),
    UserController: Symbol.for('UserController')
} as const

export const Component = {
    LoggerApplication: Symbol.for('LoggerApplication'),
    LoggerInterface: Symbol.for('LoggerInterface'),
    ConfigInterface: Symbol.for('ConfigInterface'),
    DatabaseInterface: Symbol.for('DatabaseInterface'),
    UserServiceInterface: Symbol.for('UserServiceInterface'),
    FilmServiceInterface: Symbol.for('FilmServiceInterface'),
    CommentServiceInterface: Symbol.for('CommentServiceInterface'),
    GenreSerivceInterface: Symbol.for('GenreServiceInterface'),
    UserModel: Symbol.for('UserModel'),
    FilmModel: Symbol.for('FilmModel'),
    CommentModel: Symbol.for('CommentModel'),
    GenreModel: Symbol.for('GenreModel')
} as const
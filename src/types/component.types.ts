export const Component = {
    LoggerApplication: Symbol.for('LoggerApplication'),
    LoggerInterface: Symbol.for('LoggerInterface'),
    ConfigInterface: Symbol.for('ConfigInterface'),
    DatabaseInterface: Symbol.for('DatabaseInterface'),
    UserServiceInterface: Symbol.for('UserServiceInterface'),
    FilmServiceInterface: Symbol.for('FilmServiceInterface'),
    UserModel: Symbol.for('UserModel'),
    FilmModel: Symbol.for('FilmModel')
} as const
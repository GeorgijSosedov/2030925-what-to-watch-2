import convict from "convict"

export type ConfigSchema = {
    PORT: number;
    DB_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_PORT: number;
    DB_NAME: string;
    UPLOAD_DIRECTORY: string;
    SALT: string;
}

export const configSchema = convict<ConfigSchema>({
PORT: {
    doc: 'Порт для входящих подключений',
    format: 'port',
    env: 'PORT',
    default: 4000
},
DB_HOST: {
    doc: 'IP для сервера database',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1'
},
DB_USER: {
    doc: 'Пользователь',
    format: String,
    env: 'DB_USER',
    default: null
},
DB_PASSWORD: {
    doc: 'Пароль пользователя',
    format: String,
    env: 'DB_PASSWORD',
    default: null
},
DB_PORT: {
    doc: 'port для подключения к серверу database',
    format: 'port',
    env: 'DB_PORT',
    default: 27017
},
DB_NAME: {
    doc: 'Имя Database',
    format: String,
    env: 'DB_NAME',
    default: 'course-nodejs-restapi'
},
UPLOAD_DIRECTORY: {
    doc: 'Директория для загрузки файлов',
    format: String,
    env: 'UPLOAD_DIRECTORY',
    default: null
},
SALT: {
    doc: 'Набор чисел для хэша пароля',
    format: String,
    env: 'SALT',
    default: null
}
})
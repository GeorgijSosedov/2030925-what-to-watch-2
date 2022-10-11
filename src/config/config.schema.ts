import convict from "convict"

export type ConfigSchema = {
    PORT: number;
    DB_HOST: string;
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
SALT: {
    doc: 'Набор чисел для хэша пароля',
    format: String,
    env: 'SALT',
    default: null
}
})
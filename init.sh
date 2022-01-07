function generatePassword() {
    openssl rand -hex 16
}

MYSQL_ROOT_PASSWORD=$(generatePassword)
MYSQL_PASSWORD=$(generatePassword)
MINIO_ACCESS_KEY=$(generatePassword)
MINIO_SECRET_KEY=$(generatePassword)
MONGO_INITDB_ROOT_PASSWORD=$(generatePassword)

sed -i \
    -e "s#MYSQL_ROOT_PASSWORD=.*#MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}#g" \
    -e "s#MYSQL_PASSWORD=.*#MYSQL_PASSWORD=${MYSQL_PASSWORD}#g" \
    -e "s#MINIO_ACCESS_KEY=.*#MINIO_ACCESS_KEY=${MINIO_ACCESS_KEY}#g" \
    -e "s#MINIO_SECRET_KEY=.*#MINIO_SECRET_KEY=${MINIO_SECRET_KEY}#g" \
    -e "s#MONGO_INITDB_ROOT_PASSWORD=.*#MONGO_INITDB_ROOT_PASSWORD=${MONGO_INITDB_ROOT_PASSWORD}#g" \
    "$(dirname "$0")/.env"
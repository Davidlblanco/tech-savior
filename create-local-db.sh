#!/bin/bash

# Start or create PostgreSQL container
if ! docker ps -a --format '{{.Names}}' | grep -q '^tech-savior-psql$'; then
    docker run --name tech-savior-psql -p 5432:5432 -e POSTGRES_PASSWORD=education -d postgres
    echo "Waiting for PostgreSQL to start..."
    sleep 5
else
    echo "PostgreSQL container already exists."
    docker start tech-savior-psql
fi

# Wait until PostgreSQL is ready
until docker exec tech-savior-psql pg_isready -U postgres; do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 5
done

# Create database inside the container
docker exec -it tech-savior-psql psql -U postgres -c "CREATE DATABASE techsavior;"

# test if the DB exists:
docker exec -it tech-savior-psql psql -U postgres -c "\l"

# migrate prisma schema
npx prisma migrate dev --name init

# seed the database
npx ts-node prisma/seed.ts

# run turio
npx prisma studio

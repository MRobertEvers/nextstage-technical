# Opportunity KanBan

This is a simple opportunity KanBan board.

## Installation

Installation requires postgresql, node and npm. Alternatively, you can run the system using docker.

### Docker

With _Docker_ and _Docker-Compose_, you can start the server with `docker-compose up`.

This will start a postgres docker containter named "postgres" and the Next server container "app". This will start the Next server in dev mode.

### Native

Install dependencies using `npm install`.

Additionally, populate a `.env.local` file based on the include `.env.template`. This will provide the necessary environment variables for the server.

You can run the application natively with `npm run dev` for development. For production, use `npm run build && npm start`.

## Test

Tests can be run inside _Docker_ or, again, natively.

### Docker

With the "app" docker container, use the command `docker exec app npm run test`.

### Native

Run `npm run test`.

## Contribution

This project uses _Prettier_ as a code formatter, and _ESLint_ as a linter. Please enable the prettier plugin for your IDE.

Run `npm run lint` and ensure there are no errors prior to contributing.

# Product Registration - NestJS, TypeORM, Docker

This project is a simple product registration system developed with [NestJS](https://nestjs.com/), using [TypeORM](https://typeorm.io/) as ORM and [PostgreSQL](https://www.postgresql.org/) as the database. It is configured to run inside Docker containers.

## Technologies Used
- NestJS
- TypeORM
- PostgreSQL
- Docker

## Prerequisites
To run the project, you need to have:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

Make sure that ports `3000` (for the back-end) and `5432` (for the database) are available on your system.

## How to Run the Project with Docker

1. Clone the repository:

```bash
# Clone o repositório
$ git clone https://github.com/voibhiv/product-backend

# Entre na pasta do projeto
$ cd product-backend
```

2. Copy the .env.example

```bash
# Copy
$ cp .env.example .env
``` 

3. Run Docker Compose

```bash
# Build containers
$ docker-compose up --build -d
``` 

<h3>API Endpoints</h3>
Here are the main API endpoints available for product registration:

- [GET] /products: List all registered products.
- [GET] /shop: Get all shops.
- [POST] /products: Register a new product.
- [PUT] /products/:id: Update an existing product.

## Project Structure

```bash
📦src
 ┣ 📂config
 ┃ ┣ 📜cli.config.ts
 ┃ ┗ 📜postgres.config.service.ts
 ┣ 📂core
 ┃ ┣ 📂exceptions
 ┃ ┃ ┣ 📂product
 ┃ ┃ ┃ ┣ 📜invalid-image-format-type.exception.ts
 ┃ ┃ ┃ ┣ 📜product-cost.exception.ts
 ┃ ┃ ┃ ┣ 📜product-description.exception.ts
 ┃ ┃ ┃ ┗ 📜product-not-exist.exception.ts
 ┃ ┃ ┣ 📜http.exception.filter.ts
 ┃ ┃ ┗ 📜http.response.interceptor.ts
 ┃ ┗ 📂generics
 ┃ ┃ ┣ 📜generic-filter.ts
 ┃ ┃ ┣ 📜image.validator.ts
 ┃ ┃ ┣ 📜paginate.service.ts
 ┃ ┃ ┗ 📜sort.enum.ts
 ┣ 📂database
 ┃ ┗ 📂migrations
 ┃ ┃ ┣ 📜1727825909086-create-product-table.ts
 ┃ ┃ ┣ 📜1727884312494-create-shop-table.ts
 ┃ ┃ ┣ 📜1727890016185-create-shop-product-table-and-add-relations.ts
 ┃ ┃ ┗ 📜1727998507458-add-cascade-deletion.ts
 ┣ 📂product
 ┃ ┣ 📂adapter
 ┃ ┃ ┣ 📂in
 ┃ ┃ ┃ ┣ 📂requests
 ┃ ┃ ┃ ┃ ┣ 📜list-product.request.ts
 ┃ ┃ ┃ ┃ ┗ 📜save-product.request.ts
 ┃ ┃ ┃ ┗ 📜product.controller.ts
 ┃ ┃ ┣ 📂out
 ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┣ 📜product-list.adapter.ts
 ┃ ┃ ┃ ┣ 📜product-persistence.adapter.ts
 ┃ ┃ ┃ ┣ 📜product-remove.adapter.ts
 ┃ ┃ ┃ ┣ 📜product-update.adapter.ts
 ┃ ┃ ┃ ┣ 📜product.entity.ts
 ┃ ┃ ┃ ┗ 📜product.mapper.ts
 ┃ ┃ ┗ 📜adapter.module.ts
 ┃ ┣ 📂application
 ┃ ┃ ┣ 📂ports
 ┃ ┃ ┃ ┣ 📂in
 ┃ ┃ ┃ ┃ ┣ 📜product.use-case.ts
 ┃ ┃ ┃ ┃ ┗ 📜save-product.command.ts
 ┃ ┃ ┃ ┗ 📂out
 ┃ ┃ ┃ ┃ ┣ 📜product-list.port.ts
 ┃ ┃ ┃ ┃ ┣ 📜product-persistence.port.ts
 ┃ ┃ ┃ ┃ ┣ 📜product-remove.port.ts
 ┃ ┃ ┃ ┃ ┗ 📜product-update.port.ts
 ┃ ┃ ┣ 📂services
 ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┗ 📜product.service.ts
 ┃ ┃ ┗ 📜application.module.ts
 ┃ ┣ 📂domain
 ┃ ┃ ┗ 📜product.ts
 ┃ ┗ 📜product.module.ts
 ┣ 📂product-shop
 ┃ ┣ 📂adapter
 ┃ ┃ ┣ 📂in
 ┃ ┃ ┃ ┗ 📂requests
 ┃ ┃ ┃ ┃ ┗ 📜product-shop.request.ts
 ┃ ┃ ┗ 📂out
 ┃ ┃ ┃ ┗ 📜product-shop.entity.ts
 ┃ ┣ 📂application
 ┃ ┃ ┗ 📂ports
 ┃ ┃ ┃ ┣ 📂in
 ┃ ┃ ┃ ┃ ┗ 📜product-shop.command.ts
 ┃ ┃ ┃ ┗ 📂out
 ┃ ┣ 📂domain
 ┃ ┃ ┗ 📜product-shop.ts
 ┃ ┗ 📜product-shop.module.ts
 ┣ 📂shop
 ┃ ┣ 📂adapter
 ┃ ┃ ┣ 📂in
 ┃ ┃ ┃ ┗ 📜shop.controller.ts
 ┃ ┃ ┣ 📂out
 ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┣ 📜shop-list.adapter.ts
 ┃ ┃ ┃ ┣ 📜shop.entity.ts
 ┃ ┃ ┃ ┗ 📜shop.mapper.ts
 ┃ ┃ ┗ 📜adapter.module.ts
 ┃ ┣ 📂application
 ┃ ┃ ┣ 📂ports
 ┃ ┃ ┃ ┣ 📂in
 ┃ ┃ ┃ ┃ ┗ 📜shop.use-case.ts
 ┃ ┃ ┃ ┗ 📂out
 ┃ ┃ ┃ ┃ ┗ 📜shop-list.port.ts
 ┃ ┃ ┣ 📂services
 ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┗ 📜shop.service.ts
 ┃ ┃ ┗ 📜application.module.ts
 ┃ ┣ 📂domain
 ┃ ┃ ┗ 📜shop.ts
 ┃ ┗ 📜shop.module.ts
 ┣ 📜app.module.ts
 ┗ 📜main.ts
 ```
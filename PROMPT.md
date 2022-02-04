# Overview

In this assignment, you will be building an application with one of NextStage's core features, the KanBan board. The board is comprised of ordered stages. Each stage may contain opportunities. This repo is a starting point for you to complete the three outlined below.

This application does not work out of the box. It provides a basic scaffolding to save you time and to start you in the right direction.

# Assessment

Even if haven't had time to get to all the tasks, please be ready to show a demo and discuss what and how you implemented the features and why you made those decisions. You do not need a formal presentation, but be ready to share your screen while walking us through the demo.

Do not worry about building a production-ready application. We realize you may be unfamiliar with some of the technologies we use, so we're mostly going to be interested in your approach.

# Setup

This application, like NextStage, is built on [Next.js](https://nextjs.org/), Docker, [Prisma](https://prisma.io), and Postgres. You can start the Next.js server by running:

`docker-compose up`

When you start the application, we automatically seed some data found in _prisma/seed.ts_. As you go through this exercise you may want or need to update this script to accomodate your changes.

# Tasks

1. New features

    - Add drop and drop to the board. You should be able to drag opportunities between stages and reorder opportunities within a stage.

2. Add a backend:

    - We've started implementing a backend using Prisma. Hint: you will have to make updates to the data model in _prisma/schema.prisma_ to save an opportunity's position. You can run new migrations by running `npx prisma migrate deploy`.
    - As an example of how to use the Prisma client, we've implemented one API route using Next.js in _pages/api/pipelines.ts_. Once you start the server, you can navigate to [http://localhost:3000/api/pipelines](http://localhost:3000/api/pipelines) to see what's returned from the API. Feel free to use the backend server of your choosing.
    - Create an API with endpoints to support the core functions of the application
        - Adding a new opportunity
        - Move opportunities between stages
        - Reodering opportunities

3. Connect the frontend and backend

# Testing

Please write tests for your work. You do not need to have 100% test coverage, but we'd love to see how you approach testing your frontend and backend work.

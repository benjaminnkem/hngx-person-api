# Person API

## Overview

This is a simple API for managing 'person' resources. It provides basic CRUD (Create, Read, Update, Delete) operations for managing information about individuals.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Endpoints](#endpoints)
  - [Examples](#examples)

## Features

- Create a new person record with details such as name, age, and address.
- Retrieve a list of all persons or details of a specific person.
- Update the details of an existing person.
- Delete a person record from the database.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following:

- [Node.js](https://nodejs.org/) installed on your machine.
- A database system (MongoDB) set up and running.

## Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/benjaminnkem/hngx-person-api.git
    ```

2. Change to the project directory:

    ```bash
    cd hngx-person-api
    ```

3. Install the required dependencies:

    ```bash
    npm install or yarn install
    ```

4. Start the server:

    ```bash
    npm start or yarn start
    ```

## Usage

### Endpoints

- **GET /api/persons:** Retrieve a list of all persons.
- **GET /api/persons/:id:** Retrieve details of a specific person by their ID.
- **POST /api/persons:** Create a new person record.
- **PUT /api/persons/:id:** Update the details of a specific person.
- **DELETE /api/persons/:id:** Delete a person record.


### Examples

### Retrieving a List of All Persons

To retrieve a list of all persons, make a GET request to the following endpoint:
```bash
GET /api/person
```

### Retrieving Details of a Specific Person

To retrieve details of a specific person by their name, make a GET request to the following endpoint, replacing `:name` with the person's name:

```bash
GET /api/person/:name
```

### Creating a Person

To create a new person record, make a POST request to the following endpoint:
```bash
POST /api/person
```

Set the `Content-Type` header to `application/json`, and include the person's information (name only) in the request body in JSON format, like this:

```json
{ "name": "Benjamin Nkem" }
```

### Updating a Person Data

To update an existing person data record, make a PUT request to the following endpoint, replacing `:name` with the person's new name.
```bash
PUT /api/person/:name
```

Set the `Content-Type` header to `application/json`, and include the new information (name only) in the request body in JSON format, like this:

```json
{ "name": "Michael Jordan" }
```

### Deleting a Person

To delete a person, make a DELETE request to the following endpoint, replacing `:name` with the person's name:
```bash
DELETE /api/person/:name
```

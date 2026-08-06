# fullstack_developer_capstone

**Capstone project for the IBM Full Stack Software Developer course on Coursera.**

# About the Project
The goal of this project is to develop a car dealership website where users can search for a dealership, consult their informations, inventory (cars for sell) and user reviews.\
An authenticated user can also post a new review about a dealership.

This is a learning project that serve as the final graded exercise for the IBM Full Stack Software Developer course.\
For more informations see [IBM Full Stack Software Developer Professional Certificate](https://www.coursera.org/professional-certificates/ibm-full-stack-cloud-developer) 

# Technologies
![React](https://img.shields.io/badge/React-grey?logo=react)
![Django](https://img.shields.io/badge/Django-092E20?logo=django)
![Express](https://img.shields.io/badge/Express-black?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-00684A?logo=mongodb)
![Docker](https://img.shields.io/badge/Docker-darkgrey?logo=docker)

# Content
## Dealership website
**React application** to dynamically display and filter lists of dealerships, cars, reviews...\
Contains HTML static pages for the landing, Contacts and About Us pages where the information rarely changes.\
[Open Code](server/frontend/src/App.js)

**Django application** to service the frontend pages, handle authentification and respond to user requests.\
It will also interact with the separately deployed services through proxies.\
[Open Code](server/djangoapp/views.py)

## Dealership and review service
**Mongo database** to store the dealerships informations (name, address, reviews).\
**Express application** to define endpoints for the main Django app to fetch the data or add new reviews.\
[Open Code](server/database/app.js)

Deployed in a separate Docker container.

## Reviews sentiment analyzer
**Library from Python's Natural Language Toolkit** to analyse the sentiment associated with a user review.\
**Flask application** to define the endpoints for the main Django app to interact with the library.\
[Open Code](server/djangoapp/microservices/app.py)

Deployed in a separate Docker container.

## Dealership inventory service
**Mongo database** to store the dealerships inventory (details of the cars for sell).\
**Express application** to define endpoints for the main Django app to fetch the data.\
[Open Code](server/carsInventory/app.js)

Deployed in a separate Docker container.


### CvMaker

## Author:

### Irakli Guraspashvili

## Description

- CvMaker is a easy to use website for creating professional resumes. There are 6 main templates which can be filled as user wishes so.
users are also able to upload their previous resumes which will be formatted and put right into cleaner, much better looking templates.

## Stack:
1. Node.js
2. Express.js
3. MongoDB
4. Docker

## Architecture type - Monolithic - REST

### Structure of a project

- main file: afterlife.js

- controllers: Stores files for controller functions.
- db: Connection to a db
- middlewares: Stores files for middleware functions, error handling, async wrappers, authentication middleware, resume processing and others.
- routes: Stores files for routes.
- utils: stores files such as node mailer, and others

### A resume Processing algorithm

- In middlewares folder, there is resumeProcessing folder which is created to process and extract information from resumes, It reads pdf and word
files and formats the as nice simple object. A repo for only resume proccesing algorithm is in this repo: repoName


### Security

- All of the input data is sanitized before using it. - package: xss-filters
- Data is sanitized before making queries to a DB. - package: express-mongo-sanitize
- Users are limited on sending requests(for DOS and DDOS attacks) - package: express-rate-limit
- Every password is being encrypted before saving them in a DB. - package: bcryptjs
- Authentication and authorization on the website uses only JWT(for CRSF ttacks). - package: jsonwebtoken
- The server uses other more essential packages and practises for security such as cors, helpet, hpp and etc.


### Error handling
- The server uses custom error handling classes for handling different types of errors, such as: Bad Request, Not Found and etc.


### Subscription plan and payment
- Users are able to buy subscription which is possible by Bank Of Georgia payment API.


### Cloud
- The project uses docker in order to work seamlesly on any os.
- The Digitalocean Spaces (can be considered as AWS S3 bucket) is used for storing users' photos.
- Website also uses Google Oauth2.0 protocol which helps users sign in easily using their Google accounts(GCP).
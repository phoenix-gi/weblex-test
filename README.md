# weblex-test
My solution of test task for WebleX company

### Steps to run

* 1. Install npm modules
* 2. Run webpack to build sources
* 3. Initialize MySQL database
* 4. Run server

### 1. How to install npm modules

* Just run install node modules command:

```sh
$ npm install
```

### 2. How to build

* Just run webpack:

```sh
$ npm run webpack
```

### 3. How to initialize MySQL database

* First, set MySQL login and password in file src/php/settings.php

* Then rebuild project (run webpack)

* Then run via php file src/php/init.php

```sh
$ php build/init.php
```

Note: don't use root mysql user, create another user with some password

Warning: create your user properly and everything will work

### 4. How to run server

* Just run build/server.php and open http://localhost:8080 in your browser:

```sh
$ php -S localhost:8080 build/server.php
```

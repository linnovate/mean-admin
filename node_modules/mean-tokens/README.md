# Mean Tokens


Mean Tokens is a small addon package for mean.io that enables inline editing of all values which are enabled as "mean-token"

The package makes use of the role system within mean to control who is able to edit tokens. Currently only "admin" has the required permissions to edit tokens.

FULL Documentation to be included in version 0.3.2 of the http://mean.io project.


See http://mean.io for more indepth information about mean.


## Basic Usage

  Install Mean CLI:

    $ sudo npm install -g meanio

  Create a new mean app:

    $ mean init <NameOfYourApp>
    
  Install Dependencies:

    $ cd <NameOfYourApp> && npm install
    
  Install mean-tokens:

    $ mean install mean-tokens

  Run your app:

    $ grunt
    
  Once you have a user assign the user the admin role:
  
    $ mean userAddRole <email> <role>
    
  

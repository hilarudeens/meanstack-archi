# meanstack-archi
Model repository for meanstack architecture along with dynamic pdf generation. You may use as scaffolded application and start your development on top this.

Software Requirements
---------------------
1. NodeJs & NPM -- https://nodejs.org/en/download/
2. Bower -- (https://bower.io/) After installing Node and NPM simple type 
   command. $npm install -g bower
3. MongoDB -- (https://www.mongodb.com/download-center#community)
4. wkhtmltopdf -- (https://wkhtmltopdf.org/downloads.html#stable) To convert web
   to PDF document.

How to dump database
--------------------
To dump data run following command
mongoimport --db pdfdownload_db --collection catalogs --jsonArray <path-to-seed-data-json
For example:
./bin/mongoimport --db pdfdownload_db --jsonArray --collection catalogs< ~/NodejsProjects/pdfdownload/seed_data/newjson.json

How to run
----------
1. Inside server_api directory, run following command.
   $ npm install
2. Inside server-web directory, run following command
   $ bower install
3. Inside application/app-root directory, run server start command as follows
   node ./server_api/bin/www.
4. Load following URL http://localhost:3000 in browser.

Note: Please make sure some command require `sudo` permission.
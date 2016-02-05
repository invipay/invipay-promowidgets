inviPay promotion widgets
=========================

You need Node.js (http://nodejs.org) to compile this project into usable JavaScripts. Also, after installing Node.js, install Grunt (http://gruntjs.com) with this command:

npm install -g grunt-cli

---------------------------------------------------------------------------------------------------------------

When your Node.js + Grunt environment is ready, go to source directory and:

1. Install all dependencies needed to compile this project, you only need to do this once as those are dependencies for building system NOT the scripts. Run this command to do this:

npm install

---------------------------------------------------------------------------------------------------------------

2. When you need to compile DEVELOPMENT version of project just run this command:

grunt

It will compile and minify output JavaScript file "InviPay.Widgets.min.js" in root directory of PromoWidgets.

---------------------------------------------------------------------------------------------------------------

3. When you need to compile DISTRIBUTION version of project run:

grunt dist

Difference between development and distribution versions is that the distribution has hardcoded absolute URI's to files (@BASE_URI placeholder in any file) and development version has relative to root folder URI's.

---------------------------------------------------------------------------------------------------------------
@echo off
cd %~dp0
echo The Bot is currently starting...
if(./node_modules == null || ./node_modules == undefined){
	echo Installing NPM Modules
	npm install
}
node bot.js

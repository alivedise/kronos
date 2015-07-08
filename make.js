require('shelljs/global');
require('shelljs/make');

cd('..');
cd('gaia');
ls('apps').forEach(function(appdir) {
	console.log('===Splitting ' + appdir + '====');
	exec('git subtree split -P apps/' + appdir + ' -b ' + appdir);
	cd('..');
	mkdir(appdir);
	cd(appdir);
	exec('git init');
	exec('git pull ../gaia ' + appdir);
	exec('git remote add origin git@github.com:alivedise/' + appdir + '.git');
	exec('git push -u origin master');
	cd('..');
	cd('gaia');
	exec('git rm -r apps/' + appdir);
	exec('git commit -a -m "Isolate' + appdir + '"');
	console.log('===' + appdir + ' splitted ====');
});

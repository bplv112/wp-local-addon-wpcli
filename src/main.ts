// https://getflywheel.github.io/local-addon-api/modules/_local_main_.html
import * as LocalMain from '@getflywheel/local/main';
import * as Local from '@getflywheel/local';
import fs from 'fs-extra';
import path from 'path';

export default async function (context) {
	const { electron } = context;
	const { ipcMain } = electron;


	// the save function.
	ipcMain.on('enable-globalcli', async (event, siteData) => {

		const site       = LocalMain.SiteData.getSite(siteData.id);
		const socketPath = path.join( site.paths.runData, 'mysql', 'mysqld.sock' );

		const phpConf =  `<?php
			define('DB_HOST', 'localhost:${socketPath}');
			error_reporting(E_ERROR);
			define( 'WP_DEBUG', false );
			`;

		const buildConf = `path: app/public\nrequire:\n  - wp-cli.local.php`;


		await fs.writeFile(path.join(site.longPath, 'wp-cli.local.php'), phpConf);
		await fs.writeFile(path.join(site.longPath, 'wp-cli.local.yml'), buildConf);

	});
}

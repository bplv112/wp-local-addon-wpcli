import Cli from './Cli';

export default function (context) {
	const { React, hooks } = context;
	hooks.addContent('SiteInfoOverview_TableList', (site) =>  <Cli key="globalize-cli" site={site} />);
}

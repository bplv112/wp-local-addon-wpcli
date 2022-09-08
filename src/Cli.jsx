import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextButton } from '@getflywheel/local-components';
import { ipcRenderer } from 'electron';
import { homedir } from 'os';
import fs from 'fs-extra';
import path from 'path';

export default class Cli extends Component {

	// Proptypes
	static propTypes = {
		enable: PropTypes.bool,
	};

	// constructors
	constructor (props) {
		super(props);
		this.state = {
			enabled: false,
		};
		this.enableGlobalCli = this.enableGlobalCli.bind(this);
		this.checkIfEnabled  = this.checkIfEnabled.bind(this);
		this.checkIfEnabled();
	}

	// initial check.
	componentDidMount () {
		this.checkIfEnabled();
	}

	// check on site switch.
	componentDidUpdate (prevProps) {
		// Typical usage (don't forget to compare props):
		if (this.props.site.id !== prevProps.site.id) {
			this.checkIfEnabled();
		}
	}

	// Enable global cli.
	enableGlobalCli () {
		this.setState({
			enabled: true,
		});

		ipcRenderer.send(
			'enable-globalcli',
			this.props.site,
		);


	}

	// Check if global cli files are there.
	checkIfEnabled () {

		const homeDir  = homedir();

		// TODO - fetch this from local `longPath`.
		const homePath = this.props.site.path.replace("~", homeDir);

		if ( fs.existsSync(path.join(homePath, 'wp-cli.local.yml')) ) {
			this.setState({
				enabled: true,
			});
		} else {
			this.setState({
				enabled: false,
			});
		}
	}

	// render
	render () {
		return (
			<li ClassName="TableListRow">

				<strong>Global Cli</strong>
				<div>

					<TextButton
						size="tiny"
						style={{ padding: '0' }}
						onClick={this.enableGlobalCli}
						disabled={this.state.enabled}
					>
						{this.state.enabled ? 'Enabled' : 'Enable'}
					</TextButton>
				</div>
			</li>
		);
	}

}


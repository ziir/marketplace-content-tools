import React from 'react';
import {connect} from 'react-redux';
import {ReverseLink} from 'react-router-reverse';
import {bindActionCreators} from 'redux';

import {fetch} from '../actions/dashboard';
import {AddonListing} from '../components/addon';
import AddonSubnav from '../components/addonSubnav';
import {addonListSelector} from '../selectors/addon';
import {Page} from '../../site/components/page';


export class AddonDashboard extends React.Component {
  static PropTypes = {
    addons: React.PropTypes.array,
    fetch: React.PropTypes.func,
  };

  static defaultProps = {
    addons: [],
    fetch: () => {},
  };

  constructor(props) {
    super(props);
    this.props.fetch();
  }

  renderEmpty() {
    const mdnLink =
      'https://developer.mozilla.org/docs/Mozilla/Firefox_OS/Add-ons';
    return (
      <Page title="My Firefox OS Add-ons" subnav={<AddonSubnav/>}
            className="addon-dashboard addon-dashboard--empty">
          <p>You have not submitted any add-ons yet.</p>
          <a href={mdnLink} className="button" target="_blank">
            Get started now!
          </a>
          <ReverseLink className="button" to="addon-submit">
            Submit an Add-on
          </ReverseLink>
      </Page>
    );
  }

  renderFull() {
    return (
      <Page title="My Firefox OS Add-ons" subnav={<AddonSubnav/>}
            className="addon-dashboard">
        <AddonListing addons={this.props.addons}
                      linkTo="addon-dashboard-detail"/>
      </Page>
    );
  }

  render() {
    return this.props.addons.length ? this.renderFull() : this.renderEmpty();
  }
};


export default connect(
  state => ({
    addons: addonListSelector(state.addonDashboard.addons, true)
  }),
  dispatch => bindActionCreators({
    fetch
  }, dispatch)
)(AddonDashboard);

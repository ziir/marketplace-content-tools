import React from 'react';
import {connect} from 'react-redux';
import {ReverseLink} from 'react-router-reverse';
import {bindActionCreators} from 'redux';

import {fetch} from '../actions/review';
import {AddonListing} from '../components/addon';
import AddonSubnav from '../components/addonSubnav';
import {addonListSelector} from '../selectors/addon';
import {Page} from '../../site/components/page';


export class AddonReview extends React.Component {
  static propTypes = {
    addons: React.PropTypes.array.isRequired,
    fetch: React.PropTypes.func,
    publish: React.PropTypes.func,
    reject: React.PropTypes.func,
  };

  static defaultProps = {
    addons: [],
    fetch: () => {}
  };

  constructor(props) {
    super(props);
    this.props.fetch();
  }

  render() {
    return (
      <Page title="Reviewing Firefox OS Add-ons" subnav={<AddonSubnav/>}>
        <AddonListing addons={this.props.addons}
                      showWaitingTime={true}
                      linkTo="addon-review-detail"/>
      </Page>
    );
  }
};


export default connect(
  state => ({
    addons: addonListSelector(state.addonReview.addons)
  }),
  dispatch => bindActionCreators({
    fetch
  }, dispatch)
)(AddonReview);

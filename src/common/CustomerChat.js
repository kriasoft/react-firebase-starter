/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import { fb } from '../utils';
import { ConfigContext } from '../hooks';

// https://developers.facebook.com/docs/messenger-platform/discovery/customer-chat-plugin
class CustomerChat extends React.PureComponent {
  componentDidMount() {
    this.timeout = setTimeout(() => {
      fb(FB => this.timeout && FB.XFBML.parse());
    }, 3000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    delete this.timeout;
  }

  render() {
    return (
      <ConfigContext.Consumer>
        {config => (
          <div
            className="fb-customerchat"
            attribution="setup_tool"
            page_id={config.facebook.pageId}
            // theme_color="..."
            // logged_in_greeting="..."
            // logged_out_greeting="..."
            // greeting_dialog_display="..."
            // greeting_dialog_delay="..."
            // minimized="false"
            // ref="..."
          />
        )}
      </ConfigContext.Consumer>
    );
  }
}

export default CustomerChat;

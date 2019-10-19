/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import { createFragmentContainer, commitMutation, graphql } from 'react-relay';

/**
 * Checks if user's profile settings (time zone etc.) are up-to-date,
 * and updates these fields in the background when they become outdated.
 */
class AutoUpdater extends React.Component {
  componentDidMount() {
    this.updateUser();
  }

  shouldComponentUpdate({ me: next }) {
    const { me } = this.props;
    return !(
      (me && me.id) === (next && next.id) &&
      (me && me.timeZone) === (next && next.timeZone)
    );
  }

  componentDidUpdate() {
    this.updateUser();
  }

  updateUser() {
    const { me, relay } = this.props;
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

    if (me && me.timeZone !== timeZone) {
      commitMutation(relay.environment, {
        mutation: graphql`
          mutation AutoUpdaterMutation($input: UpdateUserInput!) {
            updateUser(input: $input) {
              user {
                id
                timeZone
              }
            }
          }
        `,
        variables: {
          input: { id: me.id, timeZone },
        },
      });
    }
  }

  render() {
    return null;
  }
}

export default createFragmentContainer(AutoUpdater, {
  me: graphql`
    fragment AutoUpdater_me on User {
      id
      timeZone
    }
  `,
});

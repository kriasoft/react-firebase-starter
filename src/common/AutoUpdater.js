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

  shouldComponentUpdate({ user: nextUser }) {
    const { user } = this.props;
    return !(
      (user && user.id) === (nextUser && nextUser.id) &&
      (user && user.timeZone) === (nextUser && nextUser.timeZone)
    );
  }

  componentDidUpdate() {
    this.updateUser();
  }

  updateUser() {
    const { user, relay } = this.props;
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

    if (user && user.timeZone !== timeZone) {
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
          input: { id: user.id, timeZone },
        },
      });
    }
  }

  render() {
    return null;
  }
}

export default createFragmentContainer(AutoUpdater, {
  user: graphql`
    fragment AutoUpdater_user on User {
      id
      timeZone
    }
  `,
});

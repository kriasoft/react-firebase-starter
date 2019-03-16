/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { useConfig } from '../hooks';

const styles = theme => ({
  root: {
    ...theme.mixins.content,
  },
});

function Privacy({ classes: s }) {
  const { app } = useConfig();
  return (
    <div className={s.root}>
      <Typography variant="h3" gutterBottom>
        Privacy Policy
      </Typography>
      <Typography paragraph>
        Your privacy is important to us. It is Company&#39;s policy to respect
        your privacy regarading any information we may collect from you across
        our website, <a href={`${app.origin}/`}>{app.origin}</a>, and other
        sites we own and operate.
      </Typography>
      <Typography paragraph>
        We only ask for personal information when we truly need it to provide a
        service to you. We collect it by fair and lawful means, with your
        knowledge and consent. We also let you know why we’re collecting it and
        how it will be used.
      </Typography>
      <Typography paragraph>
        We only retain collected information for as long as necessary to provide
        you with your requested service. What data we store, we’ll protect
        within commercially acceptable means to prevent loss and theft, as well
        as unauthorised access, disclosure, copying, use or modification.
      </Typography>
      <Typography paragraph>
        We don’t share any personally identifying information publicly or with
        third-parties, except when required to by law.
      </Typography>
      <Typography paragraph>
        Our website may link to external sites that are not operated by us.
        Please be aware that we have no control over the content and practices
        of these sites, and cannot accept responsibility or liability for their
        respective privacy policies.
      </Typography>
      <Typography paragraph>
        You are free to refuse our request for your personal information, with
        the understanding that we may be unable to provide you with some of your
        desired services.
      </Typography>
      <Typography paragraph>
        Your continued use of our website will be regarded as acceptance of our
        practices around privacy and personal information. If you have any
        questions about how we handle user data and personal information, feel
        free to contact us.
      </Typography>
      <Typography paragraph>
        This policy is effective as of January 1st, 2019.
      </Typography>
    </div>
  );
}

export default withStyles(styles)(Privacy);

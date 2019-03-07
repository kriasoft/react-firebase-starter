/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Link from './Link';
import { useHistory } from '../hooks';

const color = '#607d8b';

const styles = theme => ({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    '@media only screen and (max-width: 280px)': {
      width: '95%',
    },
  },
  main: {
    paddingBottom: 80,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    '@media screen and (max-width: 1024px)': {
      padding: `0 ${theme.spacing.unit}`,
    },
  },
  errorCode: {
    margin: 0,
    fontSize: '15em',
    fontWeight: 300,
    lineHeight: 1,
    color,
    letterSpacing: '0.02em',
    '@media screen and (max-width: 1024px)': {
      fontSize: '10em',
    },
  },
  title: {
    paddingBottom: '0.5em',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontSize: '2em',
    fontWeight: 400,
    lineHeight: '1em',
    color,
    letterSpacing: '0.02em',
    '@media only screen and (max-width: 280px)': {
      margin: '0 0 0.3em',
      fontSize: '1.5em',
    },
    '@media screen and (max-width: 1024px)': {
      fontSize: '1.5em',
    },
  },
  text: {
    color: `color(${color} alpha(50%))`,
    '@media only screen and (max-width: 280px)': {
      width: '95%',
    },
  },
  link: {
    color: theme.palette.primary.main,
  },
});

type Props = {
  error: ?Error,
};

function ErrorPage({ classes: s, ...props }: Props) {
  const history = useHistory();
  React.useEffect(() => {
    document.title =
      props.error && props.error.status === 404 ? 'Page Not Found' : 'Error';
  });

  function goBack(event: MouseEvent) {
    event.preventDefault();
    props.onClose();
    history.goBack();
  }

  if (props.error) {
    console.error(props.error); // eslint-disable-line no-console
  }

  const [code, title] =
    props.error && props.error.status === 404
      ? ['404', 'Page not found']
      : ['Error', 'Oops, something went wrong'];

  return (
    <div className={s.container}>
      <main className={s.main}>
        <Typography variant="h1" className={s.errorCode}>
          {code}
        </Typography>
        <Typography className={s.title} paragraph>
          {title}
        </Typography>
        {code === '404' && (
          <Typography className={s.text} variant="body1">
            The page you&apos;re looking for does not exist or an another error
            occurred.
            <br />
          </Typography>
        )}
        <Typography className={s.text} variant="body1">
          <a className={s.link} href="/" onClick={goBack}>
            Go back
          </a>
          , or head over to the&nbsp;
          <Link className={s.link} href="/" onClick={props.onClose}>
            home page
          </Link>{' '}
          to choose a new direction.
        </Typography>
      </main>
    </div>
  );
}

export default withStyles(styles)(ErrorPage);

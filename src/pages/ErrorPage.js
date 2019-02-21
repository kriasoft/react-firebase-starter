/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Link from '../common/Link';
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
    paddingBottom: 0,
    fontSize: '1.125em',
    lineHeight: '1.5em',
    color: `color(${color} alpha(50%))`,
    '@media only screen and (max-width: 280px)': {
      width: '95%',
    },
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
        <h1 className={s.errorCode}>{code}</h1>
        <p className={s.title}>{title}</p>
        {code === '404' && (
          <p className={s.text}>
            The page you&apos;re looking for does not exist or an another error
            occurred.
          </p>
        )}
        <p className={s.text}>
          <a href="/" onClick={goBack}>
            Go back
          </a>
          , or head over to the&nbsp;
          <Link href="/">home page</Link> to choose a new direction.
        </p>
      </main>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(ErrorPage);

/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';

import history from '../history';
import Link from '../Link';
import s from './ErrorPage.css';

type Props = {
  error: ?Error,
};

class ErrorPage extends React.Component<any, Props, any> {
  componentDidMount() {
    document.title =
      this.props.error && this.props.error.status === 404
        ? 'Page Not Found'
        : 'Error';
  }

  goBack = (event: MouseEvent) => {
    event.preventDefault();
    history.goBack();
  };

  render() {
    if (this.props.error) {
      console.error(this.props.error); // eslint-disable-line no-console
    }

    const [code, title] =
      this.props.error && this.props.error.status === 404
        ? ['404', 'Page not found']
        : ['Error', 'Oups, something went wrong'];

    return (
      <div className={s.container}>
        <main className={s.content}>
          <h1 className={s.code}>
            {code}
          </h1>
          <p className={s.title}>
            {title}
          </p>
          {code === '404' &&
            <p className={s.text}>
              The page you&apos;re looking for does not exist or an another
              error occurred.
            </p>}
          <p className={s.text}>
            <a href="/" onClick={this.goBack}>
              Go back
            </a>
            , or head over to the&nbsp;
            <Link href="/">home page</Link>
            to choose a new direction.
          </p>
        </main>
      </div>
    );
  }
}

export default ErrorPage;

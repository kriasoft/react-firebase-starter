/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';
import { graphql, createFragmentContainer } from 'react-relay';
import { compose } from 'recompose';

import withAuth from '../common/withAuth';
import CreateStoryMutation from './mutations/CreateStory';
import { useHistory } from '../hooks';

const styles = {
  control: {
    marginTop: '1em',
  },
};

function Submit({ classes: s, data: { me }, relay, ...props }) {
  const history = useHistory();
  const [error, setError] = React.useState({});
  const [data, setData] = React.useState({
    title: '',
    text: '',
  });

  function handleChange({ target }) {
    console.log(target.id, target.value);
    setData({ ...data, [target.id]: target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError({});
    CreateStoryMutation.commit(relay.environment, data)
      .then(() => history.push('/news'))
      .catch(error => setError(error.state));
  }

  function hasError(key) {
    return Boolean(error[key] && error[key].length);
  }

  function errorMessage(key) {
    const message = error[key] && error[key][0];
    return message ? (
      <FormHelperText id={`${key}-text`}>{message}</FormHelperText>
    ) : null;
  }

  function logIn(event) {
    event.preventDefault();
    props.logIn();
  }

  return (
    <>
      <Typography>Do you have something cool to share?</Typography>
      <form onSubmit={handleSubmit}>
        <FormControl
          className={s.control}
          fullWidth
          error={hasError('title')}
          aria-describedby="title-text"
        >
          <InputLabel htmlFor="title">Title</InputLabel>
          <Input
            id="title"
            value={data.title}
            onChange={handleChange}
            margin="dense"
            required
          />
          {errorMessage('title')}
        </FormControl>
        <FormControl
          className={s.control}
          fullWidth
          error={hasError('text')}
          aria-describedby="text-text"
        >
          <InputLabel htmlFor="text">Text or URL</InputLabel>
          <Input
            id="text"
            label="Text or URL"
            value={data.text}
            onChange={handleChange}
            margin="dense"
            multiline
            required
          />
          {errorMessage('text')}
        </FormControl>
        <FormControl className={s.control}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!me}
          >
            Publish
          </Button>
          {!me && (
            <FormHelperText>
              Before posting a story you need to{' '}
              <a href={history.location.pathname} onClick={logIn}>
                sign in
              </a>
              .
            </FormHelperText>
          )}
        </FormControl>
        <br />
        <br />
      </form>
    </>
  );
}

export default compose(
  withStyles(styles),
  withAuth(),
)(
  createFragmentContainer(
    Submit,
    graphql`
      fragment Submit on Query {
        me {
          id
        }
      }
    `,
  ),
);

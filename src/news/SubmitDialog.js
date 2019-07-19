/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/styles';
import { createFragmentContainer, graphql } from 'react-relay';

import withAuth from '../common/withAuth';
import CreateStoryMutation from './mutations/CreateStory';
import { useHistory } from '../hooks';

const defaultState = {
  title: '',
  text: '',
};

const useStyles = makeStyles({
  control: {
    marginTop: '1em',
  },
});

function SubmitDialog(props) {
  const {
    data: { me },
    relay,
  } = props;

  const history = useHistory();
  const [error, setError] = React.useState({});
  const [data, setData] = React.useState(defaultState);
  const s = useStyles();

  function handleChange({ target }) {
    setData({ ...data, [target.id]: target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError({});
    CreateStoryMutation.commit(relay.environment, data)
      .then(() => {
        props.onClose();
        history.push('/news');
      })
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
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Submit a New Story</DialogTitle>
      <DialogContent>
        <Typography>Do you have something cool to share?</Typography>
        <form id="story-form" onSubmit={handleSubmit}>
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
        </form>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={props.onClose}>
          Cancel
        </Button>
        <Button color="primary" type="submit" form="story-form" disabled={!me}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withAuth()(
  createFragmentContainer(SubmitDialog, {
    data: graphql`
      fragment SubmitDialog_data on Query {
        me {
          id
        }
      }
    `,
  }),
);

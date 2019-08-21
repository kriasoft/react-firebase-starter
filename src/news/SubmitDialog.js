/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import { createFragmentContainer, graphql } from 'react-relay';

import TextField from '../common/TextField';
import UpsertStoryMutation from '../mutations/UpsertStory';
import { useHistory, useAuth } from '../hooks';

const initialState = {
  title: '',
  text: '',
  loading: false,
  errors: null,
};

function SubmitDialog(props) {
  const { me, relay } = props;
  const [state, setState] = React.useState({ ...initialState });
  const history = useHistory();
  const auth = useAuth();

  function handleSubmit(event) {
    event.preventDefault();
    setState(x => ({ ...x, loading: true, errors: null }));
    UpsertStoryMutation.commit(
      relay.environment,
      {
        title: state.title || '',
        text: state.text || '',
      },
      (errors, story) => {
        if (errors) {
          setState(x => ({ ...x, loading: false, errors }));
        } else {
          props.onClose();
          history.push(`/news/${story.slug}`);
        }
      },
    );
  }

  function signIn(event) {
    event.preventDefault();
    auth.signIn();
  }

  return (
    <Dialog open={props.open} onClose={props.onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Submit a New Story</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you have something cool to share?
        </DialogContentText>
        <form id="story-form" onSubmit={handleSubmit}>
          <TextField
            name="title"
            label="Title"
            state={[state, setState]}
            maxLength={80}
            fullWidth
          />
          <TextField
            name="text"
            label="Text or URL"
            state={[state, setState]}
            fullWidth
            multiline
          />
          {!me && (
            <FormHelperText>
              Before posting a story you need to{' '}
              <a href={history.location.pathname} onClick={signIn}>
                sign in
              </a>
              .
            </FormHelperText>
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button type="submit" form="story-form" disabled={!me}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default createFragmentContainer(SubmitDialog, {
  me: graphql`
    fragment SubmitDialog_me on User {
      id
    }
  `,
});

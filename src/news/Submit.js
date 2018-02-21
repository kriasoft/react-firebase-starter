/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import idx from 'idx';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RelayPropTypes from 'react-relay/lib/RelayPropTypes';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { graphql, createFragmentContainer } from 'react-relay';

import auth from '../auth';
import CreateStoryMutation from './CreateStoryMutation';

const StyledFormControl = styled(FormControl)`
  && {
    margin-top: 1em;
  }
`;

class Submit extends React.Component<{}> {
  static contextTypes = {
    history: PropTypes.object.isRequired,
    relay: RelayPropTypes.Relay,
  };

  state = {
    title: '',
    text: '',
    error: null,
  };

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  handleSubmit = event => {
    const { history, relay: { environment } } = this.context;
    event.preventDefault();

    if (this.state.error) {
      this.setState({ error: null });
    }

    CreateStoryMutation.commit(environment, {
      title: this.state.title,
      text: this.state.text,
    })
      .then(() => {
        history.push('/news');
      })
      .catch(error => this.setState({ error }));
  };

  errorMessage = key => {
    const message = idx(this.state.error, x => x.state[key][0]);
    return message ? (
      <FormHelperText id={`${key}-text`}>{message}</FormHelperText>
    ) : null;
  };

  signIn = event => {
    event.preventDefault();
    auth.showLoginDialog();
  };

  render() {
    const { history: { location } } = this.context;
    const { data: { me } } = this.props;
    return (
      <>
        <Typography variant="body1">
          Do you have something cool to share?
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <StyledFormControl
            fullWidth
            error={idx(this.state, x => x.error.state['title'])}
            aria-describedby="title-text"
          >
            <InputLabel htmlFor="title">Title</InputLabel>
            <Input
              id="title"
              value={this.state.title}
              onChange={this.handleChange}
              margin="normal"
              required
            />
            {this.errorMessage('title')}
          </StyledFormControl>
          <StyledFormControl
            fullWidth
            error={idx(this.state, x => x.error.state['text'])}
            aria-describedby="text-text"
          >
            <InputLabel htmlFor="text">Text or URL</InputLabel>
            <Input
              id="text"
              label="Text or URL"
              value={this.state.text}
              onChange={this.handleChange}
              margin="normal"
              multiline
              required
            />
            {this.errorMessage('text')}
          </StyledFormControl>
          <StyledFormControl>
            <Button
              variant="raised"
              color="primary"
              type="submit"
              disabled={!me}
            >
              Publish
            </Button>
            {!me && (
              <FormHelperText>
                Before posting a story you need to{' '}
                <a href={location.pathname} onClick={this.signIn}>
                  sign in
                </a>.
              </FormHelperText>
            )}
          </StyledFormControl>
          <br />
          <br />
        </form>
      </>
    );
  }
}

export default createFragmentContainer(
  Submit,
  graphql`
    fragment Submit on Query {
      me {
        id
      }
    }
  `,
);

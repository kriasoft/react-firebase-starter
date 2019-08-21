/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import { commitMutation, graphql } from 'react-relay';

function commit(environment, storyId) {
  return commitMutation(environment, {
    mutation: graphql`
      mutation LikeStoryMutation($input: LikeStoryInput!) {
        likeStory(input: $input) {
          story {
            id
            pointsCount
            pointGiven
          }
        }
      }
    `,

    variables: { input: { id: storyId } },

    optimisticUpdater(store) {
      const story = store.get(storyId);

      const pointsCount = story.getValue('pointsCount');
      const pointGiven = story.getValue('pointGiven');

      story.setValue(pointsCount + (pointGiven ? -1 : 1), 'pointsCount');
      story.setValue(!pointGiven, 'pointGiven');
    },
  });
}

export default { commit };

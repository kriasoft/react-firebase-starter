# GraphQL Query Fields

Please prefer using the general purpose `node(id)` and `nodes(ids)` query fields
whenever possible. For example, the client app must be able to retrieve most data
entities by their IDs:

```graphql
query {
  story: node(id: "xxx") {
    ... on Story {
      id
      text
    }
  }

  stories: nodes(ids: ["xxx", "xxx"]) {
    ... on Story {
      id
      text
    }
  }
}
```

Only when these two methods are not suffice you would need to declare a custom
query field. For example:

```js
import { GraphQLNonNull, GraphQLString } from 'graphql';

import db from '../db';
import { StoryType } from '../types';

export default {
  type: StoryType,

  args: {
    slug: { type: new GraphQLNonNull(GraphQLString) },
  },

  async resolve(root, { slug }, ctx) {
    let story = await db
      .table('stories')
      .where({ slug })
      .first();

    return story;
  },
};
```

Avoid creating more than one/two fields per GraphQL type. For example:

```graphql
# BAD
query {
  allStories {
    ...Story
  }
  likedStories {
    ...Story
  }
  storiesByAuthorId(id: "xxx") {
    ...Story
  }
}

# BETTER
query {
  allStories: stories {
    ...Story
  }
  likedStories: stories(liked: true) {
    ...Story
  }
  storiesByAuthor: stories(author: "username") {
    ...Story
  }
}
```

Implement Relay interface for those fields that need to support pagination.

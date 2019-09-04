# GraphQL Types

- Use Data Loader pattern for the fields like `author` etc.
- Implement the `Node` interface for those entity types that needs to be
  retrieved via the top-level `node(id)`, `nodes(ids)` GraphQL query fields.
- Use helper functions for common fields such as dates etc.

```js
import _ from 'lodash';
import { globalIdField } from 'graphql-relay';
import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

import { UserType } from './user';
import { nodeInterface } from '../node';
import { dateField } from '../utils';

export const StoryType = new GraphQLObjectType({
  name: 'Story',
  interfaces: [nodeInterface],

  fields: {
    id: globalIdField(),

    author: {
      type: new GraphQLNonNull(UserType),
      resolve(self, args, ctx) {
        return ctx.userById.load(self.author_id);
      },
    },

    slug: {
      type: new GraphQLNonNull(GraphQLString),
    },

    text: {
      type: new GraphQLNonNull(GraphQLString),
    },

    createdAt: dateField(self => self.created_at),
    updatedAt: dateField(self => self.updated_at),
  },
});
```

Note that the timestamp fields in the example above are designed to return dates
in the current user's timezone. Also, it is possible to request pre-formatted
dates (using [`moment.js`](https://momentjs.com/)). For example:

```graphql
query {
  story(slug: "example") {
    createdAtISO: createdAt
    createdAtFmt: createdAt(format: "MMM Do YYYY, h:mm:ss a")
  }
}

# => {
#   data: {
#     story: {
#       createdAtISO: "2019-09-04T08:07:02Z",
#       createdAtFmt: "September 4th 2019, 11:07:02 am"
#     }
#   }
# }
```

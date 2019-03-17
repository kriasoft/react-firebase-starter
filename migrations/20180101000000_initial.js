/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* prettier-ignore */

exports.up = async db => {
  await db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await db.raw('CREATE EXTENSION IF NOT EXISTS "hstore"');

  await db.schema.createTable('users', table => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v4()')).primary();
    table.string('username', 50).unique();
    table.string('email', 100);
    table.boolean('email_verified').notNullable().defaultTo(false);
    table.string('display_name', 100);
    table.string('photo_url', 250);
    table.string('time_zone', 50);
    table.boolean('is_admin').notNullable().defaultTo(false);
    table.timestamps(false, true);
    table.timestamp('last_login_at').notNullable().defaultTo(db.fn.now());
  });

  await db.schema.createTable('user_tokens', table => {
    table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    table.uuid('token_id').notNullable().primary();
    table.timestamp('created_at').notNullable().defaultTo(db.fn.now());
  });

  await db.schema.createTable('user_identities', table => {
    table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    table.string('provider', 16).notNullable();
    table.string('provider_id', 36).notNullable();
    table.jsonb('profile').notNullable();
    table.jsonb('credentials').notNullable();
    table.timestamps(false, true);
    table.primary(['provider', 'provider_id']);
  });

  await db.schema.createTable('stories', table => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v4()')).primary();
    table.uuid('author_id').notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    table.string('slug', 120).notNullable();
    table.string('title', 120).notNullable();
    table.string('text', 2000);
    table.boolean('is_url').notNullable().defaultTo(false);
    table.boolean('approved').notNullable().defaultTo(false);
    table.timestamps(false, true);
  });

  await db.schema.createTable('story_points', table => {
    table.uuid('story_id').references('id').inTable('stories').onDelete('CASCADE').onUpdate('CASCADE');
    table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    table.primary(['story_id', 'user_id']);
  });

  await db.schema.createTable('comments', table => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v4()')).primary();
    table.uuid('story_id').notNullable().references('id').inTable('stories').onDelete('CASCADE').onUpdate('CASCADE');
    table.uuid('parent_id').references('id').inTable('comments').onDelete('CASCADE').onUpdate('CASCADE');
    table.uuid('author_id').notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    table.text('text');
    table.timestamps(false, true);
  });

  await db.schema.createTable('comment_points', table => {
    table.uuid('comment_id').references('id').inTable('comments').onDelete('CASCADE').onUpdate('CASCADE');
    table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    table.primary(['comment_id', 'user_id']);
  });
};

exports.down = async db => {
  await db.schema.dropTableIfExists('comment_points');
  await db.schema.dropTableIfExists('comments');
  await db.schema.dropTableIfExists('story_points');
  await db.schema.dropTableIfExists('stories');
  await db.schema.dropTableIfExists('user_identities');
  await db.schema.dropTableIfExists('user_tokens');
  await db.schema.dropTableIfExists('users');
};

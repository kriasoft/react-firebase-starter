/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* prettier-ignore */

exports.up = async db => {
  await db.schema.createTable('users', table => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v4()')).primary();
    table.string('display_name', 100);
    table.string('photo_url', 200);
    table.timestamps(false, true);
  });

  await db.schema.createTable('stories', table => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v4()')).primary();
    table.uuid('author_id').notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    table.string('title', 80).notNullable();
    table.string('url', 200);
    table.text('text');
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
  await db.schema.dropTableIfExists('users');
};

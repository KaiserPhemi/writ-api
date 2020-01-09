/**
 * @desc retrieves all rows in a table
 * @param {string} dbTable
 */
export const getAll = dbTable => {
  return `select * from ${dbTable} order by id asc;`;
};

/**
 * @desc creates a role on the role table
 * @param {string} title
 * @param {string} description
 */
export const createRole = (title, description) => {
  return `insert into user_role (title, description) values ('${title}', '${description}')
  returning public_id, title, description;`;
};

/**
 * @desc deletes a role from the table
 * @param {int} roleId
 */
export const deleteRole = roleId => {
  return `delete from role where public_id='${roleId}'
  returning *;`;
};

/**
 *
 * @param {string} tableName
 * @param {string} rowId
 */
export const getRole = (tableName, rowId) => {
  return `select * from ${tableName} where public_id='${rowId}';`;
};

/**
 * @desc query string to create a user
 * @param {object} param0
 */
export const createUser = ({
  email,
  firstName,
  lastName,
  userName,
  password,
  avatarUrl
}) => {
  return `insert into user_account
  (email,
    first_name,
    last_name,
    user_name,
    user_password,
    avatar_url)
  values
    ('${email}',
      '${firstName}',
      '${lastName}',
      '${userName}',
      '${password}',
      '${avatarUrl}')
  returning
    user_id,
    email,
    user_name,
    first_name,
    last_name,
    avatar_url,
    active,
    role_title;`;
};

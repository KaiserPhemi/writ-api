/**
 * @desc retrieves all rows in a table
 * @param {string} dbTable
 */
export const getAll = dbTable => {
  return `select * from ${dbTable}
   ;`;
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
 * @param {string} roleId
 */
export const deleteRole = roleId => {
  return `delete from role where public_id='${roleId}'
  returning *;`;
};

/**
 * @desc retrieves a single role from the role table
 * @param {string} tableName
 * @param {string} rowId
 */
export const getRole = (tableName, rowId) => {
  return `select * from ${tableName} where public_id='${rowId}';`;
};

/**
 * @desc checks if a user exist 
 * @param {string} email 
 */
export const checkUser = email => {
  return `select * from user_account where email='${email}';`
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

/**
 * @desc updates a user active status
 * @param {string} email 
 */
export const setUserActive = email => { 
  return `update user_account set active=true where email='${email}'
    returning user_id,
      email,
      first_name,
      last_name,
      user_name,
      active,
      role_title,
      avatar_url;`;
};
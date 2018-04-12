import { Router } from 'express';

import knex from '../db';
import { auth } from '../utils/auth';

const router = Router();

/**
 *  NOTE: We want to perform DB constraint checks before any actions
 *        because SQL driver doesn't send back error messages nicely
 */

/**
 * Request body:
 *    name: Name of the community
 *
 * Response body
 *    communityId?: id of the community
 *    name?: Error message for the name field
 */
router.post('/', auth.optional, async (req, res) => {
  // Client sent a bad request
  if (!req.body) {
    return res.status(400);
  }

  // Check to make sure the name is not null. Send error message if null
  if (!req.body.name) {
    return res.status(400).json({ name: 'Community name required' });
  }

  console.log('trying to insert');
  // Insert into the community table
  try {
    const [communityId] = await knex('community').insert({
      creator_id: req.payload.userId,
      name: req.body.name,
    });

    return res.status(200).json({ communityId });
  } catch (err) {
    // Some system error occurred
    console.log(err);
    return res.status(500);
  }
});

export default router;

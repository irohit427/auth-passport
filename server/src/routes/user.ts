import express from 'express';
const router = express.Router();

router.get('/profile',
  (req, res, next) => {
    res.status(200).json({
      message: 'User Profile',
      user: req.user,
    })
  }
);

export default router
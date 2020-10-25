import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { UserInterface } from 'src/interface/User';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = Router();
router.post('/register', async (req: Request, res: Response) => {

  const { username, password, email, firstName, lastName } = req.body;

  User.findOne({ username }, async (err, user: UserInterface) => {
    if (err) throw err;
    if (user) res.send('User alredy exists')
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        username: username,
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: hashedPassword
      });
      await newUser.save().then(u => {
        res.status(200).json({u})
      }).catch(err => res.status(400).json(err))
    }
  })
  
})

// router.post('/login', passport.authenticate('local'), (req, res, next) => {
//   res.send('Successfully authenticated');
// });

router.post('/login', async (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    try { 
      if (err || !user) {
        const error = new Error('An error occurred.');
        return next(error);
      }

      req.login(user, { session: false}, async(err) => {
        if (err) return next(err);
        const userInfo = { 
          _id: user._id, 
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email
        }
        const token = jwt.sign({user: userInfo}, 'TOP_SECRET', {expiresIn: 3600});
        return res.json({success: true, token: `Bearer ${token}`, userInfo});
      });
    } catch (err) {
      return next(err);
    }
  })(req, res, next);
});
export default router;
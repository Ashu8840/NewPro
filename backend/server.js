import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import session from 'express-session';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = 'https://auth-sgtl.onrender.com'; 

// --- Middleware ---
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
}));
app.use(express.json());
app.use(session({ secret: 'supersecret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully.'))
    .catch(err => console.error('MongoDB connection error:', err));

// --- User Schema and Model ---
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String },
    googleId: { type: String },
});

// Password hashing middleware
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password') || !this.password) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);

// --- Passport.js Configuration ---
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `/api/auth/google/callback`
},
async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
            user = await User.findOne({ email: profile.emails[0].value });
            if (user) {
                user.googleId = profile.id;
                await user.save();
            } else {
                user = await User.create({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                });
            }
        }
        return done(null, user);
    } catch (err) {
        return done(err, false);
    }
}));

passport.use(new LocalStrategy({ usernameField: 'email' },
async (email, password, done) => {
    try {
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
        }
        if (!user.password) {
            return done(null, false, { message: 'This account was created with Google. Please use Google to sign in.' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

// Helper to generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

// --- Authentication Routes ---
const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide name, email, and password.' });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'An account with this email already exists.' });
        }
        const newUser = new User({ name, email, password });
        await newUser.save();
        const token = generateToken(newUser._id);
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error during registration.', error });
    }
});

authRouter.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ message: info.message });
        
        const token = generateToken(user._id);
        return res.json({ token });
    })(req, res, next);
});

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/callback',
    passport.authenticate('google', { failureRedirect: `${FRONTEND_URL}`, session: false }),
    (req, res) => {
        const token = generateToken(req.user._id);
        res.redirect(`${FRONTEND_URL}?token=${token}`);
    });

app.use('/api/auth', authRouter);

// --- Server Start ---
app.listen(PORT, () => console.log(`Backend server running on http://localhost:${PORT}`));
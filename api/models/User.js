const mongoose = require('mongoose')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false); //This will fix DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#findandmodify
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const UserSchema = new mongoose.Schema({
    username: {type: String, lowercase: true, required: [true, "can't be blank"], unique: true, match: [/^[a-zA-Z0-9]+$/, 'is invalid']},
    email: {type: String, lowercase: true, required: [true, "can't be blank"], unique: true , match: [/\S+@\S+\.\S+/, 'is invalid']},
    password: {type: String, required: true},
    profilePic: {type: String, default: ''},
    isAdmin: {type: Boolean, default: false}
}, 
{ timestamps: true}
)

// const UserSchema = new mongoose.Schema(
//   {
//     username: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     profilePic: { type: String, defaut: "" },
//     isAdmin: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

module.exports = mongoose.model('User', UserSchema)
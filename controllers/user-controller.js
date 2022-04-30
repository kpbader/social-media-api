const { User } = require('../models');

const userController = {
    // get all users 
    getAllUsers(req, res) {
        User.find()
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // get one user by _id (and populated thought and friend data)
    getUserById({ params }, res) {
        User.findOne({ _id: params.userId })
            .select('-_v')
            .populate('thoughts')
            .populate('friends')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // post a new user 
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    // put to a user to update it's _id 
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.userId }, 
            { $set: body}, 
            { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete a user by it's _id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.userId })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    // post to add a new friend to a user's friend list 
    addNewFriend({ params }, res) {
        User.findByIdAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with that id.' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                res.status(400).json(err);
            })
    },
    // delete to remove a friend from a user's friend list 
    removeFriend({ params }, res) {
        User.findByIdAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with that id.' });
                    return;
                }

            })
    }
};

module.exports = userController;
const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts 
    getAllThoughts(req, res) {
        Thought.find()
            .then(dbThoughtData => res.json(dbThoughtData))
            
    },

    // get to a single thought by it's _id
    getThoughtById({ params }, res) {

    },

    // post to create a new thought (push the created thought's _id to the associated user's thoughts array field)
    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thought: _id } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    // put to update a thought by its _id
    updateThought({ params, body }, res) {

    },

    // delete to remove a thought by its _id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought found with this id.' });
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thought: params.commentId } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // post to create a reaction stored in a single thought's reactions array field  
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, { $push: { replies: body } }, { new: true , runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id.' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
    },

    // delete to pull and remove a reaction by the reaction's reactionId value 
    deleteReaction({ params }, res) {
        Thought.findOneAndDelete(
            { _id: params. reactionId },
            { $pull: { reactions: { reactionId: params. reactionId } } },
            { new: true }
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    }
};

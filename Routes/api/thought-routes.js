const router = require('express').Router();

const { 
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require("../../controllers/thought-controller");

router.route("/").get(getAllThoughts);
router.route("/:thoughtId").get(getThoughtById);
router.route("/:userId").post(createThought);
router.route("/:thoughtId").put(updateThought);
router.route("/:userId/:thoughtId").delete(deleteThought);
router.route("/:thoughtId/reactions").post(createReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
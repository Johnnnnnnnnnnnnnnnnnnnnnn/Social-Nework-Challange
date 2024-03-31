const { Thought, User } = require("../models");

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find().populate('Thought');
            res.json(thoughts);
        } 
        catch(err) {
            res.json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).populate('Thought');
            if(!thought) {
                return res.status(404).json({ message: 'Thought with this ID doesnt exists.' });
            }
            res.json(thought);
        } 
        catch(err) {
            res.json(err);
        }
    },
    async createThought(req, res) {
        try {
            const creatingThought = await Thought.create(req.body);
            res.json(creatingThought);
        } 
        catch(err) {
            res.json(err);
        }
    },
    async updateThought({ params, body }, res) {
        try {
            const updatingThought = await Thought.findOneAndUpdate({ _id: params.id }, body, {
                new: true,
                runValidator: true
            });
            if(!updatingThought) {
                return res.status(404).json({ message: "Thought with this ID doesnt exists." });
            }
            res.json(updatingThought);
        } 
        catch(err) {
            res.json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const deletingThought = await User.findOneAndRemove({ _id: req.params.thoughtId });
            if(!deletingThought) {
                return res.status(404).json({ message: 'Thought with this ID doesnt exists.' });
            };
            const removeThought = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );
            res.json({ message: 'Thought successfully deleted' });
        }  
        catch(err) {
            res.json(err);
        }
    },
    async addReaction(req, res) {
        try {
            const addingReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true },
                { new: true }
            );
            if(!addingReaction) {
                return res.status(404).json({ message: 'Cannot add reaction, thought with this ID doesnt exists.' });
            }
            res.json(addingReaction);
        } 
        catch(err) {
            res.json(err);
        }
    },
    async removeReaction(req, res) {
        try {
            const removingReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );
            if(!removingReaction) {
                return res.status(404).json({ message: 'Reaction with this ID doesnt exists.' });
            }
        } 
        catch(err) {
            res.json(err);
        }
    }
}
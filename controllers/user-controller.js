const { json } = require('body-parser');
const { User, Thought } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find().populate('User');
            res.json(users);
        }
        catch(err) {
            res.status(500).json(err);
        };
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({_id: req.params.userId}).populate('User');
            if(!user) {
                return res.status(404).json({ message: 'No user found with this ID.' });
            }
            res.json(user);
        }
        catch(err) {
            res.status(500).json(err); 
        };
    },
    async createUser(req, res) {
        try {
            const userBody = await User.create(req.body);
            res.json(userBody);
        }
        catch(err) {
            res.json(err);
        }
    },
    async updateUser({ params, body }, res) {
        try {
            const updatingUser = await User.findOneAndUpdate({
                _id: params.id
            }, body, {
                new: true,
                runValidator: true
            });
            if(!updatingUser) {
                return res.status(404).json({ message: 'No user found with this ID.' });
            }
            res,json(updatingUser);
        } 
        catch(err) {
            res.json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const deletingUser = await User.findOneAndRemove({ _id: req.params.studentId });
            if(!deletingUser) {
                return res.status(404).json({ message: 'User with this ID doesnt exists.' });
            }
            return Thought.deleteMany({ _id: { $in: socialNetworkDB.thoughts } });
        }
        catch(err) {
            res.json(err);
        }
    },
    async addFriend(req, res) {
        try {
            const addingFriend = await User.findOneAndUpdate(
                { _id: params.userId },
                { $addToSet: { friends: params.friendId } },
                { new: true, runValidators: true }
            );
            if(!addingFriend) {
                return res.status(404).json({ message: 'No user found with this ID.' });
            }
            res.json(addingFriend);
        } 
        catch (err) {
            res.json(err);
        }
    },
    async deleteFriend(req, res) {
        try {
            const deletingFriend = await User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { friends: params.friendId } },
                { new: true }
            );
            if(!deletingFriend) {
                return res.status(404).json({ message: 'No user found with this ID.' });
            }
        } 
        catch (err) {
            res.json(err);
        }
    }
};
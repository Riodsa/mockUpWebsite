const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = await User.create(name, email);
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const updatedUser = await User.update(id, name, email);
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.delete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ error: 'Database error' });
  }
};
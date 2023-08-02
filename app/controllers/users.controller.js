const User = require("../models").user;

// Get List of Users
const getUsers = async (req, res) => {
    const { email } = req.query;
    let condition = email ? { email: { [Op.like]: `%${email}%` } } : null;
    try {
      const users = await User.findAll({
        where: condition,
        include: { all: true },
      });
      if (!users) return res.status(404).json({ message: "No users found" });
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving users.",
      });
    }
  };
// post a new user 
const createUser = async (req,res)=>{
    try {
        const user = await User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phonenumber: req.body.phonenumber,
            countrycode: req.body.countrycode,
            email: req.body.email,
            password: req.body.password,
            passwordConfirmation: req.body.passwordConfirmation,
          });
    res.status(201).json(user);
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while creating user.",
          }); 
    }
}

// Get User by ID
const getUserById = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id, { include: Role });
      if (!user) return res.status(404).json({ message: "No user found [users controller] " });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving users.",
      });
    }
  };

// Update a User by ID
const updateUserById = async (req, res) => {
  
    try {
      const user = await User.findByPk(req.params.id);
      user.update({
        firstname: req.body.firstname || user.firstname,
        lastname: req.body.lastname || user.lastname,
        phonenumber: req.body.phonenumber || user.phonenumber,
        countrycode: req.body.countrycode || user.countrycode,
        email: req.body.email || user.email,
        isActive: req.body.active,
        role: user.setRole(role) || user.role,
        password: req.body.password || user.password,
        passwordConfirmation:
          req.body.passwordConfirmation || user.passwordConfirmation,
      });
      res.status(200).json(user);
      if (!user)
        return res
          .status(404)
          .json({ message: "No user found [user controller]" });
    } catch (err) {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving users.",
      });
    }
  };

// Delete a User by ID
const deleteUserById = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ message: "No user found [user controller]" });
      user.destroy();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving users.",
      });
    }
  };
module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById
}
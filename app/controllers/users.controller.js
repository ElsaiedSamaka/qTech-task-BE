const User = require("../models").user;

// Get List of Users
const getUsers = async (req, res) => {
    const { email } = req.query;
    let condition = email ? { email: { [Op.like]: `%${email}%` } } : null;
    try {
      const users = await User.findAll({
        where: condition,
      });
      if (!users) return res.status(404).json({ message: "No users found. [users controller]" });
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
         email: req.body.email,
         birthdate: req.body.birthdate,
         address: req.body.address,
       });
    res.status(201).json(user);
    } catch (err) {
   res.status(500).json({
       message: err.message || "Some error occurred while creating user. [users controller]",
     }); 
    }
}

// Get User by ID
const getUserById = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ message: "No user found. [users controller] " });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving user.",
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
        birthdate: req.body.birthdate||user.birthdate,
        address: req.body.address || user.address,
      });
      res.status(200).json(user);
      if (!user)
        return res
          .status(404)
          .json({ message: "No user found. [user controller]" });
    } catch (err) {
      res.status(500).json({
        message: err.message || "Some error occurred while updateing user.",
      });
    }
  };

// Delete a User by ID
const deleteUserById = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ message: "No user found. [user controller]" });
      user.destroy();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({
        message: err.message || "Some error occurred while deleteing user.",
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
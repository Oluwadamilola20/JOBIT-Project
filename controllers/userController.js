import User from "../models/UserModel.js";

// @description: Get all users
// @Method: GET
// @Endpoint: api/users
// @AccessType: private
const getAllUsers = async (req, res) => {
    const users = await User.find({}).select("-password");
  
    res.status(200).json({ users });
};

// @description: Get user profile
// @Method: GET
// @Endpoint: api/users/:id
// @AccessType: private
const getUser = async (req, res) => {
    const id = req.params.id;
  
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
  
    res.status(200).json({ user });
};

// @description: Update profile
// @Method: PUT
// @Endpoint: api/users/:id
// @AccessType: private
const updateUser = async (req, res) => {
    const id = req.params.id;
  
    // validate the body of the req
  
    const { firstName, lastName } = req.body;
  
    if (req.user._id.toString() !== id) {
      return res.status(400).json({ msg: "Id do not match" });
    }
    const user = await User.findByIdAndUpdate(
        req.user._id,
        { firstName, lastName },
        { new: true }
    ).select("-password")
    if (!user) {
        return res.status(400).json({ msg: "Invalid user" });
    }

    res.status(200).json({ user, msg: "Updated successfully" });
};

export { getUser, getAllUsers, updateUser };
    
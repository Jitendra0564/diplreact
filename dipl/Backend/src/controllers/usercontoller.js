const bcrypt = require('bcryptjs');
const path = require('path');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const File = require('../models/fileupload');
const User = require('../models/UsersModels');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, File, cb) => {
    cb(null, 'uploads/'); // Specify the upload directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Filter to allow only specific file types (e.g., images, PDFs)
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'application/pdf'||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({ storage, fileFilter });

// User registration controller
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, fatherName, isAdmin, motherName, contactNo, AlternativeNo, fatherNo, Address, BankName, BankAccNo, Ifsc, Department, Position, Role, AadharCardNo, PanCardNo, joiningdate, Education, workHistory, Language, Status } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: 'User with this email already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin, // Set to false by default
      fatherName,
      motherName,
      contactNo,
      AlternativeNo,
      fatherNo,
      Address,
      BankName,
      BankAccNo,
      Ifsc,
      Department,
      Position,
      Role,
      joiningdate,
      workHistory,
      Education,
      Language,
      Status,
      AadharCardNo,
      PanCardNo,
      
    });

    // Save the new user
    const savedUser = await newUser.save();

    res.status(201).json({ user: savedUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// User login controller
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create and send a JSON Web Token
    const payload = {
      user: {
        id: user.id,
        isAdmin: user.isAdmin,
       
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '2d' },
      (err, token) => {
        if (err) throw err;
        res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // Set secure option based on environment
          sameSite: 'strict',
          maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
        });
        res.json({ token,isAdmin: user.isAdmin  });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
      const {
          name,
          email,
          dob,
          password,
          fatherName,
          motherName,
          contactNo,
          AlternativeNo,
          fatherNo,
          Address,
          BankName,
          BankAccNo,
          Ifsc,
          Department,
          Position,
          Role,
          joiningdate,
          workHistory,
          Education,
          Language,
          Status,
          AadharCardNo,
          PanCardNo,
         
      } = req.body;

      // Check if file size limit is exceeded
      if (req.files && Object.values(req.files).some(file => file[0].size > 5 * 1024 * 1024)) {
          return res.status(400).json({ error: 'File size exceeds the allowed limit of 5MB' });
      }

      // Check if the user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
          return res.status(400).json({ msg: 'User already exists' });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user object
      const newUser = new User({
          name,
          email,
          dob,
          password: hashedPassword,
          fatherName,
          motherName,
          contactNo,
          AlternativeNo,
          fatherNo,
          Address,
          BankName,
          BankAccNo,
          Ifsc,
          Department,
          Position,
          Role,
          joiningdate,
          workHistory: Array.isArray(workHistory) ? workHistory : JSON.parse(workHistory),
          Education: Array.isArray(Education) ? Education : JSON.parse(Education),
          Language,
          Status,
          AadharCardNo,
          PanCardNo,
      });

      // Save the new user
      const savedUser = await newUser.save();

      // Upload files if present
      if (req.files) {
          const fileIds = [];
          for (const fileCategory of Object.keys(req.files)) {
              const file = req.files[fileCategory][0];
              const fileId = await File.uploadFile(file, savedUser._id, fileCategory);
              fileIds.push(fileId);
          }
          savedUser.files = fileIds; // Assign the array of file IDs to the user's files field
          await savedUser.save(); // Save the updated user document
      }

      // Populate file metadata for response
    const populatedUser = await User.findById(savedUser._id).populate('files');
    
    res.status(201).json({ user: populatedUser });

  } catch (err) {
      res.status(500).json({ error: 'Server error' });
  }
};


// Get all users with All fields
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const authenticatedUserId = req.user.id;
    const isAdmin = req.user.isAdmin;

    // Check if the authenticated user is trying to access their own data or if they are an admin
    if (userId !== authenticatedUserId &&!isAdmin) {
      return res.status(403).json({ msg: 'Access denied. You can only view your own data.' });
    }

    // Find the user by ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.getUsers = async (req, res) => {
  try {
    let users;

    if (req.user.isAdmin) {
      // If the logged-in user is an admin, select all users
      users = await User.find({}, '_id name email');
    } else {
      // If the logged-in user is not an admin, select only the logged-in user
      users = await User.find({ _id: req.user.id }, '_id name email');
    }

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Update a user
exports.updateUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      fatherName,
      motherName,
      contactNo,
      AlternativeNo,
      fatherNo,
      Address,
      BankName,
      BankAccNo,
      Ifsc,
      Department,
      Position,
      Role,
      AadharCardNo,
      joiningdate,
      Education,
      workHistory,
      Language,
      Status,
    } = req.body;
    const userId = req.params.id;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update the user fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.fatherName = fatherName || user.fatherName;
    user.motherName = motherName || user.motherName;
    user.contactNo = contactNo || user.contactNo;
    user.AlternativeNo = AlternativeNo || user.AlternativeNo;
    user.fatherNo = fatherNo || user.fatherNo;
    user.Address = Address || user.Address;
    user.BankName = BankName || user.BankName;
    user.BankAccNo = BankAccNo || user.BankAccNo;
    user.Ifsc = Ifsc || user.Ifsc;
    user.Department = Department || user.Department;
    user.Position = Position || user.Position;
    user.Role = Role || user.Role;
    user.AadharCardNo = AadharCardNo || user.AadharCardNo;
    user.Education = Education || user.Education;
    user.joiningdate = joiningdate || user.joiningdate;
    user.workHistory = workHistory || user.workHistory;
    user.Language = Language || user.Language;
    user.status = Status || user.status;

    // Update the password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    // Save the updated user
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Delete the user
    const deletedUser = await User.deleteOne({ _id: userId });
    if (deletedUser.deletedCount === 0) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

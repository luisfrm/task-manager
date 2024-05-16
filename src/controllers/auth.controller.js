import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET_JWT } from "../config.js";
import { createAccessToken } from "../utils/jwt.js";
import userModel from "../models/user.model.js";

class AuthController {
	static register = async (req, res) => {
		const { email, username, password } = req.body;

		try {
			const userFoundByEmail = await UserModel.findOne({ email });

			if (userFoundByEmail)
				return res.status(400).send("Email already in use.");

			const userFoundByUsername = await UserModel.findOne({ username });

			if (userFoundByUsername)
				return res.status(400).send("Username already in use.");

			const passwordHash = await bcrypt.hash(password, 10);

			const newUser = new UserModel({
				email,
				username,
				password: passwordHash,
			});

			const userSaved = await newUser.save();
			const token = await createAccessToken({ id: userSaved._id });
			res.cookie("token", token);
			res.status(201).json({
				id: userSaved._id,
				username: userSaved.username,
				email: userSaved.email,
				createdAt: userSaved.createdAt,
				updatedAt: userSaved.updatedAt,
			});
		} catch (error) {
			console.log(error);

			if (error.code === 11000) {
				if (error.keyValue.username)
					return res.status(400).send("Username already in use.");

				return res.status(400).send("Email already in use.");
			}

			res.status(500).send("Error registering new user.");
		}
	};

	static login = async (req, res) => {
		const { email, password } = req.body;

		try {
			const userFound = await UserModel.findOne({ email });
			if (!userFound)
				return res.status(404).json({ message: ["User not found."] });

			const isMatch = await bcrypt.compare(password, userFound.password);

			if (!isMatch) return res.status(400).send("Invalid credentials.");

			const token = await createAccessToken({ id: userFound._id });
			res.cookie("token", token);
			res.status(200).json({
				username: userFound.username,
				email: userFound.email,
				createdAt: userFound.createdAt,
				updatedAt: userFound.updatedAt,
			});
		} catch (error) {
			console.log(error);
			res.status(500).send("Error login into the system.");
		}
	};

	static logout = async (_, res) => {
		res.cookie("token", "", { expires: new Date(0) });
		res.status(200).send("Logged out.");
	};

	static profile = async (req, res) => {
		const user = await UserModel.findById(req.user.id);
		if (!user) return res.status(404).json({ message: ["User not found."] });

		res.status(200).json({
			_id: user._id,
			username: user.username,
			email: user.email,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		});
	};

	static removeProfile = async (req, res) => {
		const user = await UserModel.findByIdAndDelete(req.user.id);
		if (!user) return res.status(404).json({ message: ["User not found."] });

		res.status(200).send("User deleted.");
	};

	static verifyToken = async (req, res) => {
		const { token } = req.cookies;
		if (!token) return res.status(401).send("Unauthorized.");

		jwt.verify(token, TOKEN_SECRET_JWT, async (error, user) => {
			if (error) return res.status(403).send("Invalid token.");

			const userFound = await userModel.findById(user.id);
			if (!userFound) res.status(404).send("User not found.");
      else return res.status(200).json({
				id: userFound._id,
				username: userFound.username,
				email: userFound.email,
				createdAt: userFound.createdAt,
				updatedAt: userFound.updatedAt,
			});
		});
	};
}

export default AuthController;

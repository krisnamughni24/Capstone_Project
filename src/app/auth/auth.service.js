const bcrypt = require('bcryptjs');
const Models = require('../../models');

const AuthService = {
    loginUser: async (username, password) => {
        const foundUser = await Models.User.findOne({
            where: {
                username,
            },
        });

        if (!foundUser) {
            throw new Error('User not found');
        }

        const isPasswordMatch = await bcrypt.compare(password, foundUser.password);

        if (!isPasswordMatch) {
            throw new Error('Password not match');
        }

        return foundUser;
    },

    createUser: async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = await Models.User.create({
            username: user.username,
            password: hashedPassword,
            email: user.email,
            fullname: user.fullname,
            phone: user.phone,
        });

        console.log(newUser);
        return newUser;
    },
};

module.exports = AuthService;

// /api/test/all for public access
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

// /api/test/user
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

// /api/test/master
exports.masterBoard = (req, res) => {
    res.status(200).send("Master Content.");
};

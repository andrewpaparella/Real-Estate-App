const mongoose = require("mongoose");
const Home = require("../models/home");
const Realtor = require("../models/realtor");

module.exports = {
  index,
  show,
  new: newHome,
  create,
  delete: deleteHome,
  edit,
  update,
};

async function index(req, res) {
  try {
    const homes = await Home.find({});
    res.render("homes/index", {
      title: "All Homes",
      homes,
    });
  } catch (err) {
    res.send(err);
  }
}

async function show(req, res) {
  try {
    const home = await Home.findById(req.params.id);
    const realtor = await Home.findById(req.params.id)
      .populate("realtor")
      .exec(function (err, realtor) {
        res.render("homes/show", {
          home,
          title: "Home Detail",
          realtor,
        });
      });
  } catch (err) {
    res.send(err);
  }
}

async function newHome(req, res) {
  const realtor = await Realtor.find({});
  res.render("homes/new", { title: "Add Home", realtor });
}

async function create(req, res) {
  const realtor = await Realtor.find({});
  req.body.pool = !!req.body.pool;
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  const homeNew = req.body;
  const home = await Home.create(homeNew);
  home.save(function (err) {
    if (err) return res.render(`homes/new`, { title: "Add Home" });
    res.redirect("/homes");
  });
}

async function deleteHome(req, res) {
  try {
    const deletedHome = await Home.findByIdAndDelete(req.params.id);
    const homes = await Home.find({});
    res.render("homes/index", {
      title: "All Homes",
      homes,
    });
  } catch (err) {
    res.send(err);
  }
}

async function edit(req, res) {
  try {
    const realtor = await Realtor.find({})
    const home = await Home.findById(req.params.id);
    res.render("homes/edit", {
      title: "Edit Home",
      home,
      realtor,
    });
  } catch (err) {
    res.send(err);
  }
}

async function update(req, res) {
  try {
    req.body.pool = !!req.body.pool;
    for (let key in req.body) {
      if (req.body[key] === "") delete req.body[key];
    }
    const updateHome = await Home.findByIdAndUpdate(req.params.id, req.body);
    updateHome.save();
    res.redirect(`/homes/${updateHome._id}`);
  } catch (err) {
    res.send(err);
  }
}

const mongoose = require('mongoose')
// const Db = require("../models/");
// incase this doesnt work ^^
const Realtor = require("../models/realtor");

module.exports = {
  new: newRealtor,
  create,
  index,
  show,
  delete: deleteRealtor,
  edit,
  update,
  new2: newComment,
  create2,
  delete2: deleteComment,
  show2,
//   addToHome
};

function newRealtor(req, res) {
  res.render("realtors/new", { title: "Add Realtor" });
}

async function create(req, res) {
  const realtorNew = req.body;
  const realtor = await Realtor.create(realtorNew);
  realtor.save(function (err) {
      if (err) return res.render(`realtors/new`, { title: "Add Realtor" });
      res.redirect("/realtors");
    });
}

async function index(req, res) {
    try {
    const realtors = await Realtor.find({});
    res.render("realtors/index", {
      title: "All Realtors",
      realtors,
    });
  } catch (err) {
    res.send(err);
  }
}

async function show(req, res) {
  try {
    const realtor = await Realtor.findById(req.params.id);
    res.render("realtors/show", {
      title: "Realtor Detail",
      realtor,
    });
  } catch (err) {
    res.send(err);
  }
}

async function deleteRealtor(req, res) {
  try {
    const deletedRealtor = await Realtor.findByIdAndDelete(req.params.id);
    const realtors = await Realtor.find({});
    res.render("realtors/index", {
      title: "All Realtors",
      realtors,
    });
  } catch (err) {
    res.send(err);
  }
}

async function edit(req, res) {
  try {
    const realtor = await Realtor.findById(req.params.id);
    res.render("realtors/edit", {
      title: "Edit Realtor",
      realtor,
    });
  } catch (err) {
    res.send(err);
  }
}

async function update(req, res) {
  try {
    const updateRealtor = await Realtor.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    updateRealtor.save();
    res.redirect(`/realtors/${updateRealtor._id}`);
  } catch (err) {
    res.send(err);
  }
}

async function newComment(req, res) {
  const realtor = await Realtor.findById(req.params.id);
  res.render(`comments/new`, { title: "Add Comment", realtor });
}

async function create2(req, res) {
    req.body.recommendation = !!req.body.recommendation
    for (let key in req.body) {
		if (req.body[key] === '') delete req.body[key];
	}
    Realtor.findById(req.params.id, function(err, realtor) {
        realtor.comments.push(req.body);
        console.log(realtor.comments)
        realtor.save(function(err) {
          res.redirect(`/realtors/${realtor._id}`);
        });
    });
}


async function deleteComment(req,res) {
    const realtor = await Realtor.findById(req.params.id)
    const comments = await realtor.comments.remove(req.params.id2)
    realtor.save(function(err) {
        if (err) return 
        res.redirect(`/realtors/${realtor._id}`)
    })
}


async function show2(req, res) {
    try {
      const realtor = await Realtor.findById(req.params.id);
      res.render("comments/show", {
        title: "Comments Detail",
        realtor,
      });
    } catch (err) {
      res.send(err);
    }
}

// async function addToHome(req,res) {
//     const home = await Home.findById(req.params.id)
//     home.realtor.push(req.body.realtorId)
//     home.save(function (err) {
//         res.redirect(`/homes/${home._id}`)
//     })
// }
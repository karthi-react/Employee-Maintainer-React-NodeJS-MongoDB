const Employee = require("../model/Employee");

const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json({
    posts: {
      title: "Hi There",
    },
  });
});

router.post("/employee/add", async (req, res) => {
  try {
    const data = await Employee.create(req.body);
    res.status(200).json({ status: true, message: "Added Successfully", data: data });
  } catch (err) {
    res.status(400).json({ error: err });
    console.log(JSON.stringify(err))
  }
});

router.get("/employee", async (req, res) => {
  try {
    const data = await Employee.find({});
    res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.get("/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Employee.findById(id);
    res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.post("/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Employee.findByIdAndUpdate(
      id,
      req.body
    );
    if (!data) {
      res.status(400).json({ data: "Not available employee details" });
    }
    const updateemployee = await Employee.findById(id);
    res.status(200).json({ status: true, message: "Edited Successfully" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.delete("/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "id")
    const data = await Employee.findByIdAndDelete(
      id,
      req.body
    );
    if (!data) {
      res.status(400).json({ data: "Not available delete employee details" });
    }
    res.status(200).json({ status: true, message: "Deleted Successfully" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});



module.exports = router;
const Event = require("../models/Event");

const getEvents = async (req, res) => {
  return res.json({
    ok: true,
    msg: "getEvents",
  });
};

const createEvent = async (req, res) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;
    const savedEvent = await event.save();
    res.json({
      ok: true,
      event: savedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contact the admin",
    });
  }

  return res.json({
    ok: true,
    msg: "createEvent",
  });
};

const updateEvent = async (req, res) => {
  return res.json({
    ok: true,
    msg: "updateEvent",
    id: req.id,
  });
};

const deleteEvent = async (req, res) => {
  return res.json({
    ok: true,
    msg: "deleteEvent",
    id: req.id,
  });
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};

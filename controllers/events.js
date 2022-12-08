const getEvents = async (req, res) => {
  return res.json({
    ok: true,
    msg: "getEvents",
  });
};

const createEvent = async (req, res) => {
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

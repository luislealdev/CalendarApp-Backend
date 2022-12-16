const Event = require("../models/Event");

const getEvents = async (req, res) => {
  const events = await Event.find().populate("User", "name");

  return res.json({
    ok: true,
    events,
  });
};

const createEvent = async (req, res) => {
  const event = new Event(req.body);

  try {
    event.User = req.uid;
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

};

const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const uid = req.uid;

    const foundEvent = await Event.findById(eventId);

    if (!foundEvent)
      res.status(404).json({
        ok: false,
        msg: "Event not found",
      });

    if (foundEvent._doc.User.toString() !== uid)
      return res.status(401).json({
        ok: false,
        msg: "Cant access to this event",
      });

    const newEvent = {
      ...req.body,
      User: uid,
    };

    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    res.json({
      ok: true,
      event: updatedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error: Contact the admin",
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const uid = req.uid;

    const foundEvent = await Event.findById(eventId);

    if (!foundEvent)
      res.status(404).json({
        ok: false,
        msg: "Event not found",
      });

    if (foundEvent._doc.User.toString() !== uid)
      return res.status(401).json({
        ok: false,
        msg: "Cant access to this event",
      });

    await Event.deleteOne({ id: eventId });

    res.json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error: Contact the admin",
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};

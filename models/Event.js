const { Schema, model } = require("mongoose");

const eventSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  User: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

eventSchema.method("toJson", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("event", eventSchema);

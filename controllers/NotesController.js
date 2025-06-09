import noteModel from "../model/NotesSchema.js";

const addnote = async (req, res, next) => {
  try {
    const userId = req.user;
    if (!userId) {
      return res.status(404).json({ message: "user id is not founded!!" });
    }
    const { title, description, tag } = req.body;
    const note = new noteModel({ title, description, tag, user: userId });
    await note.save();

    res.status(201).json({
      success: true,
      message: "Note created successfully",
    });
  } catch (error) {
    next(error);
  }
};
const viewNotes = async (req, res, next) => {
  try {
    const userId = req.user;
    const notes = await noteModel.find({ user: userId });
    if (!notes) {
      return res.status(404).json({ message: "notes not founded" });
    }
    return res.status(200).json({ notes });
  } catch (error) {
    next(error);
  }
};
const deleteNote = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ message: "note id is not founded.." });
  }
  try {
    await noteModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "note is deleted successfully!!" });
  } catch (error) {
    next(error);
  }
};
const deleteAllNote = async (req, res, next) => {
  const userId = req.user;
  if (!userId) {
    return res.status(404).json({ message: "userId is not founded.." });
  }
  try {
    await noteModel.deleteMany({ user: userId });
    return res.status(200).json({ message: "deleted" });
  } catch (error) {
    next(error);
  }
};
const updateNote = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ message: "note id is not founded.." });
  }
  try {
    const updates = req.body;
    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "Please provide data to update" });
    }

    await noteModel.findByIdAndUpdate(id, updates, {
      new: true,
    });
    return res.status(200).json({ message: "notes updated successfully.." });
  } catch (error) {
    next(error);
  }
};

export { addnote, viewNotes, deleteNote, deleteAllNote, updateNote };

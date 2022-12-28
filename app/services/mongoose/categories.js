const Categories = require('../../api/v1/categories/model');
const { NotFoundError, BadRequestError} = require('../../errors');

const getAllCategories = async (req) => {
  const result = await Categories.find({ organizer: req.user.organizer });

  return result
};

const createCategories = async (req) => {
  const { name } = req.body;

  const check = await Categories.findOne({ name });
  if (check) throw new BadRequestError('kategori nama duplikat');

  const result = await Categories.create({
    name,
    organizer: req.user.organizer,
  });

  return result;
};

const getOneCategories = async (req) => {
  const { id } = req.params;

  const result = await Categories.findOne({
    _id: id,
    organizer: req.user.organizer,
  });

  if (!result) throw new NotFoundError(`Tidak ada kategori dengan id: ${id}`);

  return result;
};

const updateCategories = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  const check = await Categories.findOne({
    name,
    organizer: req.user.organizer,
    _id: { $ne: id },
  });

  if (check) throw new BadRequestError('kategori nama duplikat');

  const result = await Categories.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );

  const checkCategories = await Categories.findOne({ _id: id });

  if (!checkCategories)
    throw new NotFoundError(`Tidak ada kategori dengan id : ${id}`);

  
  return result
};

const deleteCategories = async (req) => {
  const { id } = req.params;
  const result = await Categories.findOne({
    _id: id,
    organizer: req.user.organizer
  });

  if (!result) throw new NotFoundError(`Tidak ada kategori dengan id: ${id}`);
  await result.remove();
  
  return result;
};

const checkingCategories = async (id) => {
  const result = await Categories.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada kategori dengan id: ${id}`);

  return result;
};

module.exports = {
  getAllCategories,
  createCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
  checkingCategories,
};
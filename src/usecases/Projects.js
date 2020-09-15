const projectModel = require('../Models/Project');

async function getAll() {
  return projectModel.find();
}
async function getById(id) {
  const populated = await projectModel
    .findById(id)
    .populate({ path: 'weekly.boards', model: 'Board' })
    .populate({ path: 'resources.repos', model: 'Repo' })
    .populate({ path: 'daily.tasks', model: 'Task' })
    .populate({ path: 'sources.streams', model: 'Stream' })
    .populate({ path: 'sources.heroes', model: 'Heroe' })
    .populate({ path: 'resources.resources', model: 'Resource' })
    .populate({ path: 'resources.notebooks', model: 'Notebook' });
  return populated;
}

async function getByTag(tags) {
  return projectModel.find(tags);
}

function create(newProject) {
  return projectModel.create(newProject);
}

function updateProject(id, object) {
  const updatedObject = object;
  return projectModel.findByIdAndUpdate(id, updatedObject);
}

function pushIds(id, data, target) {
  const updatedObject = data;
  switch (target) {
    case 'weekly.boards':
      return projectModel
        .findByIdAndUpdate(id, {
          $push: { 'weekly.boards': updatedObject },
        })
        .exec();

    case 'daily.tasks':
      return projectModel
        .findByIdAndUpdate(id, {
          $push: { 'daily.tasks': updatedObject },
        })
        .exec();

    case 'sources.heroes':
      return projectModel
        .findByIdAndUpdate(id, {
          $push: { 'sources.heroes': updatedObject },
        })
        .exec();

    case 'sources.streams':
      return projectModel
        .findByIdAndUpdate(id, {
          $push: { 'sources.streams': updatedObject },
        })
        .exec();

    case 'resources.repos':
      return projectModel
        .findByIdAndUpdate(id, {
          $push: { 'resources.repos': updatedObject },
        })
        .exec();

    case 'resources.notebooks':
      return projectModel
        .findByIdAndUpdate(id, {
          $push: { 'resources.notebooks': updatedObject },
        })
        .exec();

    case 'resources.resources':
      return projectModel
        .findByIdAndUpdate(id, {
          $push: { 'resources.streams': updatedObject },
        })
        .exec();

    default:
      break;
  }
}

function deleteById(title) {
  return projectModel.remove({ title });
}

function pullIds({ id, resourceId, target }) {
  switch (target) {
    case 'weekly.boards':
      return projectModel
        .findByIdAndUpdate(id, {
          $pull: { 'weekly.boards': resourceId },
        })
        .exec();

    case 'daily.tasks':
      return projectModel
        .findByIdAndUpdate(id, {
          $pull: { 'daily.tasks': resourceId },
        })
        .exec();

    case 'sources.heroes':
      return projectModel
        .findByIdAndUpdate(id, {
          $pull: { 'sources.heroes': resourceId },
        })
        .exec();

    case 'sources.streams':
      return projectModel
        .findByIdAndUpdate(id, {
          $pull: { 'sources.streams': resourceId },
        })
        .exec();

    case 'resources.repos':
      return projectModel
        .findByIdAndUpdate(id, {
          $pull: { 'resources.repos': resourceId },
        })
        .exec();

    case 'resources.notebooks':
      return projectModel
        .findByIdAndUpdate(id, {
          $pull: { 'resources.notebooks': resourceId },
        })
        .exec();

    case 'resources.resources':
      return projectModel
        .findByIdAndUpdate(id, {
          $pull: { 'resources.resources': resourceId },
        })
        .exec();

    default:
      break;
  }
}

module.exports = {
  getAll,
  create,
  updateProject,
  pushIds,
  pullIds,
  getById,
  deleteById,
  getByTag,
};

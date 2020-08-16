const boardUsecase = require('../usecases/Boards');
const HeroesUsecase = require('../usecases/Heroes');
const LoginUsecase = require('../usecases/Login');
const NotebooksUsecase = require('../usecases/Notebooks');
const ProjectsUsecase = require('../usecases/Projects');
const ReposUsecase = require('../usecases/Repos');
const ResourcesUsecase = require('../usecases/Resources');
const StreamsUsecase = require('../usecases/Streams');
const TasksUsecase = require('../usecases/Tasks');

const BoardModel = require('../Models/Board');
const HeroeModel = require('../Models/Heroe');
const NotebookModel = require('../Models/Notebook');
const ProjectModel = require('../Models/Project');
const RepoModel = require('../Models/Repo');
const ResourceModel = require('../Models/Resource');
const StreamModel = require('../Models/Stream');
const TasksModel = require('../Models/Tasks');

module.exports = {
    lib: {},
    board: {
        usecases: boardUsecase,
        model: BoardModel,
    },
    heros: {
        usecases: HeroesUsecase,
        model: HeroeModel,
    },
    auth: {
        usecases: LoginUsecase,
    },
    notebooks: {
        usecases: NotebooksUsecase,
        model: NotebookModel,
    },
    projects: {
        usecases: ProjectsUsecase,
        model: ProjectModel,
    },
    repos: {
        usecases: ReposUsecase,
        model: RepoModel,
    },
    resources: {
        usecases: ResourcesUsecase,
        model: ResourceModel,
    },
    streams: {
        usecases: StreamsUsecase,
        model: StreamModel,
    },
    tasks: {
        usecases: TasksUsecase,
        model: TasksModel,
    },
};
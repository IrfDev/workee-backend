require('dotenv').config();
const express = require('express');
const trello = require('../Lib/trello');
const boardUseCase = require('../usecases/Boards');
const { TRELLO_MEMBER_ID } = process.env;

const router = express.Router();

router.get('/trello/lists/:boardId', async(req, res) => {
    try {
        const resourceId = req.params.boardId;
        // const boardData = boardUseCase.getById(resourceId);
        // const trelloBoardData = await trello.getCardsOnBoard(resourceId);
        const trelloLists = await trello.getListsOnBoard(resourceId);
        res.json({
            success: true,
            message: 'Board by project id',
            data: {
                // board: boardData,
                lists: trelloLists,
            },
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'Failed to fetch weekly boards',
            error: error.message,
        });
    }
});

router.get('/trello/cards/:listId', async(req, res) => {
    try {
        const resourceId = req.params.listId;
        // const boardData = boardUseCase.getById(resourceId);
        // const trelloBoardData = await trello.getCardsOnBoard(resourceId);
        const trelloCardsFromList = await trello.getCardsOnList(resourceId);
        res.json({
            success: true,
            message: 'Board by project id',
            data: {
                // board: boardData,
                cards: trelloCardsFromList,
            },
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'Failed to fetch weekly boards',
            error: error.message,
        });
    }
});

router.get('/trello/boards', async(req, res) => {
    try {
        const trelloBoards = await trello.getBoards(TRELLO_MEMBER_ID);
        res.json({
            success: true,
            message: 'Boards from trello',
            data: {
                boards: trelloBoards,
            },
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'Failed to fetch boards from trello',
            error: error.message,
        });
    }
});

router.post('/', async(req, res) => {
    try {
        const newBoardInfo = req.body;
        const newBoard = await boardUseCase.create(newBoardInfo);
        res.json({
            success: true,
            message: 'New Board created',
            data: {
                newBoard,
            },
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'Failed creating a new board',
            error: error.message,
        });
    }
});

module.exports = router;
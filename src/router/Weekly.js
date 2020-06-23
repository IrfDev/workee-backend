require('dotenv').config();
const express = require('express');
const trello = require('../Lib/trello');
const boardUseCase = require('../usecases/Boards');
const { TRELLO_MEMBER_ID } = process.env;

const router = express.Router();

router.get('/boards', async(req, res) => {
    try {
        const resourceIds = req.body;
        const boards = await resourceIds.map((id) => {
            const boardData = boardUseCase.getById(id);
            const trelloBoardData = trello.getCardsOnBoard(id);
            return {
                ...boardData,
                trello: trelloBoardData,
            };
        });
        res.json({
            success: true,
            message: 'Board by project id',
            data: {
                boards,
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
router.get('/trello', async(req, res) => {
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
            message: 'All projects',
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
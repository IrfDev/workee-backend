const express = require('express');
const streamUseCase = require('../usecases/Streams');
const heroeUseCase = require('../usecases/Heroes');

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const heroes = await heroeUseCase.getAll();
        res.json({
            success: true,
            message: 'Fetch all heroes',
            data: {
                heroes,
            },
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'Failed to fetch all heroes',
            error: error.message,
        });
    }
});

router.post('/entries', async(req, res) => {
    try {
        const streamsIds = req.body;
        const entries = await streamsIds.map((id) => {
            const entriesData = streamUseCase.getById(id);
            return entriesData;
        });
        res.json({
            success: true,
            message: 'All entries from streams',
            data: {
                entries,
            },
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'Failed to fetch entries',
            error: error.message,
        });
    }
});

router.get('/streams', async(req, res) => {
    try {
        const streams = await streamUseCase.getAll();
        res.json({
            success: true,
            message: 'All streams from Feedly account',
            data: {
                streams,
            },
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'Failed to fetch streams',
            error: error.message,
        });
    }
});

router.get('/heroes', async(req, res) => {
    try {
        const heroes = await req.body.map((id) => heroeUseCase.getByName(heroName));
        res.json({
            success: true,
            message: 'Fetch heroes from ids array',
            data: {
                heroes,
            },
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'Failed to fetch heroes',
            error: error.message,
        });
    }
});

router.post('/hero', async(req, res) => {
    try {
        const newHeroInfo = req.body;
        const newHero = await heroeUseCase.create(newHeroInfo);
        res.json({
            success: true,
            message: 'All projects',
            data: {
                newHero,
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
const friendData = require('../data/friends.js')
module.exports = (app) => {
    app.get('/api/friends', (req, res) => {
        res.json(friendData);
    });

    app.post('/api/friends', (req, res) => {
        let data = {
            name: req.body.name,
            photo: req.body.photo,
            scores: req.body.scores
        };

        let bff = friendData.reduce((bff, friend, index) => {
            let difference = data.scores.reduce((memo, score, index2) => {
                return memo + Math.abs(score - friendData[index].scores[index2])
            }, 0);
            if (bff === null || bff.difference > difference) {
                return {
                    name: friend.name,
                    photo: friend.photo,
                    scores: friend.scores,
                    difference: difference
                };
            }
            return bff;
        }, null);
        console.log(bff);
        friendData.push(data);
        res.json(bff);
    });
}
const connection = require('../database/connection');

module.exports = {
  async create(req, res) {
    const { name, email, dob, city, state, gender, interests, friends } = req.body;

    await connection('user').insert({
      name,
      email,
      dob,
      city,
      state,
      gender,
      interests,
      friends
    })

    return res.json({
      "status": "user created!"
    })
  },

  async index(req, res) {
    const users = await connection('user').select('*')

    return res.json(users)
  },

  async update(req, res) {

    const { id } = req.params

    const { name,
      email,
      dob,
      city,
      state,
      gender,
      interests,
      friends } = req.body

    await connection('user')
    .where('id', id)
    .update({
      name: name,
      email: email,
      dob: dob,
      city: city,
      state: state,
      gender: gender,
      interests: interests,
      friends: friends
    })

    res.json({"status": "update successfull"})
    return res.status(201);    
  },

  async listFriends(req, res) {
    const friendsIds = JSON.parse(req.body.friendsIds)
    console.log(friendsIds)

    const queries = friendsIds.map(friend => {
        return connection('user')
        .select('*')
        .where('id', friend)
    });


    Promise.all(queries)
      .then((responses) => {
        res.status(200).json(responses.map(response => {
          return response[0]
        }));
      })
      .catch((err) => console.log(err));
    
  }
}
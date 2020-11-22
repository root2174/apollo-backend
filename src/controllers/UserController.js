const connection = require('../database/connection');

module.exports = {
  async create(req, res) {
    const { name, email, password, dob,city, state, gender, interests, friends } = req.body;

    await connection('user').insert({
      name,
      email,
      password,
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

  async listUser(req, res){
    const { id } = req.params
    const [ user ] = await connection('user').select('*').where('id', id)
    user.friends = JSON.parse(user.friends)
    return res.json(user)
  },

  async index(req, res) {
    const users = await connection('user').select('*')
    users.map((user) => {
      user.friends = JSON.parse(user.friends)
    })
    console.log(users)
    return res.json(users)
  },

  async update(req, res) {

    const { id } = req.params

    const { name,
      email,
      password,
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
      password: password,
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
    
  },
  async signIn(req, res) {
    await connection('user')
          .where({email: req.body.email})
          .first()
          .then((user) => {
            if(!user) {
              res.status(401).json({error: 'No user by that email'})
            } else {
              if(user.password == req.body.password) {
                return res.status(200).json({
                  ...user
                })
              }
            }
          })
            
  },
  async delete(req, res) {
    await connection('user')
          .where({id: req.params.id})
          .del()
          .then(() => {
            res.status(200).json({
              "message": "User deleted"
            })
          })
    
  }
}
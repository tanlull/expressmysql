const models = require('../models/index');

exports.index = async (req, res, next) =>{
  // const users = await models.User.findAll({
  //   attributes:['id','name','email','created_date'],
  //   order:[['id','desc']]
  // });

    // const users = await models.User.findAll({
    //   attributes: { exclude: ['password'] },
    //   order:[['id','desc']]
    // });

    // const users = await models.User.findAll({
    //   attributes: { exclude: ['password'] },
    //   where:{
    //     email:'tan@gmail.com'
    //   },
    //   order:[['id','desc']]
    // });

    // const users = await models.User.findAll({
    //   attributes:['id','name',['email','userName'],'created_date'],
    //   order:[['id','desc']]
    // });
    const sql = "select id,name,email,created_date from users order by id desc";
    const users = await models.sequelize.query(sql,{
      type: models.sequelize.QueryTypes.SELECT
    });

    res.status(200).json({
      data : users
    });
}